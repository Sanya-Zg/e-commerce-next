import {
  AllBlogCategories,
  Container,
  InformComponent,
  Breadcrumbs,
  AllLatestBlogs,
} from '@/components/index';
import {
  ALL_BLOGS_CATEGORIES_QUERYResult,
  ALL_BLOGS_QUERYResult,
  LATEST_BLOGS_QUERYResult,
} from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import {
  getAllBlogs,
  getAllBlogsCategories,
  getLatestBlogs,
} from '@/sanity/queries/sanity.index';

import Image from 'next/image';
import Link from 'next/link';

import { FaUser, FaCalendar, FaTag } from 'react-icons/fa';

const AllBlogs = async () => {
  const blogs: ALL_BLOGS_QUERYResult = await getAllBlogs();
  const categories: ALL_BLOGS_CATEGORIES_QUERYResult =
    await getAllBlogsCategories();
  const latestBlogs: LATEST_BLOGS_QUERYResult = await getLatestBlogs();

  return (
    <>
      <Breadcrumbs />
      <Container className="py-10 md:py-[106px]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-8 min-h-screen">
          <div className=" w-full flex-2 space-y-5">
            {blogs &&
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className=" shadow-[0_0_35px_0px] bg-brown_light p-4 rounded-2xl"
                >
                  <Image
                    src={
                      blog.mainImage
                        ? urlFor(blog.mainImage).url()
                        : '/placeholder.jpg'
                    }
                    alt="Blog image"
                    width={900}
                    height={500}
                    className="rounded-[10px]"
                  />
                  <div className="flex gap-4 md:gap-8 text-sm md:text-[16px] text-gray-light my-4">
                    <span className="flex items-center gap-2">
                      <FaUser className="" />
                      <span>
                        {typeof blog.author === 'string' && blog.author}
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <FaCalendar />
                      <span>
                        {new Date(blog._createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <FaTag />
                      <span>
                        {blog.categories && blog.categories.join(', ')}
                      </span>
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-medium leading-8 md:leading-11">
                    {blog.title}
                  </h2>
                  <p className="line-clamp-5 text-gray-light text-[15px] mt-3">
                    {blog.body?.map((block) => {
                      if (block._type === 'block' && block.children) {
                        return (
                          <span key={block._key}>
                            {block.children.map((child) => child.text).join('')}
                          </span>
                        );
                      }
                    })}
                  </p>
                  <div className="mt-7 mb-5 relative w-fit group cursor-pointer">
                    <Link
                      href={`/blog/${blog.slug?.current}`}
                      className="group-hover:text-black/60"
                    >
                      Read more
                    </Link>
                    <span className="absolute -bottom-3 left-2 border border-black w-[77px] group-hover:border-black/40"></span>
                  </div>
                </div>
              ))}
          </div>
          <div className=" w-full min-w-[290px] flex-1 space-y-10">
            <AllBlogCategories categories={categories} />
            <AllLatestBlogs latestBlog={latestBlogs} />
          </div>
        </div>
      </Container>
      <InformComponent />
    </>
  );
};
export default AllBlogs;
