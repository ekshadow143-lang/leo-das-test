import './globals.css';
import {Cinzel,Great_Vibes,Inter} from 'next/font/google';
import {SiteProvider} from '@/lib/site';import Shell from '@/components/Shell';import fs from 'fs';import path from 'path';
const files=(()=>{try{return fs.readdirSync(path.join(process.cwd(),'public','media'))}catch{return []}})();
const cin=Cinzel({subsets:['latin'],variable:'--f-cin'});
const scr=Great_Vibes({weight:'400',subsets:['latin'],variable:'--f-script'});
const body=Inter({subsets:['latin'],variable:'--f-body'});
export const metadata={title:'Team Leo Das — Free Fire MAX Squad',description:'Veni. Vidi. Vici. We came. We saw. We conquered.'};
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover' as const};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en" className={`${cin.variable} ${scr.variable} ${body.variable}`}><body><SiteProvider files={files}><Shell>{children}</Shell></SiteProvider></body></html>}
