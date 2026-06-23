import React, { useState } from 'react';
import { X, Shield, Truck, Sparkles, ShoppingCart, RefreshCw, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, selectedSpecs: any) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart
}: ProductDetailModalProps) {
  const [selectedWeight, setSelectedWeight] = useState(
    product.category === 'cue' ? '19.5 oz' : ''
  );
  const [selectedWrap, setSelectedWrap] = useState(
    product.category === 'cue' ? 'Tay trơn bóng mịn' : ''
  );
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleAddWithSpecs = () => {
    const specs = {
      weight: selectedWeight || undefined,
      wrap: selectedWrap || undefined,
    };
    onAddToCart(product, specs);
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-55 p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-white/10 w-full max-w-4xl relative max-h-[90vh] overflow-y-auto flex flex-col md:flex-row ">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-[#e9c349] z-10 p-1 hover:bg-zinc-900 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Gallery / Image on the left */}
        <div className="w-full md:w-1/2 bg-zinc-900 p-8 flex items-center justify-center relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[450px] object-contain border border-white/5"
            referrerPolicy="no-referrer"
          />
          {product.label && (
            <span className="absolute top-6 left-6 bg-[#e9c349] text-black px-3 py-1 text-xs font-bold font-mono">
              {product.label}
            </span>
          )}
        </div>

        {/* Details Content on the right */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs text-[#e9c349] uppercase tracking-[0.2em] font-mono block mb-2">
              {product.category === 'cue' ? 'GẬY ĐẤU CARBON CAO CẤP' : product.category === 'shaft' ? 'NGỌN CÔNG NGHỆ LOW DEFLECTION' : 'PHỤ KIỆN CHỦ LỰC'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold leading-tight mb-4">
              {product.name}
            </h2>

            {/* Price display */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-mono text-[#e9c349] font-bold">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              {product.originalPrice && (
                <span className="text-md font-mono text-zinc-500 line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>

            {/* Interactive Options if Product is a Cue */}
            {product.category === 'cue' && (
              <div className="space-y-4 mb-6 pt-4 border-t border-white/5">
                <div>
                  <h5 className="text-xs text-zinc-400 uppercase tracking-wider mb-2 font-mono">
                    Chọn trọng tải (Trọng lượng cơ):
                  </h5>
                  <div className="flex gap-2">
                    {['19 oz', '19.5 oz', '20 oz'].map((w) => (
                      <button
                        key={w}
                        onClick={() => setSelectedWeight(w)}
                        className={`px-4 py-2 text-xs font-mono transition-all ${
                          selectedWeight === w
                            ? 'bg-[#e9c349] text-black font-bold'
                            : 'bg-zinc-900 text-zinc-300 border border-white/5 hover:border-[#e9c349]/50'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs text-zinc-400 uppercase tracking-wider mb-2 font-mono">
                    Tùy chọn tay quấn (Tay Chuôi):
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {['Tay trơn bóng mịn', 'Quấn da bò thật (+1.200k)', 'Quấn chỉ trơn'].map((wr) => (
                      <button
                        key={wr}
                        onClick={() => setSelectedWrap(wr)}
                        className={`px-3 py-2 text-[11px] font-sans transition-all ${
                          selectedWrap === wr
                            ? 'bg-[#e9c349] text-black font-bold'
                            : 'bg-zinc-900 text-zinc-300 border border-white/5 hover:border-[#e9c349]/50'
                        }`}
                      >
                        {wr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tabs for extra details */}
            <div className="border-b border-white/10 flex gap-4 text-xs font-mono mb-4">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-2 uppercase tracking-wider transition-colors ${
                  activeTab === 'desc' ? 'border-b-2 border-[#e9c349] text-[#e9c349] font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Mô tả
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 uppercase tracking-wider transition-colors ${
                  activeTab === 'specs' ? 'border-b-2 border-[#e9c349] text-[#e9c349] font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Thông số
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 uppercase tracking-wider transition-colors ${
                  activeTab === 'reviews' ? 'border-b-2 border-[#e9c349] text-[#e9c349] font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Đánh giá ({product.reviews.length})
              </button>
            </div>

            {/* Tab panel content */}
            <div className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 h-40 overflow-y-auto pr-2">
              {activeTab === 'desc' && <p>{product.description}</p>}
              {activeTab === 'specs' && (
                <div className="space-y-2">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-white/5 py-1">
                      <span className="text-zinc-500 font-sans font-medium">{key}</span>
                      <span className="text-white font-mono font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {product.reviews.map((r, idx) => (
                    <div key={idx} className="bg-zinc-900/40 p-3 border border-white/5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white text-xs">{r.name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">{r.date}</span>
                      </div>
                      <div className="flex text-[#e9c349] mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-2.5 w-2.5 ${i < r.rating ? 'fill-[#e9c349]' : ''}`} />
                        ))}
                      </div>
                      <p className="text-xs text-zinc-400 italic">"{r.comment}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Commitments bar */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-400 uppercase tracking-widest font-mono mb-6 bg-zinc-900 p-3">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-[#e9c349]" />
                <span>Bảo Hành 2 Năm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-3 w-3 text-[#e9c349]" />
                <span>freeship Toàn Quốc</span>
              </div>
            </div>
          </div>

          <div>
            {/* Purchase flow Action Buttons */}
            {successMessage && (
              <div className="mb-3 p-2 bg-emerald-950 border border-emerald-500/20 text-emerald-400 text-xs text-center font-medium font-mono animate-fade-in">
                ✓ Đã thêm {product.name} vào giỏ hàng thành công!
              </div>
            )}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleAddWithSpecs}
                className="w-full bg-[#e9c349] text-black text-xs sm:text-sm font-bold tracking-widest uppercase font-mono py-4 hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" /> THÊM VÀO GIỎ HÀNG
              </button>
              <div className="text-center text-[11px] text-zinc-500 font-sans">
                Hoặc mua hàng nhanh chóng liên hệ SĐT / Zalo: <strong className="text-[#e9c349]">0926888788</strong> luôn
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
