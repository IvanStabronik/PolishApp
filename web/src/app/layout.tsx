import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SŁOWARIUM",
  description: "Akademia języka polskiego — Archive of Living Speech",
};

/** Pass-through — `[locale]/layout` owns `<html>` / `<body>`. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
