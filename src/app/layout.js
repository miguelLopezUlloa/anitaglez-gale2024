import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { Seo } from "@/components/Seo";
import { ThemeProvider } from "@/context/ThemeContext";
import Copyright from "@/components/Copyright";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anita Gonzalez Gallery",
  description: "Explore our unique collection of art.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {

  return (
      <ThemeProvider>
        <Head>
            <Seo />
        </Head>

        <html lang="en">
          <body
                      className={`${inter.className} bg-gray-50 dark:bg-gray-800 transition-colors 
                      duration-300 grid grid-rows-[auto_1fr_auto] min-h-screen`}
          >

            {/* Navbar */}
            <Navbar/>

            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <Copyright />
          </body>
        </html>
      </ThemeProvider>
  );
}
