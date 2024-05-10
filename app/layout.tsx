import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prodigy Kindergarten",
  description: "Official Website of Prodigy Kindergarten. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className," relative overflow-x-hidden bg-[#FFE6F7] dark:bg-[#2C3333]")}>
        <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
          <NavBar/>
          {children}
          <Footer />

        </ThemeProvider>  
      </body>
    </html>
  );
}
