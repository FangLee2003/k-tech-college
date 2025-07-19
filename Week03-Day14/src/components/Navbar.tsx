'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <nav style={{ backgroundColor: 'white', padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', gap: '1.5rem', color: 'black' }}>
      <Link href="/">Home</Link>
      {isAuthenticated ?
        <button onClick={logout} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>Logout</button>
        :
        <Link href="/login">Login</Link>
      }
      {/* Task routes group */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/task-csr">Task CSR</Link>
        <Link href="/task-ssr">Task SSR</Link>
        <Link href="/task-ssg">Task SSG</Link>
        <Link href="/task-isr">Task ISR</Link>
      </div>
      {/* Other links
      <Link href="/blog">Blog</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/products">Products</Link> */}
    </nav>
  );
}

