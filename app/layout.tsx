import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import SideNav from "@/components/SideNav";

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
        <main className="px-10 py-5 flex gap-12 items-start">
          <SideNav />
          <div className="flex-1">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
