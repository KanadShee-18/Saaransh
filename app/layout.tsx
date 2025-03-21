import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header-section";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ORIGIN_URL } from "@/utils/helpers";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Saaransh – AI-Powered PDF Summarizer",
  description:
    "Saaransh is an application that efficiently summarizes PDFs using AI. Users can upload PDFs, generate concise summaries, and extract key insights quickly. The app streamlines information processing, making research and document analysis effortless.",
  keywords: [
    "PDF",
    "Summarizer",
    "AI",
    "Research",
    "Document Analysis",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Saaransh",
    "PDF Summarizer",
    "PDF Summarizer App",
    "PDF Summarizer Tool",
    "PDF Summarizer Online",
    "PDF Summarizer Free",
    "PDF Summarizer Online Tool",
    "PDF Summarizer Online Tool",
    "PDF Summarizer Online Tool",
    "PDF Summarizer Online Tool",
  ],
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
      },
    ],
  },
  metadataBase: new URL(ORIGIN_URL),
  alternates: {
    canonical: ORIGIN_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          suppressHydrationWarning
          className={`${fontSans.variable} font-sans selection:bg-[#f7d4bf] antialiased`}
        >
          <div className="relative flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            {/* <Footer /> */}
          </div>
          <Toaster
            richColors={true}
            position="top-right"
            className="!mt-16"
            toastOptions={{
              style: {
                backgroundColor: "rgb(252,240,245)",
                background:
                  "linear-gradient(90deg, rgba(252,240,245,1) 0%, rgba(211,227,246,1) 100%)",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
