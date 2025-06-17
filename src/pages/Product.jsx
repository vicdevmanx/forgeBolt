import API from '@/components/functional/axios';
import { Badge } from '@/components/ui/badge';
import SkeletonProductDetails from '@/skeleton/productSkeleton';
import { useAuthStore } from '@/store/authStore';
import { Loader } from 'lucide-react';
// import { Badge } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';


export default function Product() {
  // Example product data (replace with real data or props)
  const { id } = useParams()
  const fetchProductDetails = useAuthStore(s => s.fetchProductDetails)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const addToCart = useAuthStore(s => s.addToCart)
  const getCart = useAuthStore(s => s.getCart)
  const setTotal = useAuthStore(s => s.setTotal)
  const fetchProducts = useAuthStore(s => s.fetchProducts)
  const isLoggedIn = useAuthStore(s => s.token)
  const [available, setAvailable] = useState(null)

  const handleAddToCart = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      e.stopPropagation();
      toast.info('login to add to cart')
      return
    }
    e.preventDefault();
    setLoading(true)
    addToCart(id).then(() => {
      toast.success('Product added to cart!')
      getCart().then(() => {
        const cart = useAuthStore.getState().cart
        setAvailable(cart.find((item) => item.products.id == product.id))
        setTotal(cart.length)
        setLoading(false)
      })

      fetchProducts()
    });
  };


  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const loadProductAndCart = async () => {
      try {
        // Fetch product details and cart in parallel
        const [_, cartData] = await Promise.all([
          fetchProductDetails(id),
          getCart()
        ]);
        const currentProduct = useAuthStore.getState().productDetails;
        const cart = useAuthStore.getState().cart;

        if (isMounted) {
          setProduct(currentProduct);
          setAvailable(cart.find(item => item.products.id === currentProduct.id));
        }
      } catch (err) {
        toast.error('Failed to fetch product details');
        if (isMounted) setProduct(null);
      }
    };

    loadProductAndCart();

    return () => {
      isMounted = false;
    };
  }, [id, fetchProductDetails, getCart]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 max-w-4xl mx-auto p-2 py-8 min-h-screen">
      {/* Cute Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 mb-6 text-primary hover:underline font-[poppins-medium] transition"
        aria-label="Go back"
      >
        <span className="text-lg"><ChevronLeft /></span>
        <span>Back</span>
      </button>
      {product ? <div className="flex flex-col md:flex-row gap-8 rounded-lg">
        {/* Product Images */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <img
            src={product.image_url}
            alt={product.name}
            className="rounded-lg w-full h-88 object-cover aspect-square"
          />
          <div className="flex gap-2">
            <img
              src={product.image_url}
              alt={`${product.name} thumbnail`}
              className="w-16 h-16 rounded-md object-cover border"
            />
          </div>
        </div>
        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-between">

          <div><div className="flex flex-col mb-4 space-y-2">
            {product.category && <Badge className='bg-[var(--color-primary)] text-white border-0 rounded-full py-1.5 text-xs font-[poppins-medium]'>{product.category}</Badge>}
            {product.discount && <Badge variant="discount">-{product.discount}%</Badge>}
            {product.status && <Badge variant={product.status.toLowerCase()}>{product.status}</Badge>}
          </div>
            <h1 className="text-2xl font-[poppins-bold] mb-2">{product.name}</h1>
            <p className="text-[var(text--tertiary)] font-[poppins-medium] mb-4">{product.description}</p>
            <div className='flex items-center justify-between'>
              <div className="text-xl font-[poppins-semibold] text-primary mb-6">$ {product.price}</div>
              {product.stock_count !== undefined && (
                <span className={`text-xs font-[poppins-medium] ${product.stock_count > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                  {product.stock_count > 0 ? `${product.stock_count} in stock` : 'Out of stock'}
                </span>
              )}
            </div>
          </div>
          {available ?

            <div className="flex items-center gap-2 w-full mt-2">
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (available.quantity > 1) {
                    try {
                      setLoading(true);
                      const toastId = toast.loading('Updating Quantity...')
                      const res = await API.put(`/cart/${available.id}`, { quantity: available.quantity - 1 });
                      setAvailable(res.data)
                      toast.success('Quantity Updated!', {
                        id: toastId
                      })
                    } catch (e) {
                      toast.error('Failed to decrease quantity');
                      console.log(e)
                    } finally {
                      setLoading(false);
                    }
                  }
                }}
                disabled={available.quantity <= 1 || loading}
                className="flex-1 px-3 py-1.5 rounded-l-lg bg-[var(--color-primary)] text-white disabled:opacity-50 w-full"
                aria-label="Decrease quantity"
              >-</button>
              <span className="px-4 py-1.5 bg-[var(--bg-tertiary)] rounded font-[poppins-medium] w-full text-center flex-1">
                {available.quantity}
              </span>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    setLoading(true);
                    const toastId = toast.loading('Updating Quantity...');
                    const res = await API.put(`/cart/${available.id}`, { quantity: available.quantity + 1 });
                    setAvailable(res.data)
                    toast.success('Quantity Updated!', {
                      id: toastId
                    });
                  } catch (e) {
                    toast.error('Failed to increase quantity');
                    console.log(e);
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading || available.quantity >= product.stock_count}
                className="flex-1 px-3 py-1.5 rounded-r-lg bg-[var(--color-primary)] text-white disabled:opacity-50 w-full"
                aria-label="Increase quantity"
              >+</button>
            </div>
            :
            <button
              disabled={product.stock_count === 0 || loading}
              className={`flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 text-white ${product.stock_count === 0
                ? 'bg-[var(--color-secondary)] text-forge-tertiary cursor-not-allowed'
                : 'bg-[var(--color-primary)] hover:shadow-md'
                }`}
              onClick={handleAddToCart}
            >
              {loading ?
                <> <Loader size='16px' /> <p>Adding to Cart...</p></>
                :
                <>{product.stock_count === 0 ? 'Out of Stock' : 'Add to Cart'}</>}
            </button>}
        </div>
      </div>
        : <SkeletonProductDetails />}
    </div>
  );
}
