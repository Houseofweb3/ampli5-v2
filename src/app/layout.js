import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Toast from '@/components/ui/toster';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
});

export const metadata = {
  title: 'Ampli5',
  description: 'Ampli5',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={`${bricolage.variable}  font-sans antialiased bg-white h-full w-full`}
      >
        <Navbar />
        <div className="h-[65px] lg:h-80px w-full bg-black"></div>
        {children}
        <Footer />
        <Toast />
      </body>
    </html>
  );
}
