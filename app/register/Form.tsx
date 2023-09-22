'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Form() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const resp = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const res = await signIn('credentials', {
        redirect: false,
        callbackUrl: '/',
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        console.log(res.error);
      } else if (res?.url) {
        router.push(res.url);
      }
    } catch (error) {
      console.log('Something went wrong submitting new user');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form
      className="grid grid-cols-1 gap-4 text-white mt-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl text-center">Register</h2>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="p-2 rounded-md text-lg text-[#0a0a0a]"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="p-2 rounded-md text-lg text-[#0a0a0a]"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="p-2 rounded-md text-lg text-[#0a0a0a]"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#00D5FA] font-bold  p-4 tracking-wide rounded-md"
        >
          Register
        </button>
      </div>
    </form>
  );
}
