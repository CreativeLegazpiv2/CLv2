"use client";

import { useState } from 'react';
import { supabase } from '@lib/supabaseClient';

// Define a type for user profile
interface UserProfile {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  password: string;
  sex?: 'male' | 'female' | 'prefer not to say';
  profession: string;
  organization?: string;
  designation?: string;
  contact_no: string;
  agreements: string;
  birthdate: string;
}

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState('');
  const [profession, setProfession] = useState('');
  const [organization, setOrganization] = useState('');
  const [designation, setDesignation] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [agreements, setAgreements] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Sign up the user
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) {
      setError(`Authentication error: ${authError.message}`);
      return;
    }

    // Insert user profile
    if (data?.user) {
      // Build the user profile object
      const userProfile: UserProfile = {
        id: data.user.id, // Use user ID from authentication
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        email,
        password, // Be cautious with password handling
        sex: sex as 'male' | 'female' | 'prefer not to say',
        profession,
        organization,
        designation: organization ? designation : undefined,
        contact_no: contactNo,
        agreements,
        birthdate
      };

      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert(userProfile);

      if (profileError) {
        setError(`Profile insertion error: ${profileError.message}`);
      } else {
        setSuccess('Signup successful!');
      }
    }
  };

  return (
    <div className="relative">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Middle Name:
          <input
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Sex:
          <select value={sex} onChange={(e) => setSex(e.target.value)} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer not to say">Prefer not to say</option>
          </select>
        </label>
        <br />
        <label>
          Profession:
          <input
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Organization:
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </label>
        <br />
        {organization && (
          <>
            <label>
              Designation:
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </label>
            <br />
          </>
        )}
        <label>
          Contact No.:
          <input
            type="text"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Agreements:
          <textarea
            value={agreements}
            onChange={(e) => setAgreements(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Birthdate:
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}
