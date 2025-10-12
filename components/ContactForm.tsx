'use client';
import { Button, Input } from '@/components/ui';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { useState } from 'react';
const ContactForm = () => {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFields({ name: '', email: '', subject: '', message: '' });
    toast.success('Your message was sending!');
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-10 md:mt-[120px] pb-5 md:pb-16 space-y-6 md:space-y-9"
      >
        <div className="space-y-2 sm:space-y-3 md:space-y-[22px]">
          <Label>Your name</Label>
          <Input
            className="w-full sm:h-14 md:h-16 px-8 placeholder:text-gray-300"
            placeholder="Name..."
            value={fields.name}
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
          />
        </div>

        <div className="space-y-2 sm:space-y-3 md:space-y-[22px]">
          <Label>Email address</Label>
          <Input
            className="w-full sm:h-14 md:h-16 px-8 placeholder:text-gray-300"
            placeholder="example@gmail.com"
            value={fields.email}
            onChange={(e) => setFields({ ...fields, email: e.target.value })}
          />
        </div>

        <div className="space-y-2 sm:space-y-3 md:space-y-[22px]">
          <Label>Subject</Label>
          <Input
            className="w-full sm:h-14 md:h-16 px-8 placeholder:text-gray-300"
            placeholder="This is an optional"
            value={fields.subject}
            onChange={(e) => setFields({ ...fields, subject: e.target.value })}
          />
        </div>

        <div className="space-y-2 sm:space-y-3 md:space-y-[22px]">
          <Label>Message</Label>
          <Textarea
            placeholder="Hi! i'd like to ask about"
            className="resize-none h-[120px] px-8 placeholder:text-gray-300"
            value={fields.message}
            onChange={(e) => setFields({ ...fields, message: e.target.value })}
          />
        </div>

        <Button>Submit</Button>
      </form>
    </>
  );
};
export default ContactForm;
