import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Heart, ShoppingCart } from 'lucide-react'

const ProductCardSkeleton = ({ variant = 'default' }) => {
    const cardClasses = variant === 'compact'
        ? 'group relative bg-[var(--bg-secondary)] rounded-lg border border-[var(--bg-tertiary)] w-screen min-w-80 max-w-58 flex flex-col flex-grow'
        : 'group relative bg-[var(--bg-secondary)] rounded-xl border border-[var(--bg-tertiary)] overflow-hidden w-screen min-w-70 max-w-88 flex flex-col flex-grow';

    return (
        <div className={cardClasses} style={{ minHeight: 0, flex: 1, height: '100%', maxHeight: '25.5rem' }}>
            {/* Image Placeholder */}
            <div className={`relative -mt-1 ${variant === 'compact' ? 'aspect-square' : 'aspect-[4/2.5]'} overflow-hidden ${variant === 'compact' ? 'rounded-t-lg' : 'rounded-t-xl'}`}>
                <Skeleton
                    className="w-[110%] h-full"
                    baseColor="var(--bg-secondary)"
                    highlightColor="var(--bg-tertiary)"
                />

                {/* Badge placeholders */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    <Skeleton
                        width={60}
                        height={24}
                        borderRadius={999}
                        baseColor="#05966940"
                        highlightColor="var(--bg-secondary)"
                    />
                    <Skeleton
                        width={40}
                        height={24}
                        borderRadius={999}
                        baseColor="var(--bg-secondary)"
                        highlightColor="var(--bg-tertiary)"
                    />
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <div className="p-2 rounded-full bg-[var(--bg-tertiary)]">
                        <Heart className="w-4 h-4 text-forge-tertiary" />
                    </div>
                </div>

                {/* Quick Add to Cart Button */}
                <div className="absolute bottom-3 right-3">
                    <div className="p-2 bg-[var(--color-primary)]/20 rounded-full">
                        <ShoppingCart className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className={`p-3 ${variant === 'compact' ? 'space-y-0' : 'space-y-2'} flex-1 flex flex-col justify-between`}>
                {/* Title */}
                <Skeleton
                    height={20}
                    width="80%"
                    className="rounded"
                    baseColor="var(--bg-secondary)"
                    highlightColor="var(--bg-tertiary)"
                />

                {/* Description */}
                {variant !== 'compact' && (
                    <>
                        <Skeleton
                            height={16}
                            width="90%"
                            baseColor="var(--bg-secondary)"
                            highlightColor="var(--bg-tertiary)"
                        />
                        <Skeleton
                            height={16}
                            width="75%"
                            baseColor="var(--bg-secondary)"
                            highlightColor="var(--bg-tertiary)"
                        />
                    </>
                )}

                {/* Price & Stock */}
                <div className="flex items-center justify-between mt-2">
                    <Skeleton
                        width={60}
                        height={20}
                        baseColor="var(--bg-secondary)"
                        highlightColor="var(--bg-tertiary)"
                    />
                    <Skeleton
                        width={70}
                        height={14}
                        baseColor="var(--bg-secondary)"
                        highlightColor="var(--bg-tertiary)"
                    />
                </div>

                {/* Bottom Add to Cart Button */}
                {variant !== 'compact' && (
                    <Skeleton
                        height={40}
                        className="rounded-lg mt-2"
                        baseColor="#05966940"
                        highlightColor="var(--bg-secondary)"
                    />
                )}
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
