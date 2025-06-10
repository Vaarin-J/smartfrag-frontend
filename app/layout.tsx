import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "SmartFrag",
  description: "Discover your perfect fragrance with AI-driven search and recommendations.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}