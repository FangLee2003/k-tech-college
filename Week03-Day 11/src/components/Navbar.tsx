import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #eee', marginBottom: '2rem', display: 'flex', gap: '1.5rem' }}>
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/products">Products</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}
