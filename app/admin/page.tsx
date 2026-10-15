'use client';
import {useState} from 'react';import {sb} from '@/lib/db';import {useSite} from '@/lib/site';import {GLOBAL_SLOTS} from '@/lib/config';
export default function Admin(){
 const [pw,setPw]=useState('');const [ok,setOk]=useState(false);const [err,setErr]=useState('');const [reqs,setReqs]=useState<any[]>([]);const [busy,setBusy]=useState('');
 const {media,data,load}=useSite();
 const api=async(b:any)=>{const r=await fetch('/api/admin',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:pw,...b})});const j=await r.json();if(!r.ok)throw new Error(j.error||'error');return j};
 const loadReqs=async()=>{try{setReqs((await api({action:'requests'})).data||[])}catch{}};
 const login=async(e:any)=>{e.preventDefault();try{await api({action:'login'});setOk(true);setErr('');loadReqs()}catch{setErr('Access denied.')}};
 const upload=async(slot:string,f?:File)=>{if(!f)return;setBusy(slot);try{const {path,token}=await api({action:'signedUrl',slot,name:f.name});
  const {error}=await sb.storage.from('media').uploadToSignedUrl(path,token,f);if(error)throw error;await api({action:'setMedia',slot,path,type:f.type});await load()}catch(e:any){alert('Upload failed: '+e.message)}setBusy('')};
 const remove=async(slot:string)=>{await api({action:'deleteMedia',slot});await load()};
 const save=async(key:string,value:any)=>{try{await api({action:'saveData',key,value});await load()}catch(e:any){alert(e.message)}};
 const edit=(key:string,i:number,f:string,v:string)=>{const n=[...(data[key]||[])];n[i]={...n[i],[f]:v};save(key,n)};
 const del=(key:string,i:number)=>{const n=[...(data[key]||[])];n.splice(i,1);save(key,n)};
 const add=(key:string,o:any)=>save(key,[...(data[key]||[]),{id:key[0]+Date.now(),...o}]);
 const decide=async(id:string,status:string)=>{const notes=status==='REJECTED'?prompt('Note (optional)')||'':'';await api({action:'decide',id,status,notes});loadReqs()};
 const Up=({slot,acc}:{slot:string;acc:string})=><span>{busy===slot?'Uploading…':<input type="file" accept={acc} style={{padding:8}} onChange={e=>upload(slot,e.target.files?.[0])}/>}{media[slot]&&<button className="sm" onClick={()=>remove(slot)}>Remove</button>}</span>;
 const Fld=({k,i,f,p}:any)=><input defaultValue={data[k][i][f]||''} placeholder={p} onBlur={e=>e.target.value!==(data[k][i][f]||'')&&edit(k,i,f,e.target.value)}/>;
 if(!ok)return <div className="ov" style={{position:'static',minHeight:'100vh'}}><form onSubmit={login} style={{textAlign:'center',maxWidth:300}}><div className="script" style={{fontSize:44}}>Command Center</div>
  <input type="password" autoFocus placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} style={{margin:'16px 0'}}/>{err&&<div className="err">{err}</div>}<button className="btn">Enter</button></form></div>;
 const mem=data.members||[],mo=data.moments||[],va=data.vault||[],L=data.links||{};
 return <div className="adm"><h2 className="script" style={{fontSize:56}}>Command Center</h2>
  <h3>Match requests</h3>{reqs.length===0&&<p style={{color:'var(--dim)'}}>No requests yet.</p>}
  {reqs.map(r=><div key={r.id} className="slot" style={{gridTemplateColumns:'1fr auto'}}><div><b>{r.request_code}</b> · {r.team_name} ({r.captain_name}) · {r.whatsapp_number}<br/>{r.match_type} · {r.preferred_at}<br/>{r.message}<br/><span style={{color:'var(--gold)'}}>{r.status}</span>{r.admin_notes&&' — '+r.admin_notes}</div>
   <span><button className="sm" onClick={()=>decide(r.id,'APPROVED')}>Approve</button><button className="sm" onClick={()=>decide(r.id,'REJECTED')}>Reject</button></span></div>)}
  <h3>Audio, video & images</h3>{GLOBAL_SLOTS.map(([k,l,a])=><div className="slot" key={k}><div>{l} <span style={{color:media[k]?'#6c6':'var(--dim)'}}>{media[k]?'● set':'○ empty'}</span></div><Up slot={k} acc={a}/></div>)}
  <h3>Members (card shows character image only)</h3>{mem.map((m:any,i:number)=><div className="mrow" key={m.id}><Fld k="members" i={i} f="ign" p="IGN"/><Fld k="members" i={i} f="title" p="Title"/><Fld k="members" i={i} f="role" p="Role"/><Fld k="members" i={i} f="spec" p="Specialty"/>
   <span><Up slot={'member:'+m.id} acc="image/*,video/*"/><button className="sm" onClick={()=>del('members',i)}>Delete</button></span></div>)}
  <button className="sm" style={{marginTop:10}} onClick={()=>add('members',{ign:'New member',title:'',role:'Member',spec:''})}>+ Add member</button>
  <h3>Moments (MP4 clips, play in order)</h3>{mo.map((m:any,i:number)=><div className="slot" key={m.id}><Fld k="moments" i={i} f="t" p="Title"/><span><Up slot={'moment:'+m.id} acc="video/*"/><button className="sm" onClick={()=>del('moments',i)}>Delete</button></span></div>)}
  <button className="sm" style={{marginTop:10}} onClick={()=>add('moments',{t:'Clip '+(mo.length+1)})}>+ Add clip</button>
  <h3>Vault</h3>{va.map((m:any,i:number)=><div className="slot" key={m.id}><Fld k="vault" i={i} f="t" p="Title"/><span><Up slot={'vault:'+m.id} acc="image/*,video/*"/><button className="sm" onClick={()=>del('vault',i)}>Delete</button></span></div>)}
  <button className="sm" style={{marginTop:10}} onClick={()=>add('vault',{t:'Item'})}>+ Add item</button>
  <h3>Links & status</h3><div className="stack"><input placeholder="Challenge group invite URL" defaultValue={L.wa||''} onBlur={e=>save('links',{...L,wa:e.target.value})}/><input placeholder="Community invite URL" defaultValue={L.comm||''} onBlur={e=>save('links',{...L,comm:e.target.value})}/>
   <select value={data.status} onChange={e=>save('status',e.target.value)}>{['ONLINE','IN MATCH','OFFLINE','NOT AVAILABLE'].map(s=><option key={s}>{s}</option>)}</select></div></div>}
