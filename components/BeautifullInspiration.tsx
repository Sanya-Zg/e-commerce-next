'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Inspiration } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { getAllInspirations } from '@/lib/sanity.queries';
import { urlFor } from '@/sanity/lib/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const BeautifullInspiration = () => {
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [currSlide, setCurrSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.fetch(getAllInspirations);
        setInspirations(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // скільки видно картинок залежно від ширини екрану
  const visibleSlides =
    typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2;

  const handleLeft = () => {
    setCurrSlide((prev) =>
      prev === 0 ? inspirations.length - visibleSlides : prev - 1
    );
  };

  const handleRight = () => {
    setCurrSlide((prev) =>
      prev >= inspirations.length - visibleSlides ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-[#FCF8F3] py-11 px-6 md:px-[100px]">
      <div className="flex gap-10 flex-col md:flex-row items-center md:items-start">
        <div className="max-w-[422px] text-center md:text-left">
          <h2 className="font-bold text-3xl md:text-[40px] text-gray_1 leading-[120%]">
            50+ Beautiful rooms <br /> inspiration
          </h2>
          <p className="text-gray_2 font-medium mt-2">
            Our designer already made a lot of beautiful prototypes of rooms
            that inspire you
          </p>
          <Link
            href="#"
            className="text-white py-3 px-9 mt-6 bg-brown_dark inline-block"
          >
            Explore more
          </Link>
        </div>

        <div className="h-[582px] w-full max-w-[830px] relative overflow-hidden">
          <button onClick={handleLeft} aria-label="Previous image">
            <ChevronLeft
              size={40}
              className="z-50 absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 shadow-xl text-brown_dark/70 rounded-full hover:text-brown_dark hover:bg-white/90 active:text-brown_dark/50 active:scale-95 hoverEffect"
            />
          </button>

          {inspirations.length > 0 && (
            <div
              className="flex gap-6 h-full transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currSlide * (404 + 24)}px)`,
              }}
            >
              {inspirations.map((inspiration, index) => (
                <div
                  key={inspiration._id}
                  className="w-[404px] h-full relative flex-shrink-0 flex flex-col items-center"
                >
                  <Image
                    src={
                      inspiration.image
                        ? urlFor(inspiration.image).url()
                        : '/placeholder.jpg'
                    }
                    alt={`Image ${index + 1}`}
                    width={404}
                    height={582}
                    className={`object-cover w-[404px] transition-all duration-500 ${
                      currSlide === index ? 'h-full' : 'h-[372px]'
                    }`}
                  />
                  {currSlide !== index && (
                    <div className="absolute bottom-40 left-0 flex gap-5 items-center">
                      {inspirations.map((_, i) => (
                        <button
                          key={i}
                          className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                            currSlide === i
                              ? 'w-6 h-6 border-2 border-brown_dark'
                              : 'w-3 h-3 bg-gray_4'
                          }`}
                          onClick={() => setCurrSlide(i)}
                        >
                          {currSlide === i && (
                            <span className="w-3 h-3 rounded-full bg-brown_dark"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <button onClick={handleRight} aria-label="Next image">
            <ChevronRight
              size={40}
              className="z-50 absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 shadow-xl text-brown_dark/70 rounded-full hover:text-brown_dark hover:bg-white/90 active:text-brown_dark/50 active:scale-95 hoverEffect"
            />
          </button>

          {/* <div className="absolute bottom-10 left-2/3 -translate-x-1/2 flex gap-3 items-center">
            {inspirations.map((_, index) => (
              <button
                key={index}
                className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                  currSlide === index
                    ? 'w-6 h-6 border-2 border-brown_dark'
                    : 'w-3 h-3 bg-gray_4'
                }`}
                onClick={() => setCurrSlide(index)}
              >
                {currSlide === index && (
                  <span className="w-3 h-3 rounded-full bg-brown_dark"></span>
                )}
              </button>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default BeautifullInspiration;
