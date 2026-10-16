'use client';
import {useEffect,useState} from 'react';import {useAdmin} from '@/lib/admin';
export default function P(){const {call}=useAdmin();const [r,setR]=useState<any[]>([]);
 const ld=()=>call({action:'requests'}).then(x=>setR(x.data||[])).catch(()=>{});useEffect(()=>{ld()},[]);
 const decide=async(id:string,status:string)=>{const notes=status==='REJECTED'?prompt('Note (optional)')||'':'';await call({action:'decide',id,status,notes});ld()};
 return <><h2 className="script" style={{fontSize:48}}>Match requests</h2>{r.length===0&&<p style={{color:'var(--dim)'}}>No requests yet.</p>}
  {r.map(x=><div key={x.id} className="slot"><div><b>{x.request_code}</b> · {x.team_name} ({x.captain_name}) · {x.whatsapp_number}<br/>{x.match_type} · {x.preferred_at}<br/>{x.message}<br/><span style={{color:'var(--gold)'}}>{x.status}</span>{x.admin_notes&&' — '+x.admin_notes}</div>
   <span><button className="sm" onClick={()=>decide(x.id,'APPROVED')}>Approve</button><button className="sm" onClick={()=>decide(x.id,'REJECTED')}>Reject</button></span></div>)}</>}
