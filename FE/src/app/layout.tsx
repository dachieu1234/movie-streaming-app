import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "ShinTV | Xem phim online",
  description: "Demo giao diện xem phim giống ShinTV."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          <Header />
          <div className="container-page py-5">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
