'use client';
import {useSite} from '@/lib/site';import {GLOBAL_SLOTS} from '@/lib/config';import {Up} from '@/components/AdminBits';
export default function P(){const {media}=useSite();
 return <><h2 className="script" style={{fontSize:48}}>Media</h2><p style={{color:'var(--dim)'}}>Easiest: drop files named like “bgm.mp3” into the public/media folder (see README.txt there). Uploads here override the folder files.</p>
  {GLOBAL_SLOTS.map(([k,l,a])=><div className="slot" key={k}><div>{l} <small style={{color:'var(--dim)'}}>({k})</small> <span style={{color:media[k]?'#6c6':'var(--dim)'}}>{media[k]?'● set':'○ empty'}</span></div><Up slot={k} acc={a}/></div>)}</>}
