import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sklajnyxufqefzdylmsa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrbGFqbnl4dWZxZWZ6ZHlsbXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMDY5MTEsImV4cCI6MjA2NDY4MjkxMX0.A94jz4FUs_8NR_FQfbeA6QCY-gQaZMIGheLbWI3VLyY'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);