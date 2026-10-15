'use client';
import {useState} from 'react';import {MATCH_TYPES,waMessage} from '@/lib/config';import {useSite} from '@/lib/site';
export default function Challenge(){
 const {data}=useSite();const wa=data.links?.wa;
 const [f,setF]=useState<any>({type:MATCH_TYPES[0]});const [step,setStep]=useState(0);const [err,setErr]=useState('');
 const [res,setRes]=useState<any>(null);const [copied,setCopied]=useState(false);const [busy,setBusy]=useState(false);
 const set=(k:string)=>(e:any)=>setF({...f,[k]:e.target.value});
 const d=f.dt?new Date(f.dt):null;const dateS=d?.toLocaleDateString(undefined,{dateStyle:'long'});const timeS=d?.toLocaleTimeString([],{timeStyle:'short'});
 const review=(e:any)=>{e.preventDefault();if(!/^\+?[0-9 ]{8,15}$/.test((f.wa||'').trim()))return setErr('Enter a valid WhatsApp number.');if(+new Date(f.dt)<Date.now())return setErr('Pick a future date and time.');setErr('');setStep(1)};
 const copy=async(t:string)=>{try{await navigator.clipboard.writeText(t);setCopied(true);return true}catch{return false}};
 const submit=async()=>{setBusy(true);setErr('');try{
  const r=await fetch('/api/challenge',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...f,dateS,timeS})});const j=await r.json();if(!r.ok)throw new Error(j.error||'Could not submit');
  const msg=waMessage({...f,dateS,timeS,code:j.code});setRes({code:j.code,msg});await copy(msg);setStep(2)}catch(e:any){setErr(e.message)}setBusy(false)};
 return <section className="sec" id="challenge"><h2 className="script">You want a match?</h2><p className="cin" style={{color:'var(--red)',fontSize:13}}>Prove it.</p>
  {step===0&&<form onSubmit={review}><input placeholder="Team / clan name" required maxLength={40} value={f.team||''} onChange={set('team')}/><input placeholder="Captain / contact name" required maxLength={40} value={f.cap||''} onChange={set('cap')}/>
   <input placeholder="WhatsApp number (+91…)" required inputMode="tel" value={f.wa||''} onChange={set('wa')}/>
   <select value={f.type} onChange={set('type')}>{MATCH_TYPES.map(t=><option key={t}>{t}</option>)}</select>
   <input type="datetime-local" required value={f.dt||''} onChange={set('dt')}/><textarea placeholder="Message / notes (optional)" maxLength={300} value={f.msg||''} onChange={set('msg')}/>
   <input tabIndex={-1} autoComplete="off" aria-hidden style={{position:'absolute',left:'-9999px'}} onChange={set('website')}/>
   {err&&<div className="err">{err}</div>}<button className="btn red">Review challenge</button></form>}
  {step===1&&<div style={{marginTop:20,lineHeight:2}}><p className="cin" style={{color:'var(--gold)',fontSize:13}}>Review challenge</p>Team: {f.team}<br/>Captain: {f.cap}<br/>WhatsApp: {f.wa}<br/>Game: Free Fire MAX<br/>Match: {f.type}<br/>Date: {dateS} · {timeS}<br/>{f.msg&&<>Message: {f.msg}<br/></>}<br/>
   {err&&<div className="err">{err}</div>}<button className="btn" onClick={()=>setStep(0)}>Edit request</button><button className="btn red" disabled={busy} onClick={submit}>{busy?'Sending…':'Submit challenge'}</button></div>}
  {step===2&&res&&<div style={{marginTop:24,maxWidth:560}}><p className="cin" style={{color:'var(--gold)',fontSize:13}}>Challenge request created</p>
   <div className="script" style={{fontSize:64,color:'var(--red)'}}>{res.code}</div><p className="script" style={{fontSize:30}}>Your message is ready.</p>
   <p>{copied?'✓ MESSAGE COPIED TO CLIPBOARD':'Tap COPY MESSAGE below.'}</p><br/><button className="btn" onClick={()=>copy(res.msg)}>{copied?'Copy again':'Copy message'}</button>
   <p className="cin" style={{fontSize:12,margin:'24px 0 12px',color:'var(--gold)'}}>Join the challenge group</p>
   {wa?<a className="btn red" target="_blank" rel="noopener noreferrer" href={wa}>Open WhatsApp</a>:<p style={{color:'var(--dim)'}}>Challenge group link not configured yet.</p>}
   <p style={{color:'var(--dim)',marginTop:14,fontSize:14}}>Join the group and paste the copied message so the Leo Das team can identify your request.</p></div>}
 </section>}
