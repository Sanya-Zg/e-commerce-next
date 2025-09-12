import { SignInButton } from '@clerk/nextjs';
import { Button } from './ui';

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <Button
        variant="outline"
        className="border border-primary 
          text-primary 
          px-4 py-2 rounded-md 
          transition-colors
          hover:bg-primary hover:text-white"
      >
        Sign In
      </Button>
    </SignInButton>
  );
};
export default SignIn;
