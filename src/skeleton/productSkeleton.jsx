import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonProductDetails = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left: Product Images */}
      <div className="md:w-1/2 flex flex-col gap-4">
        <Skeleton height={350} className="w-full rounded-lg aspect-square" />

        <div className="flex gap-2">
          {[1, 2, 3].map((_, idx) => (
            <Skeleton
              key={idx}
              width={64}
              height={64}
              className="rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <Skeleton height={30} width={`60%`} className="mb-2" />
          <Skeleton count={3} className="mb-4" />

          <div className="flex items-center justify-between mb-6">
            <Skeleton width={80} height={24} />
            <Skeleton width={100} height={18} />
          </div>
        </div>

        <Skeleton height={40} width={150} className="rounded-lg" />
      </div>
    </div>
  )
}

export default SkeletonProductDetails
