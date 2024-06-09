import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import GlobalStyle from "./GlobalStyle.style.ts";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme.ts";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen />
        <GlobalStyle />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
    ,
  </React.StrictMode>,
);
