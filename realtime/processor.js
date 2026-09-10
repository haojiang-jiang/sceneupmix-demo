/* SceneUpmix editor: source-isolated SAF afSTFT rendering in the audio thread. */
class SceneUpmixProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.running=false;this.loop=true;this.pending=null;this.offset=0;this.failed=false;
    this.x=new WebAssembly.Instance(options.processorOptions.module,{wasi_snapshot_preview1:{
      proc_exit:code=>{throw new Error(`Renderer exited (${code}).`);},fd_close:()=>0,fd_seek:()=>0,fd_write:()=>0,
    }}).exports;
    this.output=new Float32Array(this.x.memory.buffer,this.x.output(),256);
    this.port.onmessage=({data})=>{
      try {
        if(data.type==='init') {
          const put=buffer=>{const values=new Float32Array(buffer),p=this.x.malloc(values.byteLength);if(!p)throw Error('Editor memory allocation failed.');new Float32Array(this.x.memory.buffer,p,values.length).set(values);return p;};
          const c=data.config;
          this.x.configure(put(data.bank),put(data.voice),c.samples,put(data.rest),c.frames,c.context,c.shared_safety_gain,c.base_metadata.width_deg,c.base_metadata.diffuseness);
          this.ready=true;this.port.postMessage({type:'ready'});
        } else if(data.type==='params') this.pending=data;
        else if(data.type==='start') {this.pending=null;this.apply(data);this.x.seek(data.position);this.loop=data.loop;this.running=true;}
        else if(data.type==='seek') this.x.seek(data.position);
        else if(data.type==='pause') this.running=false;
        else if(data.type==='loop') this.loop=data.value;
      } catch(error) {this.fail(error);}
    };
  }
  fail(error) {this.running=false;this.failed=true;this.port.postMessage({type:'error',message:error.message||'Audio renderer failed.'});}
  apply(data) {
    const p=data.pose;
    this.x.parameters(p.azimuth,p.elevation,p.distance,p.gain,data.solo?1:0);
    if(data.id)this.port.postMessage({type:'applied',id:data.id,audioTime:currentTime,pose:p});
  }
  process(_inputs,outputs) {
    if(!this.ready||!this.running||this.failed)return true;
    try {
      if(this.pending){this.apply(this.pending);this.pending=null;}
      const out=outputs[0],n=out[0].length;
      // A browser quantum need not be 128; feed the fixed SAF hop in pieces.
      let ended=false;
      for(let start=0;start<n;start+=128){const count=Math.min(128,n-start);ended=!!this.x.render(count,this.loop?1:0);out[0].set(this.output.subarray(0,count),start);out[1].set(this.output.subarray(128,128+count),start);}
      if(ended){this.running=false;this.port.postMessage({type:'ended'});}
    } catch(error){this.fail(error);}
    return true;
  }
}
registerProcessor('sceneupmix-saf-editor',SceneUpmixProcessor);
