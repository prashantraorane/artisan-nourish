import { supabase } from '@/integrations/supabase/client';

// Helper to bypass TypeScript strict checking while types regenerate
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = supabase as any;
