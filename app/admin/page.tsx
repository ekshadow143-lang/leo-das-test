'use client';
import {useEffect,useState} from 'react';import {useAdmin} from '@/lib/admin';import {useSite} from '@/lib/site';
export default function Dash(){const {call,save}=useAdmin();const {data}=useSite();const [r,setR]=useState<any[]|null>(null);const [d,setD]=useState<any>(null);const L=data.links||{};
 useEffect(()=>{call({action:'requests'}).then(x=>setR(x.data||[])).catch(()=>setR([]))},[]);
 const c=(s:string)=>r?r.filter(x=>x.status===s).length:'…';
 return <><h2 className="script" style={{fontSize:56}}>Command Center</h2>
  <p>Pending: <b>{c('PENDING')}</b> · Approved: <b>{c('APPROVED')}</b> · Rejected: <b>{c('REJECTED')}</b></p>
  <h3>Squad status</h3><select value={data.status} onChange={e=>save('status',e.target.value)} style={{maxWidth:300}}>{['ONLINE','IN MATCH','OFFLINE','NOT AVAILABLE'].map(s=><option key={s}>{s}</option>)}</select>
  <h3>Links</h3><div className="stack"><input placeholder="Challenge group invite URL" defaultValue={L.wa||''} onBlur={e=>save('links',{...L,wa:e.target.value})}/><input placeholder="Community invite URL" defaultValue={L.comm||''} onBlur={e=>save('links',{...L,comm:e.target.value})}/></div>
  <h3>Connection check</h3><button className="btn" onClick={async()=>setD(await call({action:'diagnose'}).catch((e:any)=>({error:e.message})))}>Test Supabase</button>
  {d&&<pre>{JSON.stringify(d,null,2)}{'\n'}{d.reach&&d.reach!=='ok'?'→ Server cannot reach Supabase. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on Vercel, then redeploy.':d.reach==='ok'?'→ Connected.':''}</pre>}</>}
