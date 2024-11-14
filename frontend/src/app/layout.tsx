// src/app/layout.tsx
import React from 'react';
import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import LeftSidebar from "@/components/layout/LeftSidebar";



export const metadata: Metadata = {
  title: "Blog H5book",
  description: "H5book est une plateforme de blog pour développeurs...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body >
        <div className="min-h-screen bg-gray-50">
          <Nav />
          <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6 my-2">
            <div className="col-span-12 md:col-span-3 lg:col-span-3">
              <LeftSidebar />
            </div>
            <div className="col-span-12 md:col-span-9 lg:col-span-9">
              {children} {/* Zone de contenu principal */}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
