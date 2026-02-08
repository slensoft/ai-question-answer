'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GlobalNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '首页', icon: '🏠' },
    { href: '/ai-guide', label: 'AI 引导', icon: '🤖', highlight: true },
    { href: '/methodology/scenarios', label: '按场景选择', icon: '🎯' },
    { href: '/methodology/decision-tree', label: '智能决策树', icon: '🌳' },
    { href: '/methodology/all', label: '所有方法论', icon: '📚' },
  ];

  return (
    <nav className="global-nav">
      <div className="nav-container">
        <div className="nav-left">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${pathname === item.href ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.highlight && <span className="badge">NEW</span>}
            </Link>
          ))}
        </div>
        <div className="nav-right">
          <Link
            href="/user"
            className={`nav-item user-center ${pathname === '/user' ? 'active' : ''}`}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-label">用户中心</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
