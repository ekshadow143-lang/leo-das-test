'use client';
import {useEffect,useState} from 'react';import {useSite} from '@/lib/site';
export default function Cinema({view,onClose}:{view:any;onClose:()=>void}){
 const {media,moments,play,stop}=useSite();const L=moments.filter((m:any)=>media[m.key]);const [n,setN]=useState(0);
 useEffect(()=>{if(!view)return;stop('bgm');if(view.t==='mo'){const k=moments[view.i]?.key;setN(Math.max(0,L.findIndex((m:any)=>m.key===k)))}return()=>play('bgm',true,.3)},[view?.t,view?.i]);
 useEffect(()=>{const h=(e:KeyboardEvent)=>e.key==='Escape'&&view&&onClose();addEventListener('keydown',h);return()=>removeEventListener('keydown',h)});
 if(!view)return null;
 const mob=typeof window!=='undefined'&&innerWidth<700;const lv=(mob&&media['leo-video-mobile'])||media['leo-video'];
 const st={width:'100vw',height:'100vh',objectFit:'cover' as const};
 return <div className="ov"><button className="x" aria-label="Close" onClick={onClose}>✕</button>
  {view.t==='leo'?(lv?<video className="fadein" src={lv.url} poster={media['leo-poster']?.url} autoPlay loop playsInline style={st}/>
   :<div style={{padding:30,textAlign:'center',width:'100%',height:'100%'}} className="ph"><b>LEO cinematic video</b><span>Add “leo-video.mp4” to the public/media folder.</span></div>)
  :L.length?<><video key={L[n]?.key} className="fadein" src={media[L[n].key].url} autoPlay playsInline onEnded={()=>setN((n+1)%L.length)} style={st}/>
    <div className="cin" style={{position:'fixed',left:'5vw',bottom:'6vh',fontSize:13}}>{L[n]?.t}</div></>
   :<p className="cin">The archive is waiting.</p>}</div>}
