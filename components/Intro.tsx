'use client';
import {useEffect,useState} from 'react';import {INTRO} from '@/lib/config';import {useSite} from '@/lib/site';
export default function Intro(){
 const {play,media}=useSite();const [st,setSt]=useState('wait');const [w,setW]=useState(0);const [fade,setFade]=useState(false);
 useEffect(()=>{if(sessionStorage.getItem('ld-intro'))setSt('done')},[]);
 const go=()=>{setSt('run');play('intro-voice');play('bgm',true,.3);
  [INTRO.veniAt,INTRO.vidiAt,INTRO.viciAt,INTRO.logoAt].forEach((t,i)=>setTimeout(()=>setW(i+1),t*1000));
  setTimeout(()=>setFade(true),INTRO.finishAt*1000);
  setTimeout(()=>{setSt('done');sessionStorage.setItem('ld-intro','1')},INTRO.finishAt*1000+1300)};
 if(st==='done')return null;
 return <div className="ov intro" style={{opacity:fade?0:1,transition:'opacity 1.2s'}}>
  {st==='wait'&&<button className="btn" onClick={go}>Enter Leo Das</button>}
  {['Veni.','Vidi.','Vici.'].map((t,i)=><div key={t} className={'w script'+(w===i+1?' on':'')}>{t}</div>)}
  <div className={'w'+(w===4?' on':'')}><div className="cin" style={{fontSize:14,color:'var(--gold)'}}>Team</div>
   <div className="script" style={{fontSize:'clamp(80px,18vw,220px)',lineHeight:1,color:'var(--red)'}}>Leo Das</div>
   <div className="cin" style={{fontSize:12,marginTop:8}}>Free Fire MAX Squad</div></div></div>}
