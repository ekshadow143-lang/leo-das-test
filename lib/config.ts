/* Intro timing in seconds — match these to your voice recording */
export const INTRO={veniAt:1,vidiAt:3,viciAt:5,logoAt:7.5,finishAt:11};
export const MATCH_TYPES=['4v4 One Tap','4v4 Normal','4v4 No Rules','4v4 Custom','Other'];
export const GLOBAL_SLOTS:[string,string,string][]=[
['introVoice','Intro voice (Veni Vidi Vici)','audio/*'],['bgm','Background music','audio/*'],['ambience','Ambience','audio/*'],
['hoverSnd','Hover sound','audio/*'],['clickSnd','Click sound','audio/*'],['revealSnd','Member reveal sound','audio/*'],['revealBgm','Member reveal background audio (loops)','audio/*'],
['heroVideo','Hero background video','video/*'],['heroImg','Hero background image (used if no video)','image/*'],
['logo','Logo','image/*'],['leoVideo','LEO fullscreen video','video/*'],['leoVideoMobile','LEO video (mobile, optional)','video/*'],['leoPoster','LEO poster image','image/*']];
export const DEFAULT_MEMBERS=[
['Leo Karthi','The Founder','Creator / Leader',''],['Kingzz 120Hz','The One-Tap King','Main Fighter','Close Range / One Tap'],
['Soul Itachi','The Guardian','Guardian / Acting Guild Leader',''],['SRMafia','The Elder','Elder',''],['Soul Master','The Master','Master of Team Leo Das',''],
['WhiteNinja','The Former Captain','Former Captain · Not Currently Playing',''],['Black120z','The Dead-Eye','Sniper','Long Range / Precision'],
['Lord','The Lord','Member',''],['Shadow','The Shadow','Member',''],['Uthisha','The Valkyrie','Member','']
].map((m,i)=>({id:'m'+i,ign:m[0],title:m[1],role:m[2],spec:m[3]}));
export const waMessage=(r:any)=>`⚔️ CHALLENGE REQUEST — TEAM LEO DAS\n\nTeam: ${r.team}\nCaptain: ${r.cap}\nWhatsApp: ${r.wa}\n\nGame: Free Fire MAX\nMatch: ${r.type}\n\nPreferred Date: ${r.dateS}\nPreferred Time: ${r.timeS}\n${r.msg?`\nMessage:\n${r.msg}\n`:''}\nRequest ID: ${r.code}`;
