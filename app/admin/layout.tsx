'use client';
import {useEffect,useState} from 'react';import Link from 'next/link';import {usePathname} from 'next/navigation';
import {sb} from '@/lib/db';import {useSite} from '@/lib/site';import {AdminCtx} from '@/lib/admin';
const TABS=[['Dashboard','/admin'],['Requests','/admin/requests'],['Media','/admin/media'],['Members','/admin/members'],['Moments','/admin/moments'],['Vault','/admin/vault']];
export default function AdminLayout({children}:{children:React.ReactNode}){
 const {data,load}=useSite();const p=usePathname();
 const [pw,setPw]=useState('');const [ok,setOk]=useState(false);const [err,setErr]=useState('');const [busy,setBusy]=useState('');
 const call=async(b:any,pass=pw)=>{const r=await fetch('/api/admin',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:pass,...b})});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'error');return j};
 const enter=async(pass:string)=>{try{await call({action:'login'},pass);sessionStorage.setItem('ld-pw',pass);setPw(pass);setOk(true);setErr('')}catch{setErr('Access denied.')}};
 useEffect(()=>{const s=sessionStorage.getItem('ld-pw');if(s)enter(s)},[]);
 const upload=async(slot:string,f?:File)=>{if(!f)return;setBusy(slot);try{const {path,token}=await call({action:'signedUrl',slot,name:f.name});
  const {error}=await sb.storage.from('media').uploadToSignedUrl(path,token,f);if(error)throw error;await call({action:'setMedia',slot,path,type:f.type});await load()}catch(e:any){alert('Upload failed: '+e.message+'\n\nOpen Dashboard → Connection check.')}setBusy('')};
 const remove=async(slot:string)=>{await call({action:'deleteMedia',slot});await load()};
 const save=async(key:string,value:any)=>{try{await call({action:'saveData',key,value});await load()}catch(e:any){alert('Save failed: '+e.message+'\n\nOpen Dashboard → Connection check.')}};
 const edit=(key:string,i:number,f:string,v:string)=>{const n=[...(data[key]||[])];n[i]={...n[i],[f]:v};save(key,n)};
 const del=(key:string,i:number)=>{const n=[...(data[key]||[])];n.splice(i,1);save(key,n)};
 const add=(key:string,o:any)=>save(key,[...(data[key]||[]),{id:key[0]+Date.now(),...o}]);
 if(!ok)return <div className="ov" style={{position:'static',minHeight:'100vh'}}><form onSubmit={e=>{e.preventDefault();enter(pw)}} style={{textAlign:'center',maxWidth:300}}><div className="script" style={{fontSize:44}}>Command Center</div>
  <input type="password" autoFocus placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} style={{margin:'16px 0'}}/>{err&&<div className="err">{err}</div>}<button className="btn">Enter</button></form></div>;
 return <AdminCtx.Provider value={{call,upload,remove,save,edit,del,add,busy}}>
  <div className="anav cin">{TABS.map(([t,h])=><Link key={h} href={h} className={p===h?'on':''}>{t}</Link>)}<a href="#" onClick={e=>{e.preventDefault();sessionStorage.removeItem('ld-pw');location.href='/'}}>Log out</a></div>
  <div className="adm">{children}</div></AdminCtx.Provider>}
