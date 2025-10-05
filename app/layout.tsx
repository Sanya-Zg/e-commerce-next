import { Poppins, Montserrat } from 'next/font/google';
import StoreProvider from './(client)/StoreProvider';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-montserrat',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body>
        <StoreProvider>{children}</StoreProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{duration: 3000, style: { background: '#000000', color: '#fff' } }}
        />
      </body>
    </html>
  );
};
export default RootLayout;
