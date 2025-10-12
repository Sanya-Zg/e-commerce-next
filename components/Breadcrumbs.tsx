'use client';
import { usePathname } from 'next/navigation';
import crumbsBG from '@/images/CrumbsBg.jpg';
import Image from 'next/image';
import logo from '@/public/Logo.svg';

const Breadcrumbs = () => {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const path = segments[0] || '';

  return (
    <section className='relative'>
      <Image
        src={crumbsBG}
        width={1440}
        height={316}
        alt="Bread crumbs background"
        className='blur-[2.5px] opacity-50'
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <Image src={logo} alt="Logo" className={`w-6 sm:w-10 md:w-12`}/>
        <p className='text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium capitalize md:leading-14 lg:leading-18'>{path}</p>
        <p className='text-sm font-medium flex items-center gap-3'>Home <span>{'>'}</span> <span className='font-light capitalize'>{path}</span></p>
      </div>
    </section>
  );
};
export default Breadcrumbs;
