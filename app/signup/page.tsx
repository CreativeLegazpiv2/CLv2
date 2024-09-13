"use client";
import Image from 'next/image';
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
    <div className="overflow-x-hidden relative mt-16">
        <h1 className="text-white font-extrabold text-center text-7xl">BE ONE OF US</h1>
        <div className="flex w-auto h-full mt-5 mb-16 mx-12 bg-white rounded-3xl">
            {/* Login Picture Wrapper */}
            <div className="w-1/4 m-10 h-full md:block hidden">
                <Image src="/assets/images/temp-img.jpg" alt="login img" 
                height={500} width={300}
                layout="responsive" objectFit="contain"
                className="my-auto"/>
            </div>
            <div className="w-10/12">
                {/* Logo Wrapper */}
                <div className="w-auto h-auto my-5">
                <Image src="/assets/images/Creative_Legazpi_LogoOutline-b.svg" alt="creative Legazpi"
                height={173} width={300} className="mx-auto"
                />
                </div>
                {/* Sign Up form wrapper*/}
                <div className="my-10 mx-10">
                    <p className="text-black text-3xl">REGISTER</p>
                    <form onSubmit={handleSignup} className="space-y-1">
                        <label className="block">
                            First Name:
                            <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            />
                        </label>

                        <label className="block">
                            Middle Name:
                            <input
                                type="text"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                            />
                        </label>

                        <label className="block">
                            Last Name:
                            <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            />
                        </label>

                        <label className="block">
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>

                        <label className="block">
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>

                        <label className="block">
                            Sex:
                            <select value={sex} onChange={(e) => setSex(e.target.value)} required>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="prefer not to say">Prefer not to say</option>
                            </select>
                        </label>
                        <label>
                            Profession:
                            <input
                                type="text"
                                value={profession}
                                onChange={(e) => setProfession(e.target.value)}
                                required
                            />
                        </label>
                        <label className="block">
                        Organization:
                        <input
                            type="text"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                        />
                        </label>
                        {organization && (
                        <>
                            <label className="block">
                            Designation:
                            <input
                                type="text"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                            />
                            </label>
                        </>
                        )}

                        <label className="block">
                            Contact No.:
                            <input
                                type="text"
                                value={contactNo}
                                onChange={(e) => setContactNo(e.target.value)}
                                required
                            />
                        </label>
                        <label className="block">
                            Agreements:
                            <textarea
                                value={agreements}
                                onChange={(e) => setAgreements(e.target.value)}
                                required
                            />
                        </label>
                        <label className="block">
                            Birthdate:
                            <input
                                type="date"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                required
                            />
                        </label>
                    </form>

                    <button type="submit">Sign Up</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </div>
            </div>
        </div>
    </div>

  );
}
