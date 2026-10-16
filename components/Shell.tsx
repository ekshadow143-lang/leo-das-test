'use client';
import Link from 'next/link';import {usePathname} from 'next/navigation';import {useEffect,useState} from 'react';import {useSite} from '@/lib/site';import Intro from './Intro';import Glow from './Glow';
const NAV=[['Squad','/members'],['Moments','/moments'],['Vault','/vault'],['Leo','/leo'],['Challenge','/challenge'],['Community','/community']];
export default function Shell({children}:{children:React.ReactNode}){
 const p=usePathname();const {muted,toggle}=useSite();const [egg,setEgg]=useState(false);
 useEffect(()=>{let last=0;const h=(e:KeyboardEvent)=>{const t=e.target as HTMLElement;if(/INPUT|TEXTAREA|SELECT/.test(t.tagName)||t.isContentEditable)return;
  const k=e.key.toLowerCase();if(k==='e')last=Date.now();else if(k==='k'&&Date.now()-last<2000){last=0;setEgg(true);setTimeout(()=>setEgg(false),6000)}else last=0};
  addEventListener('keydown',h);return()=>removeEventListener('keydown',h)},[]);
 if(p.startsWith('/admin'))return <>{children}</>;
 return <><Glow/><Intro/>
  <nav><Link href="/" className="logo script" style={{textDecoration:'none'}}>Leo Das</Link><span className="links cin">{NAV.map(([t,h])=><Link key={h} href={h}>{t}</Link>)}<button className="sb" onClick={toggle}>{muted?'SOUND OFF':'SOUND ON'}</button></span></nav>
  {children}
  <footer><div className="script" style={{fontSize:40,color:'var(--ink)'}}>Team Leo Das</div><div className="cin" style={{fontSize:11,margin:'8px 0'}}>Free Fire MAX Squad · A squad. A family.</div></footer>
  {egg&&<div className="ov" style={{zIndex:300}} onClick={()=>setEgg(false)}><div style={{textAlign:'center',padding:20}}><p className="cin" style={{fontSize:12,color:'var(--dim)'}}>System message</p>
   <p className="script" style={{fontSize:36,margin:'14px 0'}}>You found something that wasn’t supposed to be here.</p><div className="cin" style={{fontSize:26,color:'var(--gold)'}}>EK Enterprises</div><p style={{color:'var(--dim)',marginTop:8}}>Built behind the scenes for Team Leo Das.</p></div></div>}</>}
