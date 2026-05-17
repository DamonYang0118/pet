import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "泡泡爪 Pet Spa | 高端宠物洗护",
  description: "泡泡爪 Pet Spa 提供可视化宠物洗护、精修造型、皮毛护理与幼宠适应服务。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
