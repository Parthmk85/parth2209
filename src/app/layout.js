import { Fira_Code } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata = {
  title: "Elias Portfolio",
  description: "Web Designer and Front-end Developer Portfolio",
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
