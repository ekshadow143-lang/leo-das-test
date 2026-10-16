'use client';
import {useSite} from '@/lib/site';import {useAdmin} from '@/lib/admin';import {mkey} from '@/lib/config';import {Up,Fld} from '@/components/AdminBits';
export default function P(){const {data}=useSite();const {edit,del,add}=useAdmin();const mem=data.members||[];
 return <><h2 className="script" style={{fontSize:48}}>Members</h2><p style={{color:'var(--dim)'}}>Character image file name = member- + IGN (lowercase, dashes), e.g. member-kingzz-120hz.png</p>
  {mem.map((m:any,i:number)=><div className="mrow" key={m.id}><Fld item={m} f="ign" p="IGN" onSave={(v:string)=>edit('members',i,'ign',v)}/><Fld item={m} f="title" p="Title" onSave={(v:string)=>edit('members',i,'title',v)}/><Fld item={m} f="role" p="Role" onSave={(v:string)=>edit('members',i,'role',v)}/><Fld item={m} f="spec" p="Specialty" onSave={(v:string)=>edit('members',i,'spec',v)}/>
   <span><Up slot={mkey(m)} acc="image/*,video/*"/><button className="sm" onClick={()=>del('members',i)}>Delete</button></span></div>)}
  <button className="sm" style={{marginTop:10}} onClick={()=>add('members',{ign:'New member',title:'',role:'Member',spec:''})}>+ Add member</button></>}
