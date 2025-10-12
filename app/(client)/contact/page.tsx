import { ContactForm, Container, InformComponent, Breadcrumbs } from '@/components/index';
import { IoMdPin } from 'react-icons/io';
import { FaPhoneAlt } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";

const ContactPage = () => {
  return (
    <div>
      <Breadcrumbs />
      <Container className="pt-10 md:pt-[98px]">
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-semibold text-2xl md:text-4xl">
            Get In Touch With Us
          </h2>
          <p className="text-gray-light max-w-[650px] text-center">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>

        <div className="flex flex-col md:flex-row-reverse justify-center gap-5 md:gap-10 mb-10">
          <div className="w-full max-w-[635px]">
            <ContactForm />
          </div>

          <div className="w-full max-w-[393px] space-y-11 px-16 pt-5 md:pt-14 mt-5 md:mt-18">
            <div className="flex gap-7.5 ">
              <div>
                <IoMdPin size={27} />
              </div>
              <div>
                <h3 className="font-medium text-2xl">Address</h3>
                <p>236 5th SE Avenue, New York NY10000, United States</p>
              </div>
            </div>
            <div className="flex gap-9">
              <div className='pt-2'>
                <FaPhoneAlt size={20} />
              </div>
              <div>
                <h3 className="font-medium text-2xl">Phone</h3>
                <p>Mobile: +(1) 546-6789</p>
                <p>Hotline: +(1) 456-6789</p>
              </div>
            </div>
            <div className="flex gap-7.5">
              <div>
                <MdAccessTimeFilled size={27} />
              </div>
              <div>
                <h3 className="font-medium text-2xl">Working Time</h3>
                <p>Monday-Friday: 9:00 - 22:00</p>
                <p>Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <InformComponent />
    </div>
  );
};
export default ContactPage;
