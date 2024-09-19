// app/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}
