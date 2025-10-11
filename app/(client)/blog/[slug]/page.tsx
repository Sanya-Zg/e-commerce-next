import { AllBlogCategories } from '@/components/index';
import Container from '@/components/Container';

import {
  ALL_BLOGS_CATEGORIES_QUERYResult,
  LATEST_BLOGS_QUERYResult,
  SINGLE_BLOG_QUERYResult,
} from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import {
  getAllBlogs,
  getAllBlogsCategories,
  getLatestBlogs,
  getSingleBlog,
} from '@/sanity/queries/sanity.index';

import Image from 'next/image';

import { notFound } from 'next/navigation';
import React from 'react';
import { FaCalendar, FaTag, FaUser } from 'react-icons/fa';
import AllLatestBlogs from '@/components/AllLatestBlogs';
import { PortableText } from '@portabletext/react';

const SingleBlogPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const blogData = await getSingleBlog(slug);
  const blog = blogData as SINGLE_BLOG_QUERYResult;

  if (!blog) return notFound();

  const categories: ALL_BLOGS_CATEGORIES_QUERYResult =
    await getAllBlogsCategories();
  const latestBlogs: LATEST_BLOGS_QUERYResult = await getLatestBlogs();

  return (
    <Container className="py-[106px]">
      <div className="flex flex-col md:flex-row gap-12 md:gap-8 min-h-screen">
        <div className=" w-full flex-2 space-y-5">
          {blog && (
            <div
              key={blog._id}
              className=" shadow-[0_0_35px_0px] bg-brown_light p-4 rounded-2xl"
            >
              <div className="flex gap-4 md:gap-8 text-sm md:text-[16px] text-gray-light my-4">
                <span className="flex items-center gap-2">
                  <FaUser className="" />
                  <span>{blog.author?.name}</span>
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
                    {blog.blogcategories?.map((cat) => cat.title).join(', ')}
                  </span>
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-medium leading-8 md:leading-11">
                {blog.title}
              </h2>

              <div className="mt-3 text-gray-light text-[15px]">
                <PortableText
                  value={blog.body ?? []}
                  components={{
                    types: {
                      image: ({ value }) => (
                        <Image
                          src={urlFor(value).url()}
                          alt={value.alt || 'Blog image'}
                          className="my-4 rounded-md"
                          width={900}
                          height={500}
                        />
                      ),
                    },
                    block: {
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold my-4">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-semibold my-3">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-medium my-2">{children}</h3>
                      ),
                      normal: ({ children }) => (
                        <p className="my-2">{children}</p>
                      ),
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-bold">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic">{children}</em>
                      ),
                      link: ({ children, value }) => (
                        <a
                          href={value.href}
                          className="text-blue-600 hover:underline"
                        >
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className=" w-full min-w-[290px] flex-1 space-y-10">
          <AllBlogCategories categories={categories} />
          <AllLatestBlogs latestBlog={latestBlogs} />
        </div>
      </div>
    </Container>
  );
};

export default SingleBlogPage;
