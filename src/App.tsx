import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';

import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductDetails from './pages/ProductDetails';

const queryClient = new QueryClient();

// Define the root route
const rootRoute = createRootRoute({
  component: () => <div><Outlet /></div>,  // Render child components here using Outlet
});

// Define individual routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const allProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: AllProducts,
});

const productDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/:id',
  component: ProductDetails,
});

// Create a route tree
const routeTree = rootRoute.addChildren([homeRoute, allProductsRoute, productDetailsRoute]);

// Create the router
const router = createRouter({ routeTree });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
