import { GrBlog } from "react-icons/gr";
import { defineArrayMember, defineField, defineType } from 'sanity';

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: GrBlog,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'blogcategories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'blogcategory' },
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'isLatest',
      title: 'Latest Blog',
      type: 'boolean',
      description: 'Mark if this blog is the latest blog',
      initialValue: false,
      options: { layout: 'checkbox' },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      isLatest: 'isLatest',
    },
    prepare(selection) {
      const { author, isLatest } = selection;
      return {
        ...selection,
        subtitle: author && `${isLatest ? 'Latest | ' : ''}by ${author}`,
      };
    },
  },
});
