import Link from 'next/link';
import Form from './Form';

export default function Register() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="bg-[#1a1a1a] p-4 w-[95%] lg:w-[50vw] lg:max-w-[800px] h-[95%] rounded-md">
        <h1 className="text-[#00D5FA] text-4xl font-bold text-center">
          Welcome back to Social App
        </h1>
        <Form />
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-[#00D5FA] underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
