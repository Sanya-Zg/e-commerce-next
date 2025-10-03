import { Blogcategory } from '@/sanity.types';


const AllBlogCategories = ({ categories }: { categories: Blogcategory[] }) => {
  return (
    <div  className='bg-amber-100 rounded-2xl px-4 pb-15 pt-10 shadow-[0_0_6px]'>
      <div className='max-w-[250px] mx-auto space-y-8'>
        <h2 className='text-2xl font-medium'>Categories</h2>
        <div className='flex flex-col gap-10'>
          {
            categories.map(category => (
              <div key={category._id} className='text-gray-light flex justify-between'>
                <p>{category.title}</p>
                <span>{category.categoryAmount}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
export default AllBlogCategories;
