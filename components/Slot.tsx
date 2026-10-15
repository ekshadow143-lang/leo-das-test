'use client';
import {useSite} from '@/lib/site';
export function Slot({k,label,auto=true}:{k:string;label:string;auto?:boolean}){
 const {media}=useSite();const m=media[k];
 if(!m)return <div className="ph"><b>{label}</b><span>Your own file goes here.<br/>Open /admin → upload “{label}”.</span></div>;
 return m.type?.startsWith('video')?<video src={m.url} autoPlay={auto} muted loop playsInline preload="metadata"/>:<img src={m.url} alt={label} loading="lazy"/>}
