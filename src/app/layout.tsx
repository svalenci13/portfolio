import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Sebastian Valencia",
  description: "Data analyst and aspiring software engineer from Toronto. Building things and making an impact.",
  keywords: ["Sebastian Valencia", "portfolio", "data analyst", "software engineer", "Toronto", "UWaterloo"],
  authors: [{ name: "Sebastian Valencia" }],
  creator: "Sebastian Valencia",
  metadataBase: new URL('https://sebo.fyi'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sebo.fyi',
    title: 'Sebastian Valencia',
    description: 'Data analyst and aspiring software engineer from Toronto. Building things and making an impact.',
    siteName: 'Sebastian Valencia',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Sebastian Valencia - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sebastian Valencia',
    description: 'Data analyst and aspiring software engineer from Toronto. Building things and making an impact.',
    images: ['/og-image.svg'],
    creator: '@sebo1738',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
