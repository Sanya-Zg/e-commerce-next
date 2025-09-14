'use client';
import { LuYoutube, LuGithub, LuLinkedin, LuFacebook } from 'react-icons/lu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const socialLinks = [
  {
    title: 'Youtube',
    href: 'https://www.youtube.com/',
    icon: <LuYoutube className="w-5 h-5" />,
  },
  {
    title: 'Github',
    href: 'https://www.github.com/',
    icon: <LuGithub className="w-5 h-5" />,
  },
  {
    title: 'Linkedin',
    href: 'https://www.linkedin.com/',
    icon: <LuLinkedin className="w-5 h-5" />,
  },
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: <LuFacebook className="w-5 h-5" />,
  },
];

const SocialLinks = ({ className, hoverEff }: { className?: string, hoverEff?: string }) => {
  return (
    <div className="mt-10">
      <TooltipProvider>
        <div className={cn("flex", className)}>
          {socialLinks.map((item) => (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn("border-2 rounded-full p-2 hover:border-brown_dark hover:text-white hoverEffect", hoverEff)}
                  target="_blank"
                  rel="noopener noreferrer" 
                >
                  {item.icon}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};
export default SocialLinks;
