'use client';
import { getAllCategories } from '@/lib/sanity.queries';
import { Category } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Container from './Container';

const AllCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.fetch(getAllCategories);
        setCategories(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Container>
      <div className="text-[#333333]">
        <div className="text-center">
          <h2 className="font-bold text-[32px] capitalize">Browse the range</h2>
          <p className="mt-1 text-[#B0B0B0]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex justify-center flex-row-reverse gap-5 mt-16">
          {categories.map((category) => (
            <div className="flex flex-col" key={category._id}>
              <Image
                src={
                  category.image
                    ? urlFor(category.image).url()
                    : '/placeholder.jpg'
                }
                alt="Category"
                loading="lazy"
                width={381}
                height={480}
              />
              <p className='text-center text-2xl font-semibold mt-8'>{category.title}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
export default AllCategories;
