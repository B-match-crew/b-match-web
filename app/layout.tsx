import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { AppProvider } from "@/src/app/providers";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "B-match | 배드민턴 매칭",
  description: "배드민턴 매칭 플랫폼 - 가까운 곳에서 함께 칠 사람을 찾아보세요",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        <AppProvider>
          <div className="mx-auto min-h-dvh max-w-[430px] bg-background shadow-sm md:max-w-[768px]">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
