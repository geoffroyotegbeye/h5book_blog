// src/app/layout.tsx
import React from 'react';
import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import LeftSidebar from "@/components/layout/LeftSidebar";

export const metadata: Metadata = {
  title: "Blog H5book",
  description: "H5Book est une plateforme en ligne conçue principalement pour les développeurs afin de leur fournir un accès facile à l'actualité tech et aux ressources pertinentes sur le développement logicie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div>
          <Nav />
          <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6 my-2">
            <div className="col-span-12 md:col-span-3 lg:col-span-3">
              <LeftSidebar />
            </div>
            <div className="col-span-12 md:col-span-9 lg:col-span-9">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
