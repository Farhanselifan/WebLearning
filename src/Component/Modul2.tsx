import React, { useState } from 'react';

interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Modul2: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Email dan Password tidak boleh kosong!');
      return;
    }

    setError(null);
    alert(`Login Berhasil!\nEmail: ${form.email}\nRemember me: ${form.rememberMe}`);
  };

  return (
    <form onSubmit={handleSubmit} className='w-[500px] bg-white rounded-xl 
    shadow-lg border border-gray-300 p-14'>
      <h1 className='flex justify-center text-2xl font-bold'> Sign Up</h1>
      <div className='items-start'>
        <label className='font-semibold'>Email:</label><br />
        <input className='border border-b-blue-950 rounded w-full h-9'
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className='items-start'>
        <label className ='font-semibold'>Password:</label><br />
        <input className='border border-b-blue-950 rounded w-full h-9'
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div className= 'flex justify-center'>
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
          />
          Remember Me
        </label>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='flex justify-center '>
        <button className='bg-blue-900 p-2 rounded-2xl w-50 text-white font-mono ' type="submit">Login</button>
      </div>
      
    </form>
  );
};

export default Modul2;
