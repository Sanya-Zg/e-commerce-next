'use client'
import { headerMenu } from '@/app/constans/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="font-semibold hidden md:flex justify-between w-1/4 gap-4 w-max-5xl">
      {headerMenu.map((item) => (
        <Link
          href={item.link}
          key={item.title}
          className={`hover:text-brown_dark relative hoverEffect group ${
            pathname === item.link && 'text-brown_dark'
          }`}
        >
          {item.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-brown_dark group-hover:w-1/2 hoverEffect ${
              pathname === item.link && 'w-1/2'
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-brown_dark group-hover:w-1/2 hoverEffect ${
              pathname === item.link && 'w-1/2'
            }`}
          />
        </Link>
      ))}
    </nav>
  );
};
export default Navbar;
