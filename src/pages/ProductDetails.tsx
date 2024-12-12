import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router'; // Correct import
import { Button } from '@/components/ui/button';

// Fetch product details function
const fetchProductDetails = async (id: string) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product details');
  return response.json();
};

const ProductDetails = () => {
  const { id } = useParams({ from: '/products/:id' }); // Correct usage of useParams
  
  const { data, error, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetails(id),
    enabled: !!id, // Only run query if id exists
  });

  if (!id) {
    return <div className="text-center py-8 text-xl text-red-500">Product ID not found</div>;
  }

  if (isLoading) {
    return <div className="text-center py-8 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-xl text-red-500">Error: {error.message}</div>;
  }

  if (!data) {
    return <div className="text-center py-8 text-xl text-red-500">No product data available</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="text-lg text-gray-700">{data.description}</p>
      <p className="text-lg font-bold">Price: ${data.price}</p>
      <Button onClick={() => window.history.back()} className="bg-gray-300 text-black">
        Back to Products
      </Button>
    </div>
  );
};

export default ProductDetails;
