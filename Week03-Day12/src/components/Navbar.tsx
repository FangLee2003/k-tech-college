import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ backgroundColor: 'white', padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', gap: '1.5rem', color: 'black' }}>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
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
