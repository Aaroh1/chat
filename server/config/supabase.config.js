const { createClient } = require("@supabase/supabase-js");

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.DB_URL,process.env.DB_PUBLIC_ANON
);

async function getTodos() {
  let { data, error } = await supabase.from("users").select("*");
  console.log(data)
}

module.exports = supabase;