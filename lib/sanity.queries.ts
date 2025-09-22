export const getAllCategories = `*[_type == "category"]{ _id, title, image }`;

export const getAllProducts = `*[_type == "product"] [0...8]`

export const getAllInspirations = `*[_type == "inspiration"] | order( title asc )`;

