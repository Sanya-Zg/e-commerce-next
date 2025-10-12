import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Logo } from '@/components/index';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from './ui';

const NoAccess = ({
  details = "Log in to view your cart items and checkout. Don't miss out on your favorite products!",
}: {
  details?: string;
}) => {
  return (
    <div className="flex justify-center items-center py-12 md:py-32 bg-gray-100 p-4 ">
      <Card className='w-full max-w-md'>
        <CardHeader className='flex items-center flex-col'>
          <Logo />
          <CardTitle className='text-2xl font-bold text-center'>Welcome back!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center font-medium text-black/80">{details}</p>
          <SignInButton mode="modal">
            <Button className="w-full" size="lg">
              Sign in
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Don&rsquo;t have an account?
          </div>
          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full" size="lg">
              Create an account
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};
export default NoAccess;
