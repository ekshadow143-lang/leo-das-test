'use client';
import {useEffect,useState} from 'react';import {useSite} from '@/lib/site';
export default function Cinema({view,onClose}:{view:any;onClose:()=>void}){
 const {media,data,play,stop}=useSite();const L=(data.moments||[]).filter((m:any)=>media['moment:'+m.id]);const [n,setN]=useState(0);
 useEffect(()=>{if(!view)return;stop('bgm');if(view.t==='mo'){const id=data.moments?.[view.i]?.id;setN(Math.max(0,L.findIndex((m:any)=>m.id===id)))}return()=>play('bgm',true,.3)},[view]);
 useEffect(()=>{const h=(e:KeyboardEvent)=>e.key==='Escape'&&view&&onClose();addEventListener('keydown',h);return()=>removeEventListener('keydown',h)});
 if(!view)return null;
 const mob=typeof window!=='undefined'&&innerWidth<700;const lv=(mob&&media.leoVideoMobile)||media.leoVideo;
 const st={width:'100vw',height:'100vh',objectFit:'cover' as const};
 return <div className="ov"><button className="x" aria-label="Close" onClick={onClose}>✕</button>
  {view.t==='leo'?(lv?<video className="fadein" src={lv.url} poster={media.leoPoster?.url} autoPlay loop playsInline style={st}/>
   :<div style={{padding:30,textAlign:'center'}} className="ph"><b>LEO cinematic video</b><span>Upload it in /admin → “LEO fullscreen video”.</span></div>)
  :L.length?<><video key={L[n]?.id} className="fadein" src={media['moment:'+L[n]?.id].url} autoPlay playsInline onEnded={()=>setN((n+1)%L.length)} style={st}/>
    <div className="cin" style={{position:'fixed',left:'5vw',bottom:'6vh',fontSize:13}}>{L[n]?.t}</div></>
   :<p className="cin">The archive is waiting.</p>}</div>}
