import type { Metadata } from 'next';
import { Gudea } from 'next/font/google';

import './globals.css';
import { ThemeProvider } from '@/lib/theme-provider';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';

const work = Gudea({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.planizky.com'),
  title: {
    template: '%s | Planizky',
    default: 'Planizky',
  },
  description: 'Track your gym sessions with Planizky',
  applicationName: 'Planizky',
  authors: [{ name: 'Izky', url: 'https://izky.dev/' }],
  keywords: 'exercise tracker,gym tracker, tracker, movement tracker',
  openGraph: {
    title: 'Planizky',
    description: 'Track your gym sessions with Planizky',
    url: 'www.planizky.com',
    siteName: 'Planizky',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'opengraph-image.png',
        width: 800,
        height: 600,
        alt: 'opengraph-image.alt.txt',
      },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <script
        async
        defer
        src='https://cloud.umami.is/script.js'
        data-website-id='d1356c71-f537-40a8-bd73-bfb70a926bfe'
      ></script>
      <body className={work.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <main>{children}</main>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
