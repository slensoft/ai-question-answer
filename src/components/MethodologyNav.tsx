'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MethodologyNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/methodology', label: '首页', icon: '🏠' },
    { href: '/methodology/scenarios', label: '按场景选择', icon: '🎯' },
    { href: '/methodology/decision-tree', label: '智能决策树', icon: '🌳' },
    { href: '/methodology/all', label: '所有方法论', icon: '📚' },
  ];

  return (
    <nav className="methodology-nav">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-item ${pathname === item.href ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
