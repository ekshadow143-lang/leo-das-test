'use client';
import {createContext,useContext,useEffect,useRef,useState,useCallback} from 'react';
import {sb} from './db';import {DEFAULT_MEMBERS} from './config';
const Ctx=createContext<any>(null);export const useSite=()=>useContext(Ctx);
export function SiteProvider({children}:{children:React.ReactNode}){
 const [media,setMedia]=useState<Record<string,any>>({});
 const [data,setData]=useState<any>({members:DEFAULT_MEMBERS,moments:[],vault:[],links:{},status:'ONLINE'});
 const [muted,setMuted]=useState(false);
 const mr=useRef(media),mu=useRef(false),au=useRef<Record<string,HTMLAudioElement>>({});
 mr.current=media;
 const load=useCallback(async()=>{try{
  const [m,d]=await Promise.all([sb.from('media').select('*'),sb.from('site_data').select('*')]);
  const mm:any={};(m.data||[]).forEach((r:any)=>mm[r.slot]={url:r.url,type:r.type});setMedia(mm);
  const dd:any={};(d.data||[]).forEach((r:any)=>dd[r.key]=r.value);setData((p:any)=>({...p,...dd}));
 }catch{}},[]);
 useEffect(()=>{load()},[load]);
 const play=(k:string,loop=false,vol=.8)=>{const m=mr.current[k];if(!m||mu.current)return;let a=au.current[k];if(!a||a.src!==m.url){a=au.current[k]=new Audio(m.url)}a.loop=loop;a.volume=vol;if(!loop)a.currentTime=0;a.play().catch(()=>{})};
 const stop=(k:string)=>au.current[k]?.pause();
 const toggle=()=>{mu.current=!mu.current;setMuted(mu.current);if(mu.current)Object.values(au.current).forEach(a=>a.pause());else play('bgm',true,.3)};
 useEffect(()=>{const c=(e:any)=>{if(e.target.closest?.('button,a'))play('clickSnd',false,.4)};const h=(e:any)=>{if(e.target.closest?.('button,a'))play('hoverSnd',false,.2)};
  document.addEventListener('click',c);document.addEventListener('mouseover',h);return()=>{document.removeEventListener('click',c);document.removeEventListener('mouseover',h)}},[]);
 return <Ctx.Provider value={{media,data,load,play,stop,muted,toggle}}>{children}</Ctx.Provider>}
