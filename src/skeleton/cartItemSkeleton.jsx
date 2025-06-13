import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { motion } from 'framer-motion'

const CartItemSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="relative flex items-center bg-[var(--bg-secondary)] border border-[var(--bg-tertiary)] rounded-lg p-2 gap-2"
    >
      {/* Cancel Button */}
      <div className="absolute top-2 right-2 rounded-full p-1 bg-[var(--bg-tertiary)]">
        <Skeleton circle width={20} height={20} />
      </div>

      {/* Image */}
      <Skeleton height={96} width={96} className="rounded object-cover" />

      {/* Product Info */}
      <div className="flex-1 space-y-2">
        <Skeleton height={16} width="70%" />
        <Skeleton height={12} width="50%" />
      </div>

      {/* Price & Counter */}
      <div className="flex flex-col items-end gap-2 min-w-[90px] pt-8">
        <Skeleton width={50} height={16} />

        <div className="flex items-center gap-1 bg-[var(--bg-tertiary)] rounded-md px-1 py-0.5 shadow-inner">
          <Skeleton circle width={20} height={20} />
          <Skeleton width={20} height={16} />
          <Skeleton circle width={20} height={20} />
        </div>
      </div>
    </motion.div>
  )
}

export default CartItemSkeleton
