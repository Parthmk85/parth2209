import { Fira_Code } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata = {
  title: "Parth Patel",
  description: "Portfolio of Parth Patel - Web Designer and Front-end Developer",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={firaCode.className}>
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
