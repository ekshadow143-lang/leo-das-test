'use client';
import {useState} from 'react';import {useSite} from '@/lib/site';import {Slot} from '@/components/Slot';import Cinema from '@/components/Cinema';
export default function P(){const {moments}=useSite();const [i,setI]=useState<number|null>(null);
 return <div className="page"><section className="row"><h2 className="cin">Moments</h2>
  {moments.length?<><button className="btn red" onClick={()=>setI(0)}>Play all</button><div className="grid" style={{marginTop:14}}>{moments.map((m:any,j:number)=><button key={m.key} className="poster tile" aria-label={'Play '+m.t} onClick={()=>setI(j)}><Slot k={m.key} label={m.t} auto={false}/></button>)}</div></>
  :<div className="poster tile still"><div className="ph"><b>The archive is waiting</b><span>Add files named moment-01.mp4, moment-02.mp4… to public/media.</span></div></div>}
  <Cinema view={i===null?null:{t:'mo',i}} onClose={()=>setI(null)}/></section></div>}
