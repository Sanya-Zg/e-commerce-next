import { TbCategoryFilled } from "react-icons/tb";
import { defineField, defineType } from "sanity";

export const blogCategoryType = defineType({
  name: 'blogcategory',
  title: 'Blog Category',
  type: 'document',
  icon: TbCategoryFilled,
  fields: [
    defineField({
      name: 'title',
      type: 'string'
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    }),
    defineField({
      name: 'description',
      type: 'text'
    })
  ]
})