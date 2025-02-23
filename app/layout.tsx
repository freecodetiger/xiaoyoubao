import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import RouteGuard from '@/components/RouteGuard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '校友宝 - 校友服务平台',
  description: '连接校友，助力发展',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Providers>
          <RouteGuard>
            {children}
          </RouteGuard>
        </Providers>
      </body>
    </html>
  );
}
