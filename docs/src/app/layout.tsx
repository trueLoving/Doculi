import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocuSynapse - 智能文档处理平台",
  description: "DocuSynapse是一个强大的智能文档处理平台，提供文档转换、分析和处理功能，让您的文档工作更加高效。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
