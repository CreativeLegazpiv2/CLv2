"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@lib/supabaseClient'; // Adjust the path

const Profile = () => {
  interface ProfileData {
    username: string;
    email: string;
    // Add more fields as per your data
  }
  
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', 'user-id-here');

      if (error) {
        console.error(error);
      } else {
        setProfile(data[0]);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      {/* Add more fields as per your data */}
    </div>
  );
};

export default Profile;
