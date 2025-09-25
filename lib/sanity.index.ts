

export const selectProducts = (categoryOne?: string) => {
  if (categoryOne && categoryOne !== "all") {
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
