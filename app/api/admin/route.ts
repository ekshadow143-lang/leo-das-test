import {NextResponse} from 'next/server';import {createClient} from '@supabase/supabase-js';
export async function POST(req:Request){
 const b=await req.json();
 if(b.password!==(process.env.ADMIN_PASSWORD||'love')){await new Promise(r=>setTimeout(r,1200));return NextResponse.json({error:'denied'},{status:401})}
 const s=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!);const ok=NextResponse.json({ok:1});
 const fail=(e:any)=>NextResponse.json({error:e?.message||'error'},{status:500});
 switch(b.action){
  case 'login':return ok;
  case 'signedUrl':{const path=`${String(b.slot).replace(/[^\w-]/g,'_')}-${Date.now()}-${String(b.name).replace(/[^\w.-]/g,'_')}`;
   const {data,error}=await s.storage.from('media').createSignedUploadUrl(path);if(error)return fail(error);return NextResponse.json({path,token:data.token})}
  case 'setMedia':{const {data}=s.storage.from('media').getPublicUrl(b.path);const {error}=await s.from('media').upsert({slot:b.slot,url:data.publicUrl,type:b.type});return error?fail(error):ok}
  case 'deleteMedia':{await s.from('media').delete().eq('slot',b.slot);return ok}
  case 'saveData':{const {error}=await s.from('site_data').upsert({key:b.key,value:b.value,updated_at:new Date().toISOString()});return error?fail(error):ok}
  case 'requests':{const {data}=await s.from('match_requests').select('*').order('created_at',{ascending:false});return NextResponse.json({data})}
  case 'decide':{const st=b.status==='APPROVED'?'APPROVED':b.status==='REJECTED'?'REJECTED':'CANCELLED';const t=new Date().toISOString();
   const {error}=await s.from('match_requests').update({status:st,admin_notes:String(b.notes||'').slice(0,500),approved_at:st==='APPROVED'?t:null,rejected_at:st==='REJECTED'?t:null}).eq('id',b.id);return error?fail(error):ok}
 }
 return NextResponse.json({error:'bad action'},{status:400})}
