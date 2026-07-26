import { MediaAppShell, MediaProviders } from "@tsuki-media/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tsuki Movies",
  description: "A personal movie collection powered by TMDB",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MediaProviders>
          <MediaAppShell title="Tsuki Movies">{children}</MediaAppShell>
        </MediaProviders>
      </body>
    </html>
  );
}
