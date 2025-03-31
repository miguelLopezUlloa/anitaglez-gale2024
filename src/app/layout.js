import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { Seo } from "@/components/Seo";
import { ThemeProvider } from "@/context/ThemeContext";
import Copyright from "@/components/Copyright";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <main className="flex-grow w-full overflow-x-hidden">{children}
              <ToastContainer />
            </main>

            {/* Footer */}
            <footer className="w-full bg-gray-100 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
              <Copyright />
            </footer>
          </body>
        </html>
      </ThemeProvider>
  );
}
