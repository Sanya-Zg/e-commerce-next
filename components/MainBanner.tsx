import banner from '@/images/banner_main.jpg';
import Image from 'next/image';
import Link from 'next/link';
const MainBanner = () => {
  return (
    <section className="h-[717px] relative">
      <Image src={banner} alt="Main banner" fill className="object-cover" priority/>
      <div className="absolute top-5 md:top-36 right-14 left-14 md:left-auto max-w-[643px] h-auto md:h-[443px] bg-brown_light px-5 md:px-10 pt-5 md:pt-16 rounded-[10px] pb-5">
        <p className="tracking-[3px] font-semibold mb-1">New Arrival</p>
        <h1 className="font-bold text-4xl md:text-[52px] text-brown_dark md:leading-[64px]">
          Discover Our
          <br /> New Collection
        </h1>
        <p className="md:text-[18px] font-medium mt-4 leading-6.5 mb-4 md:mb-12 pr-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
        <Link href="#" className='text-white bg-brown_dark font-bold uppercase px-8 md:px-18 py-3 md:py-[25px] rounded-none inline-block  text-center'>
  Buy now
</Link>
      </div>
    </section>
  );
};
export default MainBanner;
