import { createClient } from "@supabase/supabase-js"
import env from "react-dotenv";
// Create a single supabase client for interacting with your database
const supabase = createClient(env.DB_URL, env.DB_PUBLIC_ANON);


export default supabase;