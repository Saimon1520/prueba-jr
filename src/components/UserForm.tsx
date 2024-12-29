'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const UserForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [bs, setBs] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que los campos de dirección no estén vacíos
    if (!street || !suite || !city || !zipcode || !lat || !lng) {
      setError('Todos los campos de la dirección son requeridos');
      return;
    }

    const newUser = {
      name,
      username,
      email,
      password,
      phone,
      website,
      address: {
        street,
        suite,
        city,
        zipcode,
        geo: {
          lat,
          lng,
        },
      },
      company: {
        name: companyName,
        catchPhrase,
        bs,
      },
    };

    try {
      console.log('Datos enviados al backend:', newUser);
      await axios.post('/api/users', newUser);
      setMessage('Usuario registrado exitosamente!');
      // Limpiar los campos del formulario
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setPhone('');
      setWebsite('');
      setStreet('');
      setSuite('');
      setCity('');
      setZipcode('');
      setLat('');
      setLng('');
      setCompanyName('');
      setCatchPhrase('');
      setBs('');
      setError('');
    } catch (err) {
      setError('Error al registrar el usuario.');
      console.error('Error al registrar el usuario:', err);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {message && <p className="text-green-500 text-center">{message}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />
      <input
        type="url"
        placeholder="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />

      {/* Address */}
      <input
        type="text"
        placeholder="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />
      <input
        type="text"
        placeholder="Suite"
        value={suite}
        onChange={(e) => setSuite(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />
      <input
        type="text"
        placeholder="Zipcode"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />

      {/* Geo */}
      <input
        type="text"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />
      <input
        type="text"
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />

      {/* Company */}
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />
      <input
        type="text"
        placeholder="Catchphrase"
        value={catchPhrase}
        onChange={(e) => setCatchPhrase(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />
      <input
        type="text"
        placeholder="BS"
        value={bs}
        onChange={(e) => setBs(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />

      <button type="submit" className="bg-purple-700 text-white p-2 mt-4">
        Sign up
      </button>
      <Link className="bg-purple-700 text-white p-3 mt-4 m-4" href="/login-form">
        Sign in
      </Link>
    </form>
  );
};

export default UserForm;
