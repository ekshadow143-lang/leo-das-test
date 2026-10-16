'use client';
import {createContext,useContext} from 'react';
export const AdminCtx=createContext<any>(null);export const useAdmin=()=>useContext(AdminCtx);
