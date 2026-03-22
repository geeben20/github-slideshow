import Link from 'next/link';
import { Sprout } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/categories/crop-farming', label: 'Categories' },
  { href: '/bookmarks', label: 'Bookmarks' },
  { href: '/admin', label: 'Admin' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 font-semibold text-brand">
          <span className="rounded-2xl bg-brand/10 p-2"><Sprout className="h-6 w-6" /></span>
          AgriPulse Hub
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 hover:text-brand dark:text-slate-300">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-full border border-slate-300 px-4 py-2 text-sm dark:border-slate-700">Login</Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
