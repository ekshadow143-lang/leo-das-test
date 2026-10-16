'use client';
import {useSite} from '@/lib/site';import {useAdmin} from '@/lib/admin';import {Up,Fld} from '@/components/AdminBits';
export default function P(){const {data}=useSite();const {edit,del,add}=useAdmin();const list=data.vault||[];
 return <><h2 className="script" style={{fontSize:48}}>Vault</h2><p style={{color:'var(--dim)'}}>Easiest: put files named vault-01.jpg, vault-02.png… in public/media. Items added here show after those.</p>
  {list.map((m:any,i:number)=><div className="slot" key={m.id}><Fld item={m} f="t" p="Title" onSave={(v:string)=>edit('vault',i,'t',v)}/><span><Up slot={'vault:'+m.id} acc="image/*,video/*"/><button className="sm" onClick={()=>del('vault',i)}>Delete</button></span></div>)}
  <button className="sm" style={{marginTop:10}} onClick={()=>add('vault',{t:'New item'})}>+ Add item</button></>}
