import { TrolleyIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'discount',
      title: 'Discount',
      type: 'number',
      description: 'Enter discount percentage (e.g., 10 for 10%)',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      description: 'Enter the number of items in stock',
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: { type: 'brand' },
    }),
    defineField({
      name: 'colors',
      title: 'Available Colors',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              'red',
              'blue',
              'brown',
              'green',
              'black',
              'white',
              'yellow',
              'purple',
              'orange',
              'gray',
              'pink',
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: ['L', 'XL', 'XS'],
          },
        },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Product Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Sale', value: 'sale' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'variant',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Living Room', value: 'living_room' },
          { title: 'Kitchen', value: 'kitchen' },
          { title: 'Bedroom', value: 'bedroom' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Mark if the product is featured',
      initialValue: false,
      options: { layout: 'checkbox' },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images',
      subtitle: 'price',
    },
    prepare(selection) {
      const { title, media, subtitle } = selection;
      const image = media && media[0];
      return {
        title: title,
        subtitle: subtitle ? `$${subtitle}` : 'No price set',
        media: image,
      };
    },
  },
});
