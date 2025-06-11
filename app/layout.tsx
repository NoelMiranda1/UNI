import './globals.css';
import type { Metadata } from 'next';
import { Inter as InterFont } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { SocialBar } from '@/components/social-bar';
import { Footer } from '@/components/footer';
import { Chatbot } from '@/components/chatbot';
import { ChannelsSection } from '@/components/channels-section';

const inter = InterFont({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Universidad Nacional de Ingeniería',
  description: 'Portal web de la Universidad Nacional de Ingeniería',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <SocialBar />
        <main>{children}</main>
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}