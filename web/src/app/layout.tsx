import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hack Plus - Tech Insights & More",
  description: "開発者が次のレベルに進むための技術メディア。ハッカソン的な「作って学ぶ」精神で、AI技術とエンジニアリングに関する実践的な情報を発信。",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Hack Plus - Tech Insights & More",
    description: "開発者が次のレベルに進むための技術メディア。ハッカソン的な「作って学ぶ」精神で、AI技術とエンジニアリングに関する実践的な情報を発信。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hack Plus - Tech Insights & More",
    description: "開発者が次のレベルに進むための技術メディア。ハッカソン的な「作って学ぶ」精神で、AI技術とエンジニアリングに関する実践的な情報を発信。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
