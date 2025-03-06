<<<<<<< HEAD
import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '校友宝 - 校友服务平台',
  description: '为校友提供全方位的职业发展支持和企业服务',
}
=======
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
>>>>>>> upstream

export default function RootLayout({
  children,
}: {
<<<<<<< HEAD
  children: React.ReactNode
=======
  children: React.ReactNode;
>>>>>>> upstream
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Providers>
<<<<<<< HEAD
          {children}
        </Providers>
      </body>
    </html>
  )
=======
          <RouteGuard>
            {children}
          </RouteGuard>
        </Providers>
      </body>
    </html>
  );
>>>>>>> upstream
}
