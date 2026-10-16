'use client';
import {useSite} from '@/lib/site';
export function Slot({k,label,auto=true}:{k:string;label:string;auto?:boolean}){
 const {media}=useSite();const m=media[k];
 if(!m)return <div className="ph"><b>{label}</b><span>Add a file named “{k}” (any extension)<br/>to the public/media folder.<br/>See public/media/README.txt</span></div>;
 return m.type?.startsWith('video')?<video src={m.url} autoPlay={auto} muted loop playsInline preload="metadata"/>:<img src={m.url} alt={label} loading="lazy"/>}
