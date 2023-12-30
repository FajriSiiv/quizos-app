import MainLayout from "@/components/layout";
import { ThemeProvider } from "@/components/theme-dark";
import { ModeToggle } from "@/components/toggleDark";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Quiz App build with NEXT.JS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout>
            <div className="absolute top-5 right-5">
              <ModeToggle />
            </div>
            {children}
            <Toaster />
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
