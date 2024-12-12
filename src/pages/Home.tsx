import { useNavigate } from '@tanstack/react-router';
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Welcome to the <span className="text-yellow-300">Product Store</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8">
          Discover amazing products and deals! Browse our collection and find your next favorite item.
        </p>
        <Button 
          onClick={() => navigate({ to: "/products" })} 
          className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg shadow-md hover:bg-yellow-500 transition-transform transform hover:scale-105"
        >
          Show All Products
        </Button>
      </div>
    </div>
  );
}

export default Home;
