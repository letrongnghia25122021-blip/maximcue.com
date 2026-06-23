import React from 'react';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, selectedSpecs?: any) => void;
}

export default function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  // Star rendering support
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < fullStars ? 'text-[#e9c349] fill-[#e9c349]' : 'text-zinc-600'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="group bg-zinc-950 border border-white/5 relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#e9c349] hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="aspect-square relative overflow-hidden bg-zinc-900 cursor-pointer" onClick={() => onSelect(product)}>
        <img
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={product.image}
          referrerPolicy="no-referrer"
        />

        {/* Dynamic decorative visual tag overlay */}
        {product.label && (
          <div className="absolute top-4 right-4 bg-[#e9c349] text-black px-3 py-1 text-[9px] font-sans font-bold uppercase tracking-wider">
            {product.label}
          </div>
        )}

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onSelect(product)}
            className="p-3 bg-zinc-900 border border-white/10 text-white hover:border-[#e9c349] hover:text-[#e9c349] transition-colors"
            title="Xem chi tiết"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="p-3 bg-[#e9c349] text-black hover:bg-white hover:text-black transition-colors"
            title="Thêm vào giỏ hàng"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Product Content Specifications */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
            {product.category === 'cue' ? 'Gậy Đấu Carbon' : product.category === 'shaft' ? 'Ngọn Công Nghệ' : product.category === 'blindbag' ? 'Túi Mù May Mắn' : 'Phụ Kiện'}
          </span>
          <h4
            onClick={() => onSelect(product)}
            className="font-serif text-[17px] text-[#e5e2e1] hover:text-[#e9c349] transition-colors line-clamp-1 cursor-pointer font-bold leading-tight"
          >
            {product.name}
          </h4>
        </div>

        <div>
          {/* Price display with potential discount labels */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-md sm:text-lg font-mono font-bold text-[#e9c349]">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono text-zinc-500 line-through">
                {product.originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>

          {/* Sizing & ratings */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-[11px] text-zinc-400 font-sans">
              {product.salesCount.toLocaleString('vi-VN')} đã bán
            </span>
            <div className="flex items-center gap-1">
              <div className="flex text-[#e9c349]">{renderStars(product.rating)}</div>
              <span className="text-[10px] text-zinc-400 font-mono ml-1">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
