'use client';
import Link from 'next/link';import {useSite} from '@/lib/site';import {Slot} from '@/components/Slot';import Squad from '@/components/Squad';
export default function Home(){
 const {media,data}=useSite();
 return <main><header className="hero"><div className="bg">{media['hero-video']?<Slot k="hero-video" label="Hero video"/>:<Slot k="hero-image" label="Hero background (video or image)"/>}</div>
  <div className="in"><div className="cin" style={{fontSize:15,color:'var(--gold)'}}>Team</div><h1 className="script">Leo Das</h1><div className="cin tag">Free Fire MAX Squad · {data.status}</div>
   <div className="script" style={{fontSize:34,marginBottom:24}}>Veni. Vidi. Vici. <span style={{fontSize:20,color:'var(--dim)'}}>— we came, we saw, we conquered.</span></div>
   <Link className="btn red" href="/members">Enter the Squad</Link><Link className="btn" href="/moments">Watch the Moments</Link><Link className="btn" href="/challenge">Challenge Leo Das</Link></div></header><Squad/></main>}
