import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Lexend } from 'next/font/google';
import '@/styles/globals.css';
import NextThemeProvider from '@/components/providers/theme-provider';
import { Toaster } from 'sonner';
import Header from '@/components/headers';
import { generateSiteMetadata } from '@/lib';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const lexend = Lexend({
    variable: '--font-lexend',
    subsets: ['latin'],
    display: 'swap',
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export async function generateMetadata(): Promise<Metadata> {
    return await generateSiteMetadata();
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr" suppressHydrationWarning={true} className="scroll-smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} min-h-screen p-4 antialiased lg:p-10`}
            >
                <NextThemeProvider>
                    <Header />
                    <main>{children}</main>
                    <Toaster />
                </NextThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
