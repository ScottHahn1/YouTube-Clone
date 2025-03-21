import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryClientContextProvider from "./query-client-provider";
import NavbarSidebarWrapper from "./NavbarSidebarWrapper";
import { ThemeProvider } from "./contexts/themeContext";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "YouTube",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <QueryClientContextProvider>
            <NavbarSidebarWrapper />
            {children}
          </QueryClientContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}