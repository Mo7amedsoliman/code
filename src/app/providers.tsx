"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { AppStore, createStore, preloadedState } from "@/store/Store";
import { ReactNode, useState } from "react";

function Providers({
  children,
  preloadState,
}: {
  children: ReactNode;
  preloadState: preloadedState;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [store] = useState<AppStore>(() => createStore(preloadState));

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </QueryClientProvider>
    </Provider>
  );
}

export default Providers;
