import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { SiteHeader } from "@/components/SiteHeader";
import { GridOverlay } from "@/components/GridOverlay";
import { GlobalFooter } from "@/components/GlobalFooter";
import { CursorAndProgress } from "@/components/CursorAndProgress";
import { MotionProvider } from "@/components/MotionProvider";

export const metadata: Metadata = {
  title: "Quantivo Digital — We turn attention into measurable growth",
  description:
    "Quantivo Digital — digital marketing, brand design, website development and 3D visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /**
     * data-qv is set here rather than in an effect. The original set it in
     * componentDidMount and never persisted the choice, so every load starts
     * dark - rendering that server-side reproduces it exactly and sidesteps
     * any theme flash or hydration mismatch.
     */
    <html lang="en" data-qv="dark">
      <head>
        {/*
          Kept as a plain <link> rather than next/font on purpose: the CSS and
          every inline style reference the literal families "Manrope" and
          "Bebas Neue". next/font would hash those names and shift font-load
          timing, which is what perturbs the scroll measurement code.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <GridOverlay />
          <SiteHeader />
          {children}
          <GlobalFooter />
          <CursorAndProgress />
          <MotionProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
