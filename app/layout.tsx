import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pratyushagarwal.com"),
  title: "Pratyush Agarwal",
  description:
    "Software engineer building in public. Three years shipping data systems, now all in on software engineering. Proof, not promises, one commit at a time.",
  openGraph: {
    title: "Pratyush Agarwal — Building software in public",
    description:
      "Software engineer building in public. Three years shipping data systems, now all in on software engineering. Proof, not promises, one commit at a time.",
    type: "website",
    url: "https://pratyushagarwal.com",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Pratyush Agarwal — Building software in public",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratyush Agarwal — Building software in public",
    description:
      "Software engineer building in public. Three years shipping data systems, now all in on software engineering. Proof, not promises, one commit at a time.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${sourceSans.variable} ${ibmPlexMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full font-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-3 focus:py-2 focus:font-body focus:text-sm focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
