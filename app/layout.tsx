import { Poppins, Montserrat } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ["700"],
  variable: "--font-montserrat"
})

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
      <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
        <body>{children}</body>
      </html>
  )
}
export default RootLayout;

