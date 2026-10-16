'use client';
import {useAdmin} from '@/lib/admin';import {useSite} from '@/lib/site';
export function Up({slot,acc}:{slot:string;acc:string}){const {upload,remove,busy}=useAdmin();const {media}=useSite();
 return <span>{busy===slot?'Uploading…':<input type="file" accept={acc} style={{padding:8}} onChange={e=>upload(slot,e.target.files?.[0])}/>}{media[slot]&&<button className="sm" onClick={()=>remove(slot)}>Remove</button>}</span>}
export const Fld=({item,f,p,onSave}:any)=><input defaultValue={item[f]||''} placeholder={p} onBlur={e=>e.target.value!==(item[f]||'')&&onSave(e.target.value)}/>;
