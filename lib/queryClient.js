import { QueryClient } from "@tanstack/react-query";

/**
 * Create a new QueryClient instance with optimized default options
 */
export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Cache time (how long inactive data is kept in cache)
        gcTime: 1000 * 60 * 10, // 10 minutes

        // Stale time (how long data is considered fresh)
        staleTime: 1000 * 60 * 5, // 5 minutes

        // Refetch behavior
        refetchOnWindowFocus: false, // Tắt refetch khi quay lại tab
        refetchOnReconnect: true, // Refetch when reconnected to internet
        refetchOnMount: true, // Refetch when component mounts

        // Retry configuration
        retry: (failureCount, error) => {
          // Don't retry on 404s
          if (error?.status === 404) return false;

          // Retry up to 2 times for other errors
          return failureCount < 2;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

        // Network mode
        networkMode: "online", // Only fetch when online
      },
      mutations: {
        // Retry mutations once by default
        retry: 1,
        retryDelay: 1000,

        // Network mode for mutations
        networkMode: "online",

        // Global error handler (can be overridden per mutation)
        onError: (error) => {
          console.error("Mutation error:", error);
          // You can add toast notifications here
        },
      },
    },
  });

// Browser-side singleton instance
let browserQueryClient;

/**
 * Get or create a QueryClient instance
 * On the server, always create a new instance
 * On the client, reuse the same instance (singleton)
 */
export const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always create a new QueryClient
    return makeQueryClient();
  }

  // Browser: create QueryClient once and reuse it
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
};
