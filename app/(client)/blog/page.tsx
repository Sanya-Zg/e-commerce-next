import { Container } from '@/components/index';
import { Blog } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { getAllBlogs } from '@/sanity/queries/sanity.index';
import Image from 'next/image';
import { FaUser } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

const AllBlogs = async () => {
  const blogs: Blog[] = await getAllBlogs();

  return (
    <Container className="mt-[106px]">
      <div className="flex gap-8 min-h-screen">
        <div className="shadow-[0_0_35px_0px] bg-brown_light p-4 w-full flex-2 rounded-2xl">
          {blogs &&
            blogs.map((blog) => (
              <div key={blog._id}>
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

                <div className='flex gap-4'>
                  <span>
                    <FaUser />
                    <span>Admin</span>
                  </span>
                  <span>
                    <FaCalendar />
                    <span>{new Date(blog._createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</span>
                  </span>
                  <span>
                    <FaUser />
                    <span>{blog.blogcategories ? blog.blogcategories: ''}</span>
                  </span>
                </div>
              </div>
            ))}
        </div>
        <div className=" w-full flex-1"></div>
      </div>
    </Container>
  );
};
export default AllBlogs;
