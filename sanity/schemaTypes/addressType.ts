import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const addressType = defineType({
  name: 'address',
  title: 'Address',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Address Name',
      type: 'string',
      description: 'A name to identify the address (e.g., Home, Work)',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'email',
      title: 'User Email',
      type: 'email',
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
      description: 'The street address including apartment/unit number',
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      description: 'Two letter state code',
      validation: (Rule) => Rule.required().length(2).uppercase(),
    }),
    defineField({
      name: 'zip',
      title: 'ZIP Code',
      type: 'string',
      description: 'Format: 12345 or 12345-6789',
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d{5}(-\d{4})?$/, {
            name: 'ZIP code',
            invert: false,
          })
          .custom((zip: string | undefined) => {
            if (!zip) return 'ZIP code is required';
            if (!zip.match(/^\d{5}(-\d{4})?$/)) {
              return 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
            }
            return true;
          }),
    }),
    defineField({
      name: 'default',
      title: 'Default Address',
      type: 'boolean',
      description: 'Is this your default address?',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      readOnly: true,
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm:ss',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address',
      city: 'city',
      state: 'state',
      isDefault: 'default',
    },
    prepare({
      title,
      subtitle,
      city,
      state,
      isDefault,
    }) {
      return {
        title: `${title} ${isDefault ? '(Default)' : ''}`,
        subtitle: `${subtitle}, ${city}, ${state}`,
      };
    },
  },
});
