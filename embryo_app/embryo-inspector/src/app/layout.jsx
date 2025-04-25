import { Poppins } from 'next/font/google'
import Navbar from "../../components/Navbar/Navbar";
import "./globals.css";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '800', '900']
})



export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <head>
          <title>Embryo-Inspector</title>
          <link rel="icon" href="/logo.ico" />
        </head>
        <body className={`${poppins.className}`}>
          <Navbar/>
          {children}
        </body>
      </html>
  );
}

