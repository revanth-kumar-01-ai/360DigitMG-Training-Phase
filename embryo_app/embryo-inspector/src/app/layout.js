"use client"; // 👈 Important line on top

import { Poppins } from "next/font/google";
import { Providers } from "../../redux/Provider";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import Navbar from "../../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "800", "900"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = ["/", "/upload", "/history", "/authentication"].includes(pathname);
  
  return (
    <Providers>
      <html lang="en">
        <head>
          <title>Embryo Inspector</title>
          <link rel="icon" href="/TitleLogo.svg" />
        </head>
        <body className={poppins.className}>
          <ToastContainer />
          {showNavbar && <Navbar />}
          {children}
        </body>
      </html>
    </Providers>
  );
}
