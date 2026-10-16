'use client';
import {createContext,useContext,useEffect,useMemo,useRef,useState,useCallback} from 'react';
import {sb} from './db';import {DEFAULT_MEMBERS} from './config';
const EXT:any={png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',svg:'image/svg+xml',mp4:'video/mp4',webm:'video/webm',mp3:'audio/mpeg',wav:'audio/wav',m4a:'audio/mp4'};
const Ctx=createContext<any>(null);export const useSite=()=>useContext(Ctx);
export function SiteProvider({children,files=[]}:{children:React.ReactNode;files?:string[]}){
 const base=useMemo(()=>{const b:any={};files.forEach(f=>{const i=f.lastIndexOf('.');const t=EXT[f.slice(i+1).toLowerCase()];if(t)b[f.slice(0,i).toLowerCase()]={url:'/media/'+encodeURIComponent(f),type:t}});return b},[files]);
 const [remote,setRemote]=useState<any>({});
 const [data,setData]=useState<any>({members:DEFAULT_MEMBERS,moments:[],vault:[],links:{},status:'ONLINE'});
 const [muted,setMuted]=useState(false);
 const media={...base,...remote};
 const mr=useRef(media),mu=useRef(false),au=useRef<Record<string,HTMLAudioElement>>({});mr.current=media;
 const load=useCallback(async()=>{try{
  const [m,d]=await Promise.all([sb.from('media').select('*'),sb.from('site_data').select('*')]);
  const mm:any={};(m.data||[]).forEach((r:any)=>mm[r.slot]={url:r.url,type:r.type});setRemote(mm);
  const dd:any={};(d.data||[]).forEach((r:any)=>dd[r.key]=r.value);setData((p:any)=>({...p,...dd}));
 }catch{}},[]);
 useEffect(()=>{load()},[load]);
 const folder=(p:string,l:string)=>Object.keys(base).filter(k=>k.startsWith(p)).sort().map(k=>({id:k,key:k,t:l+' '+k.slice(p.length)}));
 const moments=[...folder('moment-','Moment'),...(data.moments||[]).map((m:any)=>({...m,key:'moment:'+m.id}))];
 const vault=[...folder('vault-','Vault'),...(data.vault||[]).map((m:any)=>({...m,key:'vault:'+m.id}))];
 const play=(k:string,loop=false,vol=.8)=>{const m=mr.current[k];if(!m||mu.current)return;let a=au.current[k];if(!a||!a.src.endsWith(m.url.split('/').pop()!)){a=au.current[k]=new Audio(m.url)}a.loop=loop;a.volume=vol;if(!loop)a.currentTime=0;a.play().catch(()=>{})};
 const stop=(k:string)=>au.current[k]?.pause();
 const toggle=()=>{mu.current=!mu.current;setMuted(mu.current);if(mu.current)Object.values(au.current).forEach(a=>a.pause());else play('bgm',true,.3)};
 useEffect(()=>{const c=(e:any)=>{if(e.target.closest?.('button,a'))play('click',false,.4)};const h=(e:any)=>{if(e.target.closest?.('button,a'))play('hover',false,.2)};
  document.addEventListener('click',c);document.addEventListener('mouseover',h);return()=>{document.removeEventListener('click',c);document.removeEventListener('mouseover',h)}},[]);
 return <Ctx.Provider value={{media,data,moments,vault,load,play,stop,muted,toggle}}>{children}</Ctx.Provider>}
