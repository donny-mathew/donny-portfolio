import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Donny J Mathew — Lead Engineer",
  description:
    "Portfolio of Donny J Mathew, Lead Engineer specialising in Java, Spring Boot microservices, event-driven architecture, and AI-assisted development. Open to opportunities in Australia.",
  keywords: [
    "Java", "Spring Boot", "Microservices", "Lead Engineer",
    "OpenSearch", "RabbitMQ", "MongoDB", "Australia",
  ],
  authors: [{ name: "Donny J Mathew", url: "https://www.linkedin.com/in/donny-j-mathew" }],
  openGraph: {
    title: "Donny J Mathew — Lead Engineer",
    description: "Java & Spring Boot Lead Engineer — 8 years building scalable microservices. Open to Australia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
