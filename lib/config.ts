/* Intro timing in seconds — match these to your voice recording */
export const INTRO={veniAt:1,vidiAt:3,viciAt:5,logoAt:7.5,finishAt:11};
export const MATCH_TYPES=['4v4 One Tap','4v4 Normal','4v4 No Rules','4v4 Custom','Other'];
export const slug=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const mkey=(m:any)=>'member-'+slug(m.ign);
export const GLOBAL_SLOTS:[string,string,string][]=[
['intro-voice','Intro voice (Veni Vidi Vici)','audio/*'],['bgm','Background music','audio/*'],['ambience','Ambience','audio/*'],
['hover','Hover sound','audio/*'],['click','Click sound','audio/*'],['reveal-sound','Member reveal sound','audio/*'],['reveal-music','Member reveal background audio','audio/*'],
['hero-video','Hero background video','video/*'],['hero-image','Hero background image','image/*'],['logo','Logo','image/*'],
['leo-video','LEO fullscreen video','video/*'],['leo-video-mobile','LEO video (mobile)','video/*'],['leo-poster','LEO poster image','image/*']];
export const DEFAULT_MEMBERS=[
['Leo Karthi','The Founder','Creator / Leader',''],['Kingzz 120Hz','The One-Tap King','Main Fighter','Close Range / One Tap'],
['Soul Itachi','The Guardian','Guardian / Acting Guild Leader',''],['SRMafia','The Elder','Elder',''],['Soul Master','The Master','Master of Team Leo Das',''],
['WhiteNinja','The Former Captain','Former Captain · Not Currently Playing',''],['Black120z','The Dead-Eye','Sniper','Long Range / Precision'],
['Lord','The Lord','Member',''],['Shadow','The Shadow','Member',''],['Uthisha','The Valkyrie','Member','']
].map((m,i)=>({id:'m'+i,ign:m[0],title:m[1],role:m[2],spec:m[3]}));
export const waMessage=(r:any)=>`⚔️ CHALLENGE REQUEST — TEAM LEO DAS\n\nTeam: ${r.team}\nCaptain: ${r.cap}\nWhatsApp: ${r.wa}\n\nGame: Free Fire MAX\nMatch: ${r.type}\n\nPreferred Date: ${r.dateS}\nPreferred Time: ${r.timeS}\n${r.msg?`\nMessage:\n${r.msg}\n`:''}\nRequest ID: ${r.code}`;
