import { MediaAppShell, MediaProviders } from "@suki-media/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suki Books",
  description: "A personal book collection powered by Hardcover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MediaProviders>
          <MediaAppShell title="Suki Books">{children}</MediaAppShell>
        </MediaProviders>
      </body>
    </html>
  );
}
