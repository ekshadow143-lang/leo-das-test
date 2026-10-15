import {NextResponse} from 'next/server';import {createClient} from '@supabase/supabase-js';
const hits=new Map<string,number[]>();
const c=(s:any,n:number)=>String(s||'').replace(/[<>]/g,'').trim().slice(0,n);
export async function POST(req:Request){
 const ip=req.headers.get('x-forwarded-for')?.split(',')[0]||'x';const now=Date.now();const h=(hits.get(ip)||[]).filter(t=>now-t<600000);
 if(h.length>=3)return NextResponse.json({error:'Too many requests. Try again later.'},{status:429});hits.set(ip,[...h,now]);
 const b=await req.json();if(b.website)return NextResponse.json({code:'LD-00000'});
 const team=c(b.team,40),cap=c(b.cap,40),wa=c(b.wa,20),type=c(b.type,30),msg=c(b.msg,300);
 if(!team||!cap||!/^\+?[0-9 ]{8,15}$/.test(wa)||!b.dateS||!b.timeS)return NextResponse.json({error:'Invalid request.'},{status:400});
 const A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';const code='LD-'+Array.from({length:5},()=>A[Math.floor(Math.random()*A.length)]).join('');
 const s=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!);
 const {error}=await s.from('match_requests').insert({request_code:code,team_name:team,captain_name:cap,whatsapp_number:wa,match_type:type,preferred_at:c(b.dateS,40)+' '+c(b.timeS,20),message:msg,status:'PENDING'});
 if(error)return NextResponse.json({error:'Could not save request.'},{status:500});
 return NextResponse.json({code})}
