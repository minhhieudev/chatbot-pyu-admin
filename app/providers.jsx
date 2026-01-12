"use client";

import { useState } from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import { getQueryClient } from "@/lib/queryClient";

export function Providers({ children, themeProps = {} }) {
  const router = useRouter();
  const [queryClient] = useState(() => getQueryClient());

  return (
    <HeroUIProvider navigate={router.push}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider {...themeProps}>
          {children}
          <Toaster closeButton richColors position="top-right" theme="light" />
        </NextThemesProvider>
        <ReactQueryDevtools
          buttonPosition="bottom-right"
          initialIsOpen={false}
        />
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
