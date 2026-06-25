import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Flame, Play, Volume2, ShieldCheck, Mail, Phone, Calendar, ArrowRight, Star, Heart, Bookmark, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CueCustomizer from './components/CueCustomizer';
import ConsultForm from './components/ConsultForm';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import { Product, CartItem, NewsArticle } from './types';
import { PRODUCTS, NEWS_ARTICLES, TESTIMONIALS } from './data';

import maximPoolPlayer from './assets/images/maxim_pool_player_1782206525004.jpg';
import maximBilliardLogo from './assets/images/maxim_billiard_logo_1782206540434.jpg';
import HeroBannerImg1 from './assets/images/gioithieu.jpg';
import HeroBannerImg2 from './assets/images/anhbia4.jpg';
import DeflectionReductionImg from './assets/images/gioithieu.jpg';
import WeatherResistanceImg from './assets/images/gioithieu1.jpg';
import LifetimeWarrantyImg from './assets/images/anhbia4.jpg';
export default function App() {
  // Shopping Cart State (Load from localStorage if available)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('maxim_billiard_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal display togglers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);

  // Filtering category state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Hero carousel slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('maxim_billiard_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle adding items to cart
  const handleAddToCart = (product: Product, selectedSpecs?: any) => {
    // Generate unique identification id for specs differentiation (weight, wrap, etc.)
    const specString = selectedSpecs ? JSON.stringify(selectedSpecs) : '';
    const itemId = `${product.id}-${specString}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: itemId, product, quantity: 1, selectedSpecs }];
    });
  };

  // Update quantity
  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Filtered products list
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  // Carousel slider data list
  const SLIDES = [
    {
      title: 'THE ULTIMATE BILLIARD EXPERIENCE',
      subtitle: 'NHÀ TÀI TRỢ KIM CƯƠNG ĐỘC QUYỀN',
      desc: 'Maxim Billiard hân hạnh đồng hành cùng giải đấu Pool quy tụ 256 cơ thủ hàng đầu thế giới với quỹ thưởng lên đến 5 Tỷ 148 Triệu VNĐ.',
      actionText: 'XEM SỰ KIỆN 🏆',
      bgType: 'image',
      bgUrl: HeroBannerImg2, // Thay bằng ảnh anhbia4.jpg
      onClick: () => {
        const doc = document.getElementById('news-section');
        if (doc) doc.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      title: 'TỰ THIẾT KẾ CƠ BIDA ĐỘC BẢN',
      subtitle: '3D CUE INTEGRATION CUSTOMIZER',
      desc: 'Tự chọn ngọn Carbon bách chiến, chuôi khảm xà cừ, loại ren Uni-loc, và khắc laser tên riêng chìm dưới vân gỗ sang quý.',
      actionText: 'BẮT ĐẦU CUSTOM 🛠️',
      bgType: 'image',
      bgUrl: HeroBannerImg1, // Thay bằng ảnh gioithieu.jpg
      onClick: () => setIsCustomizerOpen(true),
    }
  ];

  // Auto scroll slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#050505] text-zinc-300 font-sans selection:bg-[#e9c349] selection:text-black">
      
      {/* 1. Header Navigation elements */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenConsultation={() => setIsConsultOpen(true)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* 2. Visual Promo Slides (Hero banner) */}
      <section className="relative h-[85vh] sm:h-[90vh] bg-black overflow-hidden pt-20 flex items-center">
        {/* Dynamic slide backgrounds */}
        <div className="absolute inset-0 z-0">
          <img
            src={SLIDES[currentSlide].bgUrl}
            alt="Hero Background banner"
            className="w-full h-full object-cover opacity-35 transition-all duration-1000 transform scale-100 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/60" />
        </div>

        {/* Slide navigation buttons */}
        <div className="absolute inset-y-0 left-4 z-10 hidden sm:flex items-center">
          <button
            onClick={handlePrevSlide}
            className="p-2 border border-white/10 bg-black/40 text-white hover:border-[#e9c349] hover:text-[#e9c349] transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 z-10 hidden sm:flex items-center">
          <button
            onClick={handleNextSlide}
            className="p-2 border border-white/10 bg-black/40 text-white hover:border-[#e9c349] hover:text-[#e9c349] transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Inside Carousel Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full animate-fade-in">
          <div className="max-w-xl space-y-4">
            <span className="text-[#e9c349] text-xs uppercase tracking-[0.4em] font-mono block">
              {SLIDES[currentSlide].subtitle}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
              {SLIDES[currentSlide].title}
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-md leading-relaxed">
              {SLIDES[currentSlide].desc}
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={SLIDES[currentSlide].onClick}
                className="bg-[#e9c349] text-black font-mono font-bold text-xs sm:text-sm px-6 py-3.5 sm:px-8 sm:py-4 uppercase tracking-widest hover:bg-white transition-all transform hover:scale-[1.02] active:scale-95 leading-none"
              >
                {SLIDES[currentSlide].actionText}
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-transparent border border-white/20 text-white font-mono text-xs sm:text-sm px-6 py-3.5 sm:px-8 sm:py-4 uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all leading-none"
              >
                KHÁM PHÁ CỦA HÀNG ⚔️
              </button>
            </div>
          </div>
        </div>

        {/* Dots indices marker indicator */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all rounded-none ${
                currentSlide === idx ? 'w-8 bg-[#e9c349]' : 'w-2 bg-zinc-600'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 3. Competitive Quality Highlights Metrics Panel with Images */}
      <section className="bg-zinc-950 border-y border-white/5 py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* DEFLECTION REDUCTION */}
            <div className="bg-zinc-900/40 border border-white/5 p-5 hover:border-[#e9c349]/30 transition-all rounded-xl group flex flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-lg mb-4 aspect-[4/3] relative border border-white/5">
                  <img 
  src={DeflectionReductionImg} 
  alt="Deflection Reduction"
  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                </div>
                <span className="text-xs text-[#e9c349] font-mono uppercase tracking-[0.25em] block mb-1">DEFLECTION REDUCTION</span>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-tight">TRIỆT TIÊU ĐỘ BẠT THI ĐẤU</h3>
              </div>
              <p className="text-[12px] text-zinc-400 leading-relaxed font-sans mt-3">
                Ngọn Carbon và ngọn Composite Maxim nén bọt lõi polyurethane giảm tối đa trọng tải đầu ngọn, đưa quỹ đạo gậy đi thẳng đét hoàn toàn không bạt bi.
              </p>
            </div>

            {/* WEATHER RESISTANCE */}
            <div className="bg-zinc-900/40 border border-white/5 p-5 hover:border-[#e9c349]/30 transition-all rounded-xl group flex flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-lg mb-4 aspect-[4/3] relative border border-white/5">
                  <img 
  src={WeatherResistanceImg} 
  alt="Weather Resistance"
  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                </div>
                <span className="text-xs text-[#e9c349] font-mono uppercase tracking-[0.25em] block mb-1">WEATHER RESISTANCE</span>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-tight">CHỐNG CONG VÊNH KHÍ HẬU</h3>
              </div>
              <p className="text-[12px] text-zinc-400 leading-relaxed font-sans mt-3">
                Nói lời tạm biệt việc lau dầu dọn ẩm. Vật liệu composite carbon trơ trước độ ẩm cao và sự thay đổi nóng lạnh thất thường của môi trường nhiệt đới Việt Nam.
              </p>
            </div>

            {/* LIFETIME WARRANTY */}
            <div className="bg-zinc-900/40 border border-white/5 p-5 hover:border-[#e9c349]/30 transition-all rounded-xl group flex flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-lg mb-4 aspect-[4/3] relative border border-white/5">
                  <img 
  src={LifetimeWarrantyImg} 
  alt="Lifetime Warranty"
  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                </div>
                <span className="text-xs text-[#e9c349] font-mono uppercase tracking-[0.25em] block mb-1">LIFETIME WARRANTY</span>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-tight">BẢO HÀNH TOÀN DIỆN CƠ</h3>
              </div>
              <p className="text-[12px] text-zinc-400 leading-relaxed font-sans mt-3">
                Chính sách hậu mãi 5 sao đáng kinh ngạc: Bảo hành 2 năm trục gậy không đứt, nứt, nổ. Cam kết dán đầu tẩy miễn phí 6 tháng tại tất cả chi nhánh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product Showroom Catalogue Store Section */}
      <section id="catalog-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-white/5 pb-6 gap-4">
          <div>
            <span className="text-xs text-[#e9c349] font-mono uppercase tracking-[0.2em] block">AUTHENTIC COLLECTION</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-bold uppercase tracking-tight mt-1">
              Gian Hàng Cơ Bida Carbon Pro
            </h2>
          </div>

          {/* Interactive Categories Pill Filters */}
          <div className="flex flex-wrap gap-2 text-[11px] font-mono">
            {[
              { id: 'all', text: 'TẤT CẢ SẢN PHẨM' },
              { id: 'cue', text: 'GẬY BI-A CARBON' },
              { id: 'shaft', text: 'NGỌN COMPOSITE' },
              { id: 'accessory', text: 'PHỤ KIỆN CAO CẤP' },
              { id: 'blindbag', text: 'TÚI MÙ MAY MẮN' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#e9c349] text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-855'
                }`}
              >
                {cat.text}
              </button>
            ))}
          </div>
        </div>

        {/* Display Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="flex flex-col">
              <ProductCard
                product={prod}
                onSelect={(p) => setSelectedProduct(p)}
                onAddToCart={(p, specs) => handleAddToCart(p, specs)}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-500 font-mono">Bộ sưu tập này đang được cập nhật sản phẩm mới.</p>
          </div>
        )}
      </section>

      {/* 5. Customizer Promotional Banner Action section */}
      <section className="bg-zinc-950 py-16 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 border border-white/10">
            <img
              src={maximPoolPlayer}
              alt="Visualizing cue customizer"
              className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Visual simulation badge */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent flex flex-col justify-end p-8">
              <span className="text-[#e9c349] text-xs font-mono uppercase tracking-[0.2em]">CƠ CHẾ KHOA HỌC</span>
              <p className="font-serif text-xl font-bold text-white mt-1">Cân chỉnh ly ly - Gặt bi chuẩn xác</p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-[#e9c349] text-xs font-mono uppercase tracking-[0.4em] block">VISUAL DESIGNS</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-bold uppercase tracking-tight leading-none">
              Thiết Kế Cơ Bida Theo Cách Của Bạn
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Bạn muốn sở hữu ngọn carbon đen đầm bầm kết hợp bọc quấn da bò sang xịn khâu tay và khắc laser niên hiệu, tên chữ riêng sành điệu? Hãy trải nghiệm công cụ custom trực tuyến thế hệ mới của chúng tôi.
            </p>
            <div className="space-y-2 text-xs font-mono">
              <p className="flex items-center gap-2"><Check className="h-4 w-4 text-[#e9c349]" /> 7 Chuỗi ren kết cấu tương thích mọi loại chuôi gậy</p>
              <p className="flex items-center gap-2"><Check className="h-4 w-4 text-[#e9c349]" /> Hơn 9 mẫu chuôi phong cách độc đáo của Allin</p>
              <p className="flex items-center gap-2"><Check className="h-4 w-4 text-[#e9c349]" /> Khắc laser máy CNC hoàn thành ngay trong 24 giờ</p>
            </div>
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="bg-[#e9c349] text-black font-mono font-bold text-xs py-4 px-8 uppercase tracking-widest hover:bg-white active:scale-95 transition-all w-full sm:w-auto text-center"
            >
              🛠️ THỬ NGAY CÙNG CUSTOMIZER
            </button>
          </div>
        </div>
      </section>

      {/* 6. World-Class Tournaments Partnership & News News section */}
      <section id="news-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#e9c349] text-xs font-mono uppercase tracking-[0.3em] block">TOURNAMENTS & EDUCATION</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight mt-1.5">
            Tin Tức & Kỹ Thuật Bida
          </h2>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-2">Báo chí đưa tin về sự kiện Road To World 99 Allinc2 và chia sẻ bí kíp chọc cơ bách thắng của các huyền thoại.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ARTICLES.map((art) => (
            <div
              key={art.id}
              className="group bg-zinc-950 border border-white/5 overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition"
            >
              <div className="aspect-[16/10] overflow-hidden bg-zinc-900 cursor-pointer" onClick={() => setSelectedNews(art)}>
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono uppercase mb-2">
                    <span>{art.category}</span>
                    <span>{art.date}</span>
                  </div>
                  <h4
                    onClick={() => setSelectedNews(art)}
                    className="font-serif text-[15px] sm:text-[16px] text-white hover:text-[#e9c349] font-bold line-clamp-2 leading-tight cursor-pointer"
                  >
                    {art.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans line-clamp-3 mt-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedNews(art)}
                  className="text-[#e9c349] hover:underline text-[11px] font-mono uppercase tracking-widest text-left pt-2 flex items-center gap-1 group/btn"
                >
                  XEM CHI TIẾT <ArrowRight className="h-3.5 w-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Pro Testimonials Feedback panel */}
      <section className="bg-zinc-950 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#e9c349] text-xs font-mono uppercase tracking-[0.3em] block">SỰ KIỂM CHỨNG TỪ PRO</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight mt-1.5">
              Ý Kiến Các Cơ Thủ Chuyên Nghiệp
            </h2>
            <p className="text-zinc-500 text-xs mt-2">Dòng cơ được sự tin yêu và phê duyệt kiểm hạch của các đấu thủ vô địch quốc gia & Đội tuyển.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-zinc-900/30 border border-white/5 p-8 flex flex-col md:flex-row gap-6 relative"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#e9c349] mx-auto md:mx-0">
                  <img
                    alt={test.name}
                    src={test.avatar}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-3 flex-1 text-center md:text-left">
                  <div className="flex text-[#e9c349] justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#e9c349]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                    "{test.comment}"
                  </p>
                  <div>
                    <h5 className="font-serif text-white text-[14px] font-bold">{test.name}</h5>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5">{test.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Branded Contact Footer */}
      <Footer />

      {/* =======================================================
               DYNAMIC FLOATING OVERLAYS MODALS AND DRAWER SYSTEM
         ======================================================= */}

      {/* Product quick view details display */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, specs) => handleAddToCart(p, specs)}
        />
      )}

      {/* Side Slide-over Shopping Cart */}
      {isCartOpen && (
        <div className="fixed inset-0 z-55 overflow-hidden">
          {/* Backdrop screen grey */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <CartDrawer
            cart={cart}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        </div>
      )}



      {/* Cue Customization Workspace popup */}
      {isCustomizerOpen && (
        <CueCustomizer
          onClose={() => setIsCustomizerOpen(false)}
          onAddToCart={(product, specs) => handleAddToCart(product, specs)}
        />
      )}

      {/* Professional AI consultation smart recommended recommendation form popup */}
      {isConsultOpen && (
        <ConsultForm
          onClose={() => setIsConsultOpen(false)}
          onSelectProduct={(p) => {
            setSelectedProduct(p);
            setIsConsultOpen(false);
          }}
        />
      )}

      {/* News Article Detail modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-55 p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-white/10 w-full max-w-2xl relative p-6 sm:p-8 rounded-none max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-[#e9c349] p-1 bg-zinc-900 border border-transparent hover:border-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="space-y-4">
              <div className="flex gap-2 items-center text-[10px] font-mono text-zinc-500 uppercase">
                <span className="bg-[#e9c349] text-black px-2 py-0.5">{selectedNews.category}</span>
                <span>• ĐĂNG NGÀY: {selectedNews.date}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1 leading-snug">
                {selectedNews.title}
              </h3>
              <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-900 border border-white/5 my-4">
                <img src={selectedNews.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
              </div>
              <p className="text-xs sm:text-sm text-[#e9c349] font-mono uppercase bg-zinc-900 p-3 leading-relaxed">
                "{selectedNews.summary}"
              </p>
              <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans space-y-4 pt-2">
                <p>{selectedNews.content}</p>
                <p>Môn thể thao bida đòi hỏi cao về cả thể chất lẫn tinh thần. Việc sở hữu một cây gậy bida carbon phù hợp từ Allin sẽ giúp bạn hoàn thiện tư thế, thăng hoa kỹ thuật và làm chủ từng đường bóng.</p>
              </div>
              
              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setSelectedNews(null)}
                  className="bg-zinc-900 border border-white/10 px-6 py-2 text-xs font-mono text-zinc-300 hover:text-[#e9c349] hover:border-[#e9c349] transition-all"
                >
                  ĐÓNG NỘI DUNG TẤM BÁO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Floating Chat Tool Widget */}
      <ChatWidget />

    </div>
  );
}
