import "./globals.css";
import { Providers } from "./providers";
import { Inter } from 'next/font/google';
 
const inter = Inter({ subsets: ['latin'] });
 
export const metadata = {
  title: 'Studio Blog - Professional Blogging Platform',
  description: 'A modern, professional blogging platform built with Next.js',
};
 
export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
<html lang="en" className={inter.className}>
<body className="antialiased">
<Providers>
          {children}
</Providers>
</body>
</html>
  );
}