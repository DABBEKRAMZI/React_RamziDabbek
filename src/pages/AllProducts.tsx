import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button'; 
import { useNavigate } from '@tanstack/react-router';

// Fetching products function
const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/products');
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

const AllProducts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const navigate = useNavigate();

  // State for price filtering
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  // Filter products based on the price range
  const handleFilter = () => {
    if (!data?.products) return;

    const filtered = data.products.filter((product: any) => {
      const isAboveMin = minPrice === '' || product.price >= minPrice;
      const isBelowMax = maxPrice === '' || product.price <= maxPrice;
      return isAboveMin && isBelowMax;
    });

    setFilteredProducts(filtered);
  };

  if (isLoading) return <div className="text-center py-8 text-xl text-primary animate-pulse">Loading products...</div>;
  if (error) return <div className="text-center py-8 text-xl text-red-500">Error: {error.message}</div>;

  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : data.products;

  return (
    <div className="container mx-auto py-12 px-6 lg:px-16">

      {/* Price Filter Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl shadow-xl mb-12 sticky top-0 z-10">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-white">Discover Our Exclusive Products</h1>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Filter by Price</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="minPrice" className="block text-white font-medium mb-2">Min Price</label>
            <input 
              type="number" 
              id="minPrice" 
              value={minPrice} 
              onChange={(e) => setMinPrice(Number(e.target.value) || '')} 
              className="w-full p-3 rounded-lg border-none focus:ring-4 focus:ring-yellow-400" 
              placeholder="Min price" 
              min={0} 
            />
          </div>

          <div className="flex-1">
            <label htmlFor="maxPrice" className="block text-white font-medium mb-2">Max Price</label>
            <input 
              type="number" 
              id="maxPrice" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value) || '')} 
              className="w-full p-3 rounded-lg border-none focus:ring-4 focus:ring-yellow-400" 
              placeholder="Max price" 
              min={0} 
            />
          </div>

          <div className="flex items-end">
            <Button 
              onClick={handleFilter} 
              className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 hover:scale-105 transform transition"
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productsToDisplay.map((product: any) => (
          <div 
            key={product.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all"
          >
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full h-56 object-cover" 
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">{product.title}</h2>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Category: {product.category}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
              <p className="text-xl font-bold text-primary mb-4">${product.price}</p>
              <Button 
                className="w-full bg-indigo-500 text-white font-bold py-3 rounded-lg hover:bg-indigo-600 hover:scale-105 transform transition"
                onClick={() => navigate({ to: `/products/${product.id}` })}
              >
                View Product
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
