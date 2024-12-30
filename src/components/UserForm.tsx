'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Form, Input, Button } from '@nextui-org/react';

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
    <div className="min-h-screen flex justify-center items-center">
      <Form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4 p-6 shadow-lg rounded-lg">
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <Input
          isRequired
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          placeholder="Name"
          className="mb-4"
        />
        <Input
          isRequired
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          placeholder="Username"
          className="mb-4"
        />
        <Input
          isRequired
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          type="email"
          placeholder="Email"
          className="mb-4"
        />
        <Input
          isRequired
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          placeholder="Password"
          className="mb-4"
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          label="Phone"
          placeholder="Phone"
          className="mb-4"
        />
        <Input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          label="Website"
          type="url"
          placeholder="Website"
          className="mb-4"
        />

        <Input
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          label="Street"
          placeholder="Street"
          className="mb-4"
        />
        <Input
          value={suite}
          onChange={(e) => setSuite(e.target.value)}
          label="Suite"
          placeholder="Suite"
          className="mb-4"
        />
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          label="City"
          placeholder="City"
          className="mb-4"
        />
        <Input
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          label="Zipcode"
          placeholder="Zipcode"
          className="mb-4"
        />

        <Input
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          label="Latitude"
          placeholder="Latitude"
          className="mb-4"
        />
        <Input
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          label="Longitude"
          placeholder="Longitude"
          className="mb-4"
        />

        <Input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          label="Company Name"
          placeholder="Company Name"
          className="mb-4"
        />
        <Input
          value={catchPhrase}
          onChange={(e) => setCatchPhrase(e.target.value)}
          label="Catchphrase"
          placeholder="Catchphrase"
          className="mb-4"
        />
        <Input
          value={bs}
          onChange={(e) => setBs(e.target.value)}
          label="BS"
          placeholder="BS"
          className="mb-4"
        />

        <div className="flex gap-2">
          <Button color="primary" type="submit">
            Sign Up
          </Button>
          <Link href="/login-form">
            <Button variant="flat">Sign In</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default UserForm;

