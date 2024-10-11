import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/Router";
import { APIProvider as GoogleMapsAPIProvider } from "@vis.gl/react-google-maps";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleMapsAPIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <RouterProvider router={router} />
      </GoogleMapsAPIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
