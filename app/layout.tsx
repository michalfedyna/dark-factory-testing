import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ember & Oak | Coffee & Good Company',
  description: 'A fictional neighborhood coffee shop. Explore our sample menu, opening hours, and imaginary little corner of Bramblewick.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><head><link rel="stylesheet" href="/fonts.css" /></head><body>{children}</body></html>;
}
