'use client';
import {useSite} from '@/lib/site';import {Slot} from '@/components/Slot';
export default function P(){const {vault}=useSite();
 return <div className="page"><section className="row"><h2 className="cin">The Vault — nothing that mattered gets forgotten</h2>
  {vault.length?<div className="grid">{vault.map((m:any)=><div key={m.key} className="poster tile still"><Slot k={m.key} label={m.t} auto={false}/></div>)}</div>
  :<div className="poster tile still"><div className="ph"><b>History hasn’t been uploaded yet</b><span>Add files named vault-01.jpg, vault-02.png… to public/media.</span></div></div>}</section></div>}
