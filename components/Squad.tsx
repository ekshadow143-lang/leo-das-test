'use client';
import {useEffect,useState} from 'react';import {useSite} from '@/lib/site';import {Slot} from './Slot';import {mkey} from '@/lib/config';
export default function Squad(){
 const {data,play,stop}=useSite();const [m,setM]=useState<any>(null);const [vis,setVis]=useState(false);const [on,setOn]=useState(false);
 const open=(x:any)=>{stop('bgm');setM(x);setOn(false);setVis(false);requestAnimationFrame(()=>setVis(true));play('reveal-sound');play('reveal-music',true,.5);setTimeout(()=>setOn(true),1200)};
 const close=()=>{stop('reveal-music');setVis(false);setTimeout(()=>{setM(null);setOn(false)},700);play('bgm',true,.3)};
 useEffect(()=>{const h=(e:KeyboardEvent)=>e.key==='Escape'&&m&&close();addEventListener('keydown',h);return()=>removeEventListener('keydown',h)});
 const list=data.members||[];
 return <section className="row" id="squad"><h2 className="cin">The Squad</h2>
  {list.length===0?<p className="cin" style={{fontSize:12,color:'var(--dim)'}}>Roster unavailable</p>:
  <div className="scroller">{list.map((x:any)=><button key={x.id} className="poster" aria-label={'Open '+x.ign} onClick={()=>open(x)}><Slot k={mkey(x)} label={x.ign+' character'} auto={false}/></button>)}</div>}
  {m&&<div className="ov rev" style={{opacity:vis?1:0}}>
   <div className={'c'+(on?' on':'')}><div className="pic"><Slot k={mkey(m)} label={m.ign} auto={false}/></div>
    <div className="t"><div className="cin" style={{fontSize:12,color:'var(--gold)'}}>Team Leo Das</div>
     <div className="script" style={{fontSize:'clamp(54px,9vw,110px)',lineHeight:1}}>{m.ign}</div>
     <div className="cin" style={{color:'var(--red)',fontSize:15}}>{m.title}</div>
     <div style={{marginTop:14}}>{m.role}{m.spec&&<div className="cin" style={{fontSize:12,color:'var(--dim)',marginTop:8}}>{m.spec}</div>}<div className="cin" style={{fontSize:11,marginTop:22,color:'var(--dim)'}}>Free Fire MAX</div></div></div></div>
   <button className="x" aria-label="Close" onClick={close}>✕</button></div>}
 </section>}
