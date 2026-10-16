'use client';
import {useRouter} from 'next/navigation';import Cinema from '@/components/Cinema';
const V={t:'leo'};
export default function P(){const r=useRouter();return <Cinema view={V} onClose={()=>r.push('/')}/>}
