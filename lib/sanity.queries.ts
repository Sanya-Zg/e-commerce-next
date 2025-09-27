import { defineQuery } from 'next-sanity';

// the first way (this -> component)
export const getAllCategories = `*[_type == "category"]{ _id, title, image }`;

// export const getAllProducts = `*[_type == "product"] [0...8]`

export const getAllInspirations = `*[_type == "inspiration"] | order( title asc )`;

// the second way (this -> component)
export const selectProducts = (categoryOne?: string) => {
  if (categoryOne && categoryOne !== 'all') {
    return {
      query: `*[_type == "product" && references(*[_type == "category" && title == $categoryOne]._id)]`,
      params: { categoryOne },
    };
  }
  return {
    query: `*[_type == "product"]`,
    params: {},
  };
};

// the third way (this -> sanity.index.ts -> component)
export const get_product_by_slug = `*[_type == "product" && slug.current == $slug]{
  ...,
  "brandName": brand->title,
  "categoryName": categories->title
  
}[0]`;

export const BRAND_QUERY =
  defineQuery(`*[_type == "product" && slug.current == $slug]{
  "brandName": brand->title
  }`);
