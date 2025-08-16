import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://aujuxswzmorrcuvpiqpm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1anV4c3d6bW9ycmN1dnBpcXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2MTUzODYsImV4cCI6MjA3MDE5MTM4Nn0.XI4gpSEUz_-CBLDhrFmFTgZzu88C14GOFdQOHChSoKE';

console.log('Creating Supabase client with:', { supabaseUrl, anonKey: supabaseAnonKey.substring(0, 20) + '...' });

// Storage adapter that works for both web and native
const getStorage = () => {
  if (typeof window !== 'undefined') {
    // Web environment
    return {
      getItem: (key: string) => {
        if (typeof localStorage === 'undefined') {
          return null;
        }
        return localStorage.getItem(key);
      },
      setItem: (key: string, value: string) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, value);
        }
      },
      removeItem: (key: string) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(key);
        }
      },
    };
  } else {
    // React Native environment
    return AsyncStorage;
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true, // Enable session detection in URL for OAuth callbacks
    flowType: 'pkce', // Use PKCE flow for better security
    storage: getStorage(),
    storageKey: 'supabase.auth.token', // Consistent storage key
  },
});

// Test basic connection
supabase.auth.getSession().then(({ data, error }) => {
  console.log('Initial Supabase connection test:', { 
    hasData: !!data, 
    hasSession: !!data?.session,
    error: error?.message,
    user: data?.session?.user?.email || 'No user'
  });
}).catch(err => {
  console.error('Supabase connection failed:', err);
});

// Database Types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  type: 'residential' | 'commercial' | 'mixed';
  status: 'active' | 'completed' | 'on_hold';
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  project_id: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  property_type: 'house' | 'apartment' | 'condo' | 'townhouse' | 'commercial';
  status: 'available' | 'sold' | 'pending' | 'off_market';
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  version: string;
  category: 'analytics' | 'management' | 'reporting' | 'automation';
  is_active: boolean;
  config?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Database Tables
export type Database = {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>;
      };
      properties: {
        Row: Property;
        Insert: Omit<Property, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Property, 'id' | 'created_at' | 'updated_at'>>;
      };
      modules: {
        Row: Module;
        Insert: Omit<Module, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Module, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};