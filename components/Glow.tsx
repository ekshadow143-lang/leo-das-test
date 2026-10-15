'use client';
import {useEffect,useRef} from 'react';
export default function Glow(){const r=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!matchMedia('(pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  let x=0,y=0,tx=0,ty=0,id=0;const mv=(e:MouseEvent)=>{tx=e.clientX;ty=e.clientY};
  const loop=()=>{x+=(tx-x)*.12;y+=(ty-y)*.12;if(r.current)r.current.style.transform=`translate(${x-150}px,${y-150}px)`;id=requestAnimationFrame(loop)};
  addEventListener('mousemove',mv);loop();return()=>{removeEventListener('mousemove',mv);cancelAnimationFrame(id)}},[]);
 return <div ref={r} className="glow"/>}
