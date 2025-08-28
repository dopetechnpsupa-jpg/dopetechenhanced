'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react'
import type { Product } from '@/lib/products-data'
import { getPrimaryImageUrl } from '@/lib/products-data'

interface DopeDailyShowcaseProps {
  products: Product[]
  onAddToCart?: (product: Product) => void
  className?: string
}

export function DopeDailyShowcase({ 
  products, 
  onAddToCart,
  className = ""
}: DopeDailyShowcaseProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [randomProducts, setRandomProducts] = useState<Product[]>([])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Function to randomly pick products
  const getRandomProducts = (allProducts: Product[], count: number = 2): Product[] => {
    if (!allProducts || allProducts.length === 0) return []
    
    // Filter out products that should be hidden on home
    const visibleProducts = allProducts.filter(product => !product.hidden_on_home)
    
    if (visibleProducts.length === 0) return []
    
    // Shuffle the array and pick the first 'count' items
    const shuffled = [...visibleProducts].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, shuffled.length))
  }

  useEffect(() => {
    if (products && products.length > 0) {
      const random = getRandomProducts(products, 2)
      setRandomProducts(random)
    }
  }, [products])

  if (!products || products.length === 0) {
    // Show fallback with example products
    const fallbackProducts: Product[] = [
      {
        id: 999,
        name: "OnePlus Nord Buds 3 Pro",
        description: "Experience premium sound quality with active noise cancellation",
        price: 2500,
        original_price: 3200,
        category: "Earphone",
        features: [
          "10 mins for 11 hrs fast charging",
          "Up to 49 dB Smart Noise Cancellation", 
          "6,000 Hz Hi-Res Audio"
        ],
        image_url: "/products/earphones.png",
        discount: 22,
        hidden_on_home: false,
        rating: 4.8,
        reviews: 1250,
        stock_quantity: 50,
        color: "Pearl White",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 998,
        name: "Gaming Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard with Cherry MX switches",
        price: 8500,
        original_price: 10000,
        category: "Keyboard",
        features: [
          "Cherry MX Blue switches",
          "RGB backlight customization",
          "Programmable macro keys"
        ],
        image_url: "/products/keyboard.png",
        discount: 15,
        hidden_on_home: false,
        rating: 4.6,
        reviews: 890,
        stock_quantity: 25,
        color: "Black",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
    
    return (
      <DopeDailyShowcase 
        products={fallbackProducts}
        onAddToCart={onAddToCart}
        className={className}
      />
    )
  }

  // Use random products if available, otherwise use fallback
  const displayProducts = randomProducts.length > 0 ? randomProducts : products.slice(0, 2)

  const handleShopNow = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product)
    }
  }

  const handleViewProduct = (product: Product) => {
    // Redirect to product detail page
    window.location.href = `/product/${product.id}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-black/90 via-[#E6C800]/80 to-[#F7DD0F]/70 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] pattern-dots"></div>
      </div>

             {/* Header Section */}
       <div className="relative p-6 sm:p-8 pb-4 text-center">
         <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1 }}
           className="inline-flex items-center gap-3 bg-black text-[#F7DD0F] px-6 py-3 rounded-full text-base sm:text-lg font-bold shadow-xl"
         >
           <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
           ★ Dope Daily Picks
         </motion.div>
       </div>

             {/* Products Grid */}
       <div className="relative px-6 sm:px-8 pb-6 sm:pb-8">
         <div className={`grid gap-4 max-w-7xl mx-auto ${
           displayProducts.length === 1 
             ? 'grid-cols-1' 
             : 'grid-cols-1 lg:grid-cols-2'
         }`}>
          {displayProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={handleShopNow}
              onViewProduct={handleViewProduct}
            />
          ))}
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5] 
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-4 right-4 w-12 h-12 bg-black/10 rounded-full blur-xl"
      />
      
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1 
        }}
        className="absolute bottom-8 left-8 w-8 h-8 bg-black/10 rounded-full blur-lg"
      />
    </motion.div>
  )
}

// Product Card Component
interface ProductCardProps {
  product: Product
  index: number
  onAddToCart: (product: Product) => void
  onViewProduct: (product: Product) => void
}

function ProductCard({ product, index, onAddToCart, onViewProduct }: ProductCardProps) {
  return (
         <motion.div
       initial={{ opacity: 0, scale: 0.95 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{ duration: 0.5, delay: index * 0.1 }}
               className="flex flex-row items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg"
     >
               {/* Product Image */}
        <div className="flex-shrink-0 w-24 sm:w-32 md:w-64 lg:w-56 xl:w-64">
          <div className="relative bg-white/20 rounded-xl p-2 sm:p-3 md:p-5">
            <img
              src={getPrimaryImageUrl(product)}
              alt={product.name}
              className="w-full h-auto object-contain max-h-20 sm:max-h-24 md:max-h-40 lg:max-h-36 xl:max-h-44 drop-shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-product.svg';
              }}
            />
          
                     {/* Floating Icon */}
           <motion.div
             animate={{ 
               y: [-2, 2, -2] 
             }}
             transition={{ 
               duration: 3, 
               repeat: Infinity, 
               ease: "easeInOut" 
             }}
             className="absolute -top-1 -right-1 bg-black text-[#F7DD0F] rounded-full p-1.5 shadow-lg"
           >
             <Sparkles className="w-3 h-3" />
           </motion.div>
        </div>
      </div>

                     {/* Product Info */}
        <div className="flex-1 text-left space-y-2 sm:space-y-2 md:space-y-3 lg:space-y-3">
          {/* Category */}
          <p className="text-black/70 text-[10px] sm:text-base font-semibold uppercase tracking-wider">
            {product.category}
          </p>

          {/* Title */}
          <h3 className="text-xs sm:text-2xl md:text-xl lg:text-2xl font-bold text-black leading-tight line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-3xl md:text-2xl lg:text-3xl font-bold text-black">
              Rs {product.price?.toLocaleString()}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xs sm:text-lg text-black/50 line-through">
                Rs {product.original_price.toLocaleString()}
              </span>
            )}
          </div>

                                     {/* Action Buttons */}
          <div className="flex flex-row gap-2 pt-2">
                       <button
              onClick={() => onViewProduct(product)}
              className="group bg-black text-[#F7DD0F] px-2 py-1 sm:px-4 sm:py-2 rounded-full font-bold text-[10px] sm:text-sm hover:bg-black/90 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1 sm:gap-2 shadow-lg flex-1"
            >
              Buy
              <ArrowRight className="w-2.5 h-2.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button
              onClick={() => onAddToCart(product)}
              className="group border border-black text-black px-2 py-1 sm:px-4 sm:py-2 rounded-full font-bold text-[10px] sm:text-sm hover:bg-black hover:text-[#F7DD0F] transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 shadow-lg flex-1"
            >
              Cart
              <ShoppingBag className="w-2.5 h-2.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
            </button>
         </div>
      </div>
    </motion.div>
  )
}

export default DopeDailyShowcase
