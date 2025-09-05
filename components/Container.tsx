import { cn } from '@/lib/utils';

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('max-w-screen mx-auto px-15', className)}>{children}</div>
  );
};
export default Container;
