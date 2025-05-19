import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to insert a new request_data record
export const insertRequestData = async (data) => {
  const { data: result, error } = await supabase
    .from("request_data")
    .insert(data);
  if (error) throw error;
  return result;
};

// Function to fetch all request_data records
export const fetchRequestData = async () => {
  const { data, error } = await supabase.from("request_data").select("*");
  if (error) throw error;
  return data;
};

export const fetchRequestDataStats = async () => {
  const { data, error } = await supabase.from("request_data").select("*");
  if (error) throw error;
  return data;
};

// Function to update a request_data record by ID
// export const updateRequestData = async (id, updates) => {
//   console.log(updates);
//   const { data, error } = await supabase
//     .from("request_data")
//     .update(updates)
//     .eq("id", id);
//   if (error) throw error;
//   console.log(data, id, error);
//   return data;
// };
export const updateRequestData = async (id, updates) => {
  // Convert string ID to proper UUID format if needed
  const { data, error } = await supabase
    .from("request_data")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    console.error("Error updating request_data:", error.message);
    throw error;
  }

  return data;
};
// Function to delete a request_data record by ID
export const deleteRequestData = async (id) => {
  const { data, error } = await supabase
    .from("request_data")
    .delete()
    .eq("id", id)
    .select() // Required to get the deleted data back
    .single(); // For getting a single row
  if (error) throw error;
  return data;
};

export default supabase;
