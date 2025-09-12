'use client';
import { AlignLeft } from 'lucide-react';
import { SideBar } from '@/components/index';
import { useState } from 'react';

const MobileMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <div className="md:hidden flex items-center">
      <button
        className="text-yellow-900"
        onClick={() => setIsOpenMenu(true)}
        aria-label="Open menu"
      >
        <AlignLeft size={28} />
      </button>
      <SideBar isOpen={isOpenMenu} isClose={() => setIsOpenMenu(false)} />
    </div>
  );
};
export default MobileMenu;
