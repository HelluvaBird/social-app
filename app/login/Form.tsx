'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Form() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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
      const res = await signIn('credentials', {
        redirect: false,
        callbackUrl: '/',
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        console.log(res.error, res);
      } else if (res?.url) {
        router.push(res.url);
      }
    } catch (error) {
      console.log('Something went wrong in the login form');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form
      className="grid grid-cols-1 gap-4 text-white mt-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl text-center">Login</h2>
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
          Login
        </button>
      </div>
    </form>
  );
}
