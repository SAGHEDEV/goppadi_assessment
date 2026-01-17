import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import SideNav from "@/components/SideNav";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: "Goppadi Assessment App",
  description: "This app is built for Goppadi assessment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased font-sans min-h-screen`}
      >
        <TopNav />
        <main className="px-4 md:px-10 py-5 flex flex-col md:flex-row gap-6 md:gap-12 items-start">
          <div className="hidden md:block">
            <SideNav />
          </div>
          <div className="flex-1 w-full">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
