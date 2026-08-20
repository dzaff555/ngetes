import "./globals.css";

export const metadata = {
  title: "Login Marcha",
  description: "Login Next.js + MySQL"
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
