import { LATEST_BLOGS_QUERYResult } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

const AllLatestBlogs = ({
  latestBlog,
}: {
  latestBlog: LATEST_BLOGS_QUERYResult;
}) => {
  return (
    <div className="bg-amber-100 rounded-2xl px-4 pb-15 pt-10 shadow-[0_0_6px]">
      <div className="max-w-[250px] mx-auto ">
        <h2 className="capitalize text-2xl font-medium mb-[26px]">
          Resent posts
        </h2>
        <div className="space-y-10">
          {latestBlog.map((blog) => (
            <div key={blog._id} className="flex gap-3">
              <Link
                href={`/blog/${blog.slug?.current}`}
                className="block w-20 h-20 shrink-0"
              >
                <Image
                  src={
                    blog.mainImage
                      ? urlFor(blog.mainImage).url()
                      : '/placeholder.jpg'
                  }
                  alt="Blog image"
                  width={80}
                  height={80}
                  className="rounded-[10px] object-cover h-20 w-20"
                />
              </Link>

              <div className="space-y-[5px]">
                <p className="line-clamp-2 text-sm mt-2">{blog.title}</p>
                <p className="text-gray-light text-xs">
                  {new Date(blog._createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AllLatestBlogs;
