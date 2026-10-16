'use client';
import {useSite} from '@/lib/site';import {useAdmin} from '@/lib/admin';import {Up,Fld} from '@/components/AdminBits';
export default function P(){const {data}=useSite();const {edit,del,add}=useAdmin();const list=data.moments||[];
 return <><h2 className="script" style={{fontSize:48}}>Moments</h2><p style={{color:'var(--dim)'}}>Easiest: put files named moment-01.mp4, moment-02.mp4… in public/media. Clips added here play after those.</p>
  {list.map((m:any,i:number)=><div className="slot" key={m.id}><Fld item={m} f="t" p="Title" onSave={(v:string)=>edit('moments',i,'t',v)}/><span><Up slot={'moment:'+m.id} acc="video/*"/><button className="sm" onClick={()=>del('moments',i)}>Delete</button></span></div>)}
  <button className="sm" style={{marginTop:10}} onClick={()=>add('moments',{t:'New clip'})}>+ Add clip</button></>}
