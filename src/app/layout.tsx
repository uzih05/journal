import type { Metadata } from "next";
import ThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jiheon Yu — Developer",
  description: "Backend & Frontend Developer Portfolio",
};

const themeScript = `
(function(){
  try {
    var h = document.documentElement;
    var t = localStorage.getItem('theme');
    var d = (!t || t === 'system')
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : t === 'dark';
    if (d) {
      h.classList.add('dark');
      h.style.colorScheme='dark';
      h.style.backgroundColor='#09090b';
    } else {
      h.style.colorScheme='light';
      h.style.backgroundColor='#fafafa';
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning style={{ backgroundColor: "#09090b" }}>
      <head>
        <meta name="color-scheme" content="dark light" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <div className="noise-overlay" aria-hidden="true" />
        </ThemeProvider>
      </body>
    </html>
  );
}
