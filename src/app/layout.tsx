import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SparkleServ — Home Cleaning Subscriptions",
  description:
    "Subscription-based residential pressure washing and cleaning services. Trash cans, driveways, full home exterior — starting at $15/month.",
  keywords: ["home cleaning", "pressure washing", "subscription", "trash can cleaning", "driveway cleaning"],
  openGraph: {
    title: "SparkleServ — Home Cleaning Subscriptions",
    description: "Subscription-based residential cleaning. Set it and forget it.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
