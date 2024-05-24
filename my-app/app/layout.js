import { Roboto } from "next/font/google";
import "./ui/globals.css";

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ['100', '300', '400', '500', '700', '900']
 });

export const metadata = {
  title: "Admin panel",
  description: "E-commercs Admin panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
