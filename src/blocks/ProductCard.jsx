import { useState } from 'react';
import { ShoppingCart, Heart, Badge as BadgeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
// import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const ProductCard = ({ product = {
  id: "1",
  image_url: '/tools2.jpg',
  name: "Iron Hammer",
  description: "Forged steel hammer",
  price: 49.99,
  category: "Tools",
  brand: "ForgeTech",
  stock_count: 20
}, variant = 'default' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [loading, setLoading] = useState(false)
  const addToCart = useAuthStore(s => s.addToCart)
  const fetchProducts = useAuthStore(s => s.fetchProducts)
  const getCart = useAuthStore(s => s.getCart)
  const setTotal = useAuthStore(s => s.setTotal)
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true)
    addToCart(product.id).then(() => {
      toast.success('Product added to cart!')
      getCart().then(() => {
        const cart = useAuthStore.getState().cart
        setTotal(cart.length)
        setLoading(false)
      })
      
      fetchProducts()
    });
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const cardClasses = variant === 'compact'
    ? 'group relative bg-[var(--bg-color)] rounded-lg border border-[var(--bg-tertiary)] hover:shadow-lg transition-all duration-300 hover:scale-[1.02] w-full min-w-58 max-w-88'
    : 'group relative bg-[var(--bg-color)] rounded-xl border border-[var(--bg-tertiary)] hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden w-full min-w-58  max-w-88';


  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className={cardClasses}>
        {/* Image Container */}
        <div className={`relative ${variant === 'compact' ? 'aspect-square' : 'aspect-[4/2.5]'} overflow-hidden ${variant === 'compact' ? 'rounded-t-lg' : 'rounded-t-xl'}`}>
          <img
            src={product.image_url}
            alt={product.name}
            className={`w-full min-h-88 object-cover transition-transform duration-300 group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setImageLoading(false)}
          />

          {/* Loading Skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 bg-forge-tertiary/20 animate-pulse"></div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.category && <Badge className='bg-[var(--color-primary)] text-white border-0 rounded-full py-1.5 text-xs font-[poppins-medium]'>{product.category}</Badge>}
            {product.discount && <Badge variant="discount">-{product.discount}%</Badge>}
            {product.status && <Badge variant={product.status.toLowerCase()}>{product.status}</Badge>}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 transition-opacity duration-300">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-all duration-200 ${isLiked
                ? 'bg-red-500 text-white'
                : 'bg-[var(--bg-tertiary)] text-forge-tertiary hover:bg-[var(--bg-tertiary)] hover:text-red-500'
                }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className="p-2 bg-forge-primary text-white rounded-full hover:bg-forge-dark transition-colors duration-200 hover:scale-110"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`p-4 ${variant === 'compact' ? 'space-y-2' : 'space-y-3'}`}>

          {/* Title */}
          <h3 className={`font-[poppins-semibold] line-clamp-2 h-14 text-[var(--color-primary)] ${variant === 'compact' ? 'text-sm' : 'text-lg'}`}>
            {product.name}
          </h3>

          {/* Description */}
          {variant !== 'compact' && product.description && (
            <p className="text-sm font-[poppins-medium] line-clamp-2 text-[var(--text-tertiary)] h-11">
              {product.description}
            </p>
          )}

          {/* Price and Stock */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`font-[poppins-semibold] text-[var(--text-primary)] ${variant === 'compact' ? 'text-sm' : 'text-lg'}`}>
                <span className='font-[poppins-bold]'>$</span> {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-forge-tertiary line-through">
                  ₦{product.originalPrice}
                </span>
              )}
            </div>

            {product.stock_count !== undefined && (
              <span className={`text-xs font-[poppins-medium] ${product.stock_count > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {product.stock_count > 0 ? `${product.stock_count} in stock` : 'Out of stock'}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {variant !== 'compact' && (
            <button
              onClick={handleAddToCart}
              disabled={product.stock_count === 0 || loading}
              className={`flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 text-white ${product.stock_count === 0
                ? 'bg-[var(--color-secondary)] text-forge-tertiary cursor-not-allowed'
                : 'bg-[var(--color-primary)] hover:shadow-md'
                }`}
            >
              {loading ?
                <> <Loader size='16px' /> <p>Adding to Cart...</p></>
                :
                <>{product.stock_count === 0 ? 'Out of Stock' : 'Add to Cart'}</>}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
