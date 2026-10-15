'use client';
import {useEffect,useState} from 'react';import {useSite} from '@/lib/site';
import {Slot} from '@/components/Slot';import Intro from '@/components/Intro';import Squad from '@/components/Squad';
import Challenge from '@/components/Challenge';import Cinema from '@/components/Cinema';import Glow from '@/components/Glow';
export default function Home(){
 const {media,data,muted,toggle}=useSite();const [view,setView]=useState<any>(null);const [egg,setEgg]=useState(false);
 useEffect(()=>{let last=0;const h=(e:KeyboardEvent)=>{const t=e.target as HTMLElement;if(/INPUT|TEXTAREA|SELECT/.test(t.tagName)||t.isContentEditable)return;
  const k=e.key.toLowerCase();if(k==='e')last=Date.now();else if(k==='k'&&Date.now()-last<2000){last=0;setEgg(true);setTimeout(()=>setEgg(false),6000)}else last=0};
  addEventListener('keydown',h);return()=>removeEventListener('keydown',h)},[]);
 const mo=data.moments||[],va=data.vault||[],L=data.links||{};
 return <main><Glow/><Intro/>
  <nav><span className="logo script">Leo Das</span><span className="links cin"><a href="#squad">Squad</a><a href="#moments">Moments</a><a href="#vault">Vault</a><a href="#challenge" className="keep">Challenge</a><a className="keep" onClick={()=>setView({t:'leo'})}>Leo</a>
   <button className="sb" onClick={toggle}>{muted?'SOUND OFF':'SOUND ON'}</button></span></nav>
  <header className="hero"><div className="bg">{media.heroVideo?<Slot k="heroVideo" label="Hero video"/>:<Slot k="heroImg" label="Hero background (video or image)"/>}</div>
   <div className="in"><div className="cin" style={{fontSize:15,color:'var(--gold)'}}>Team</div><h1 className="script">Leo Das</h1>
    <div className="cin tag">Free Fire MAX Squad · {data.status}</div>
    <div className="script" style={{fontSize:34,marginBottom:24}}>Veni. Vidi. Vici. <span style={{fontSize:20,color:'var(--dim)'}}>— we came, we saw, we conquered.</span></div>
    <a className="btn red" href="#squad">Enter the Squad</a><a className="btn" href="#moments">Watch the Moments</a><a className="btn" href="#challenge">Challenge Leo Das</a></div></header>
  <Squad/>
  <section className="row" id="moments"><h2 className="cin">Moments</h2><div className="scroller">
   {mo.length?mo.map((m:any,i:number)=><button key={m.id} className="poster tile" aria-label={'Play '+m.t} onClick={()=>setView({t:'mo',i})}><Slot k={'moment:'+m.id} label={m.t} auto={false}/></button>)
   :<div className="poster tile still"><div className="ph"><b>The archive is waiting</b><span>Add clips in /admin → Moments.</span></div></div>}</div></section>
  <section className="row" id="vault"><h2 className="cin">The Vault — nothing that mattered gets forgotten</h2><div className="scroller">
   {va.length?va.map((m:any)=><div key={m.id} className="poster tile still"><Slot k={'vault:'+m.id} label={m.t} auto={false}/></div>)
   :<div className="poster tile still"><div className="ph"><b>History hasn’t been uploaded yet</b><span>Add items in /admin → Vault.</span></div></div>}</div></section>
  <Challenge/>
  <section className="sec" style={{textAlign:'center'}}><h2 className="script">Join the community</h2><p style={{margin:'14px 0 20px',color:'var(--dim)'}}>A public community — not the private guild group.</p>
   {L.comm?<a className="btn" target="_blank" rel="noopener noreferrer" href={L.comm}>Join WhatsApp Community</a>:<p className="cin" style={{fontSize:12,color:'var(--dim)'}}>Community link not configured</p>}</section>
  <footer><div className="script" style={{fontSize:40,color:'var(--ink)'}}>Team Leo Das</div><div className="cin" style={{fontSize:11,margin:'8px 0'}}>Free Fire MAX Squad · A squad. A family.</div></footer>
  <Cinema view={view} onClose={()=>setView(null)}/>
  {egg&&<div className="ov" style={{zIndex:300}} onClick={()=>setEgg(false)}><div style={{textAlign:'center',padding:20}}><p className="cin" style={{fontSize:12,color:'var(--dim)'}}>System message</p>
   <p className="script" style={{fontSize:36,margin:'14px 0'}}>You found something that wasn’t supposed to be here.</p><div className="cin" style={{fontSize:26,color:'var(--gold)'}}>EK Enterprises</div>
   <p style={{color:'var(--dim)',marginTop:8}}>Built behind the scenes for Team Leo Das.</p></div></div>}
 </main>}
