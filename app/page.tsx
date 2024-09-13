//import Image from "next/image";
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  console.log(supabase); 
  return (
    
    <div>
      <h1>hi</h1>
    </div>
  );
}

async function fetchData() {
  const { data, error } = await supabase.from('user_profiles').select('*');
  console.log({ data, error });
}

fetchData();
