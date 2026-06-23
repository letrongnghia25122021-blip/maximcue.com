import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, Heart, Shield, HelpCircle, Activity } from 'lucide-react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data';
import maximBilliardLogo from '../assets/images/maxim_billiard_logo_1782206540434.jpg';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onSelectCategory: (category: string) => void;
  onOpenCustomizer: () => void;
  onOpenBlindBag: () => void;
  onOpenConsultation: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function Navbar({
  cart,
  onOpenCart,
  onSelectCategory,
  onOpenCustomizer,
  onOpenBlindBag,
  onOpenConsultation,
  onSelectProduct
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Cart count calculation
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Scroll detection for sticky visual styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live product search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const handleSearchResultClick = (product: Product) => {
    onSelectProduct(product);
    setSearchQuery('');
    setShowSearchResults(false);
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 shadow-2xl border-b border-white/10'
            : 'bg-black/60 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Brand */}
            <div className="flex items-center gap-8">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory('all');
                }}
                className="flex items-center gap-3 group"
              >
                <img
                  alt="Maxim Billiard Logo"
                  className="h-10 w-auto object-contain brightness-100 group-hover:scale-105 transition-transform duration-300"
                  src={maximBilliardLogo}
                />
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#e5e2e1] group-hover:text-[#e9c349] transition-colors leading-none">
                  MAXIM <span className="text-xs block font-sans tracking-[0.4em] text-[#e9c349] mt-1">BILLIARD</span>
                </span>
              </a>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center space-x-6">
                <button
                  onClick={() => onSelectCategory('all')}
                  className="text-white hover:text-[#e9c349] px-2 py-1 text-xs uppercase tracking-widest font-mono font-medium transition-colors"
                >
                  Sản Phẩm
                </button>
                <button
                  onClick={() => onSelectCategory('cue')}
                  className="text-on-surface/80 hover:text-[#e9c349] px-2 py-1 text-xs uppercase tracking-widest font-mono font-medium transition-colors"
                >
                  Gậy Bi-A
                </button>
                <button
                  onClick={() => onSelectCategory('shaft')}
                  className="text-on-surface/80 hover:text-[#e9c349] px-2 py-1 text-xs uppercase tracking-widest font-mono font-medium transition-colors"
                >
                  Ngọn Bi-A
                </button>
                <button
                  onClick={() => onSelectCategory('accessory')}
                  className="text-on-surface/80 hover:text-[#e9c349] px-2 py-1 text-xs uppercase tracking-widest font-mono font-medium transition-colors"
                >
                  Phụ Kiện
                </button>
                <button
                  onClick={onOpenCustomizer}
                  className="text-[#e9c349] hover:bg-[#e9c349]/10 px-3 py-1 text-xs uppercase tracking-widest font-mono font-semibold border border-[#e9c349]/30 rounded-none transition-all"
                >
                  Tự Thiết Kế ⚙️
                </button>
                <button
                  onClick={onOpenBlindBag}
                  className="text-purple-400 hover:text-purple-300 px-2 py-1 text-xs uppercase tracking-widest font-mono font-medium transition-colors"
                >
                  Game Túi Mù 🎁
                </button>
                <button
                  onClick={onOpenConsultation}
                  className="text-blue-400 hover:text-blue-300 px-2 py-1 text-xs uppercase tracking-widest font-mono font-medium transition-colors"
                >
                  Tư Vấn Cơ 🤔
                </button>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Dynamic Search Bar */}
              <div className="relative hidden md:block w-48 lg:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-on-surface/50" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm gậy, ngọn composite..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  className="bg-zinc-900/80 border border-white/10 rounded-none text-xs w-full pl-10 pr-3 py-2 text-white placeholder-on-surface/40 focus:outline-none focus:border-[#e9c349] focus:ring-1 focus:ring-[#e9c349] transition-all"
                />

                {/* Autocomplete Search Results */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute right-0 mt-2 w-80 bg-zinc-950 border border-white/10 max-h-96 overflow-y-auto z-50">
                    <div className="p-2 border-b border-white/10 text-[10px] text-zinc-400 uppercase tracking-widest">
                      Kết quả tìm kiếm ({searchResults.length})
                    </div>
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSearchResultClick(product)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-zinc-900 border-b border-white/5 text-left transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 object-cover border border-white/5"
                        />
                        <div>
                          <p className="text-xs font-semibold text-white line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#e9c349] font-mono mt-0.5">
                            {product.price.toLocaleString('vi-VN')}₫
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {showSearchResults && searchQuery.trim() !== '' && searchResults.length === 0 && (
                  <div className="absolute right-0 mt-2 w-80 bg-zinc-950 border border-white/10 p-4 text-center z-50">
                    <p className="text-xs text-zinc-400">Không tìm thấy sản phẩm nào.</p>
                  </div>
                )}
              </div>

              {/* Mini Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2 text-[#e5e2e1] hover:text-[#e9c349] transition-transform duration-300 transform active:scale-95 cursor-pointer"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#e9c349] text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center font-mono">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-[#e5e2e1] hover:text-[#e9c349]"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden bg-zinc-950/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
            {/* Search query inside mobile menu */}
            <div className="relative w-full mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-on-surface/50" />
              <input
                type="text"
                placeholder="Tìm gậy, ngọn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900 border border-white/10 rounded-none w-full text-xs pl-10 pr-3 py-2 text-white focus:outline-none"
              />
              {searchResults.length > 0 && searchQuery !== '' && (
                <div className="absolute left-0 right-0 mt-1 bg-zinc-900 border border-white/15 z-50 max-h-48 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearchResultClick(product)}
                      className="w-full flex items-center gap-3 p-2 hover:bg-zinc-800 text-left border-b border-white/5"
                    >
                      <img src={product.image} className="h-8 w-8 object-cover" alt="" />
                      <div>
                        <p className="text-[11px] text-white font-medium line-clamp-1">{product.name}</p>
                        <p className="text-[11.5px] text-[#e9c349] font-mono">{product.price.toLocaleString('vi-VN')}₫</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                onSelectCategory('all');
                setIsOpen(false);
              }}
              className="block w-full text-left text-on-surface/80 hover:text-[#e9c349] text-xs font-mono uppercase tracking-widest py-2"
            >
              BST Toàn Bộ
            </button>
            <button
              onClick={() => {
                onSelectCategory('cue');
                setIsOpen(false);
              }}
              className="block w-full text-left text-on-surface/80 hover:text-[#e9c349] text-xs font-mono uppercase tracking-widest py-2"
            >
              Gậy Carbon Đấu
            </button>
            <button
              onClick={() => {
                onSelectCategory('shaft');
                setIsOpen(false);
              }}
              className="block w-full text-left text-on-surface/80 hover:text-[#e9c349] text-xs font-mono uppercase tracking-widest py-2"
            >
              Ngọn Công Nghệ
            </button>
            <button
              onClick={() => {
                onSelectCategory('accessory');
                setIsOpen(false);
              }}
              className="block w-full text-left text-on-surface/80 hover:text-[#e9c349] text-xs font-mono uppercase tracking-widest py-2"
            >
              Phụ Kiện Cao Cấp
            </button>
            <div className="pt-2 border-t border-white/5 space-y-2">
              <button
                onClick={() => {
                  onOpenCustomizer();
                  setIsOpen(false);
                }}
                className="w-full text-center bg-[#e9c349] text-black text-xs font-mono font-bold py-3 uppercase tracking-wider"
              >
                Tự Thiết Kế Cơ 🛠️
              </button>
              <button
                onClick={() => {
                  onOpenBlindBag();
                  setIsOpen(false);
                }}
                className="w-full text-center bg-purple-700 hover:bg-purple-600 text-white text-xs font-mono py-3 uppercase tracking-wider"
              >
                Trải Nghiệm Xé Túi Mù 🎁
              </button>
              <button
                onClick={() => {
                  onOpenConsultation();
                  setIsOpen(false);
                }}
                className="w-full text-center bg-blue-700 text-white text-xs font-mono py-3 uppercase tracking-wider"
              >
                Đặt Lịch Tư Vấn Cơ 🤔
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay for search */}
      {showSearchResults && searchQuery.trim() !== '' && (
        <div
          className="fixed inset-0 bg-black/40 z-30 pointer-events-auto"
          onClick={() => setShowSearchResults(false)}
        />
      )}
    </>
  );
}
