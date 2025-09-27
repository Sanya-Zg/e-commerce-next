'use client';
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  isStock: number | undefined;
  images?: Array<{
    asset?: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: 'image';
    _key: string;
  }>;
}
const ImageView = ({ isStock, images = [] }: Props) => {
  const [active, setActive] = useState(images[0]);
  return (
    <div className="w-full md:w-1/2 flex flex-col lg:flex-row-reverse gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full aspect-square border border-black/10 rounded-md group overflow-hidden"
        >
          <Image
            src={urlFor(active).url()}
            alt="Image of product"
            width={700}
            height={700}
            priority
            className={`w-full h-full object-cover group-hover:scale-110 hoverEffect rounded-md ${isStock === 0 ? 'opacity-50' : ''} `}
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-5 lg:grid-cols-1 lg:grid-rows-5 ">
        {images.map((image) => (
          <button key={image._key} onClick={() => setActive(image)} className={`aspect-square border-2 border-transparent focus:border-black overflow-hidden rounded-md ${active._key === image._key ? "border-black": "opacity-50"}`}>
            <Image
              src={urlFor(image).url()}
              alt={`Thumbnail ${image._key}`}
              width={100}
              height={100}
              className=" object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
export default ImageView;
