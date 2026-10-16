'use client';
import {useSite} from '@/lib/site';
export default function P(){const {data}=useSite();const c=data.links?.comm;
 return <div className="page sec" style={{textAlign:'center'}}><h2 className="script">Join the community</h2><p style={{margin:'14px 0 20px',color:'var(--dim)'}}>A public community — not the private guild group.</p>
  {c?<a className="btn" target="_blank" rel="noopener noreferrer" href={c}>Join WhatsApp Community</a>:<p className="cin" style={{fontSize:12,color:'var(--dim)'}}>Community link not configured</p>}</div>}
