import React, { useState } from 'react';
import { X, Sparkles, AlertCircle, RefreshCw, Gift, HelpCircle, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface BlindBagModalProps {
  onClose: () => void;
  onAddToCart: (product: Product, selectedSpecs?: any) => void;
}

interface Prize {
  name: string;
  rarity: 'COMMON' | 'RARE' | 'MYTHIC' | 'ULTRA-CUSTOM';
  color: string;
  realPrice: number;
  productEquivalent: Product | null;
  image: string;
  desc: string;
}

const PRIZES: Prize[] = [
  {
    name: 'Găng Tay Bida Allin Falcon Cao Cấp',
    rarity: 'COMMON',
    color: 'text-zinc-400 border-zinc-500/10 bg-zinc-950',
    realPrice: 180000,
    productEquivalent: PRODUCTS.find(p => p.id === 'allin-skylight-glove') || null,
    image: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=400',
    desc: 'Bản thun Lycra ôm khử mồ hôi êm ái.'
  },
  {
    name: 'Ngọn Composite 5/16/18 High-Performance',
    rarity: 'RARE',
    color: 'text-blue-400 border-blue-500/20 bg-blue-950/20',
    realPrice: 600000,
    productEquivalent: PRODUCTS.find(p => p.id === 'ngon-composite-5-16-18') || null,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuTsSJCxV70R4XYwmUW6J2_kbinCBpc6cmw3lSMLt6uazxamHv0civ6UfQJFR2xKckpVyPGIfJFRAlsNxu4LF_dCG3gMKrkTIurUKyfV_my4Xy0MRDfXYTwTB9bN5pUjk_Kd4QG53AYO5DyiVEyGTInuv937XCBauBzOlEPbqZV2OUzaUxa2yUyUVIk2i1-LlwvbmPsWNzp7WvC41ycSq9i7VhlWX3GzlHs9w6meXnSjuIEeMx-O-Ao_Qc',
    desc: 'Lõi Polyurethane siêu giảm triệt tiêu bạt lệch hướng.'
  },
  {
    name: 'Bao Da Đựng Cơ Allin Skylight Capsule',
    rarity: 'RARE',
    color: 'text-blue-400 border-blue-500/20 bg-blue-950/20',
    realPrice: 1650000,
    productEquivalent: PRODUCTS.find(p => p.id === 'allin-luxury-case') || null,
    image: 'https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?auto=format&fit=crop&q=80&w=400',
    desc: 'Thiết kế xám lông chuột sang chảnh chống va đập tuyệt đỉnh.'
  },
  {
    name: 'Allin Poker bản Tay trơn Elite',
    rarity: 'MYTHIC',
    color: 'text-purple-400 border-purple-500/30 bg-purple-950/30',
    realPrice: 2250000,
    productEquivalent: PRODUCTS.find(p => p.id === 'allin-poker-tay-tron') || null,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLujjsOS0mD1f0k2tjMJIHalZOJSs9mmHxzBnH16EKJgHm8qHd53T-zLsh45MoQ3JxjSRiYdRydkJaaOnJLmwEYmhII1MAk1Qd4qYWRELpvcpCQoSI2rh-saLK3K_TCZOikgUbDkzvEG98z3D-jXughz1vZy6jdyMcfqHc6ScrmPcFTMJpSiaejDqpUwL0XeXI_m1ttugwhua0ku1m6HepHszKQU6jXbRmWLjfSuPU4yVHT2OACll-cgYA',
    desc: 'Bản chuoi dải phản quang Poker siêu độc sành điệu.'
  },
  {
    name: 'Allin Age Carbon Premium 12.4mm',
    rarity: 'MYTHIC',
    color: 'text-purple-400 border-purple-500/30 bg-purple-950/30',
    realPrice: 7990000,
    productEquivalent: PRODUCTS.find(p => p.id === 'allin-age-carbon') || null,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuNOb32Sl4RmnXS64SDGe1reG3BPKMEWaEjgArWTif8XEXBvGO0zOa7YB2jNRVOC26lGOREuopmcc8RXbWWqogi98FBvAugUGonpMasw7IbN1XbXdphVheeyaoVrGHQIOw1sZNfkKzN6uZeiVnKX1LCn0BMKwORzpdM3690c2sFtbN-lp2OAF7OAdXuVvjyafLrYi01ZxtqiCn-MUeI21O4HJDx_1GeIsqdcITgKuYBvpi2iFdoirYdK-M',
    desc: 'Trục ngọn sợi Carbon bách đấu, thẳng đét chống cong vênh méo dập.'
  },
  {
    name: 'CƠ CARBON ALLIN CUSTOM ROAD-TO-WORLD 57M',
    rarity: 'ULTRA-CUSTOM',
    color: 'text-amber-400 border-amber-500/40 bg-gradient-to-r from-amber-950/20 to-zinc-950/40',
    realPrice: 57000000,
    productEquivalent: PRODUCTS.find(p => p.id === 'allin-age-carbon') || null, // fallback cue
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvrRIo7d5b-CHDMBXUlJjlYLQVJDM-zSx7uoZNkZg35HX-GLUD01SzelcAffiQAizlpgX8lUlnFZ2DeFWv3wnVRZXRJTG_ir1xwgnKWc-6xQmrvfe1TzXeJE2mLd0BKsJX1nkkmXw3uzx1-z0w5xK0XyHSxzP7x8bYKBCYIAlM3feQ9fFMr6LWY3waNTD3XdL5sLrXYt1hWX1YwSXwcdD-3hig3T58aFPdnfSwaVBUeoEazRhc33NXy8Aw',
    desc: 'Siêu phẩm khảm xà cừ, cẩm lai, ngọn full-carbon phủ titan tinh xảo phiên bản độc bản trị giá 57 triệu!'
  }
];

export default function BlindBagModal({ onClose, onAddToCart }: BlindBagModalProps) {
  const [gameState, setGameState] = useState<'IDLE' | 'SHAKING' | 'OPENING' | 'REVEALED'>('IDLE');
  const [selectedBagId, setSelectedBagId] = useState<number | null>(null);
  const [revealPrize, setRevealPrize] = useState<Prize | null>(null);
  const [hasAddedToCart, setHasAddedToCart] = useState(false);

  const startTear = (bagId: number) => {
    setSelectedBagId(bagId);
    setGameState('SHAKING');
    setHasAddedToCart(false);

    // Pick random prize based on weighted probability
    const rand = Math.random() * 100;
    let prize: Prize;
    if (rand < 50) {
      // 50% chance Common
      prize = PRIZES[0];
    } else if (rand < 75) {
      // 25% chance Rare (Ngọn Composite hoặc Bao da)
      prize = Math.random() > 0.5 ? PRIZES[1] : PRIZES[2];
    } else if (rand < 95) {
      // 20% chance Mythic (Poker hoặc Age)
      prize = Math.random() > 0.5 ? PRIZES[3] : PRIZES[4];
    } else {
      // 5% chance Super Ultra custom 57 Million
      prize = PRIZES[5];
    }

    setTimeout(() => {
      setGameState('OPENING');
      setTimeout(() => {
        setRevealPrize(prize);
        setGameState('REVEALED');
      }, 1500);
    }, 1800);
  };

  const handleClaimPrize = () => {
    if (!revealPrize) return;
    const item = revealPrize.productEquivalent || PRODUCTS[0];
    onAddToCart(item);
    setHasAddedToCart(true);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-55 p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-white/10 w-full max-w-2xl relative p-6 sm:p-8 overflow-hidden">
        {/* Sparkles background décor */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-[#e9c349] p-1 bg-zinc-900 border border-transparent hover:border-white/10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="bg-purple-950 text-purple-400 border border-purple-800/30 px-3 py-1 text-[10px] font-mono font-bold tracking-[0.2em] rounded-full">
            ALLIN CUE × MYSTERY BAG
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider mt-3">
            Xé Túi Mù Trúng Cơ Khủng
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed">
            Mỗi túi mù có giá <strong className="text-[#e9c349]">1.990.000₫</strong>. Cam kết 100% mở ra quà tương đương hoặc vượt giá trị, đặc quyền trúng cơ carbon 57 triệu cực đỉnh!
          </p>
        </div>

        {gameState === 'IDLE' && (
          /* IDLE State: Pick a Box */
          <div className="space-y-6">
            <h4 className="text-xs text-zinc-400 font-mono tracking-widest uppercase text-center">
              Bước 1: Chọn một túi quà truyền kỳ bên dưới để xé:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { id: 1, name: 'Sứ Giả Hoàng Đạo', color: 'from-blue-600 to-indigo-800 border-blue-500/40' },
                { id: 2, name: 'Tinh Vân Huyền Bí', color: 'from-purple-600 to-pink-800 border-purple-500/40' },
                { id: 3, name: 'Chiến Thần Bạch Hổ', color: 'from-amber-600 to-yellow-800 border-amber-500/40' },
                { id: 4, name: 'Hố Đen Sâu Thẳm', color: 'from-zinc-700 to-zinc-900 border-zinc-500/40' }
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => startTear(b.id)}
                  className="group bg-zinc-900 border border-white/5 p-4 text-center hover:border-[#e9c349] transition-all relative cursor-pointer"
                >
                  <div className={`w-full aspect-[3/4] bg-gradient-to-tr ${b.color} flex flex-col justify-center items-center shadow-inner relative overflow-hidden group-hover:scale-[1.03] transition-transform`}>
                    <div className="absolute inset-0 bg-black/20 opacity-40" />
                    <HelpCircle className="h-10 w-10 text-white animate-pulse relative z-10" />
                    <span className="text-[10px] text-white/40 block mt-2 z-10 font-mono">SEALED BAG</span>
                  </div>
                  <h5 className="text-[11px] text-[#e5e2e1] uppercase mt-3 font-mono font-bold tracking-tight">
                    {b.name}
                  </h5>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-zinc-900/60 p-3 border border-white/5 text-[11px] text-zinc-400 font-mono max-w-md mx-auto justify-center">
              <AlertCircle className="h-4 w-4 text-[#e9c349] flex-shrink-0" />
              <span>Cơ cấu giải thưởng hoàn toàn minh bạch, hệ thống ngẫu nhiên công bằng.</span>
            </div>
          </div>
        )}

        {gameState === 'SHAKING' && (
          /* SHAKING State: Anticipation Shaking box */
          <div className="py-12 flex flex-col items-center justify-center space-y-6">
            <div className="relative animate-[spin_1.5s_ease-in-out_infinite] scale-110">
              <div className="w-28 h-28 bg-gradient-to-tr from-[#e9c349] to-amber-700 border-2 border-white/20 shadow-2xl flex items-center justify-center p-3 animate-[pulse_1s_infinite]">
                <Gift className="h-14 w-14 text-black" />
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-mono uppercase tracking-[0.25em] animate-pulse">
              Đang xáo trộn & Niêm phong bao bì...
            </p>
          </div>
        )}

        {gameState === 'OPENING' && (
          /* OPENING State: tearing wrap */
          <div className="py-12 flex flex-col items-center justify-center space-y-6">
            <div className="w-full max-w-sm h-6 bg-zinc-900 border border-white/10 p-0.5 rounded-full overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-0 bg-[#e9c349] animate-[width_1.5s_ease-out_forwards]" style={{ width: '100%' }} />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-mono uppercase tracking-widest z-10">
                Đang Xé rách bao bì túi mù...
              </span>
            </div>
            <p className="text-zinc-500 text-xs italic">Cơ hội trúng chiếc Carbon Allin 57M đang cực kỳ cao!</p>
          </div>
        )}

        {gameState === 'REVEALED' && revealPrize && (
          /* REVEALED State: prize presented */
          <div className="text-center space-y-6 max-w-md mx-auto py-4">
            <p className="text-xs font-mono text-[#e9c349] uppercase tracking-[0.3em]">
              🎉 MỞ TÚI THÀNH CÔNG! 🎉
            </p>

            {/* Glowing Reward Container Item card */}
            <div className={`p-6 border rounded-none shadow-2xl space-y-4 ${revealPrize.color} animate-fade-in`}>
              <div className="aspect-square w-36 h-36 mx-auto bg-zinc-900 border border-white/10 overflow-hidden relative">
                <img
                  src={revealPrize.image}
                  alt={revealPrize.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <span className="text-[10px] bg-red-950 text-red-400 border border-red-800/30 px-2.5 py-0.5 font-bold font-mono rounded-full uppercase tracking-wider">
                  {revealPrize.rarity}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-1.5 leading-tight">
                  {revealPrize.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 font-sans italic">
                  "{revealPrize.desc}"
                </p>
                <p className="text-xs font-mono text-[#e9c349] mt-3">
                  Giá bán lẻ thực tế: <strong className="text-sm">{revealPrize.realPrice.toLocaleString('vi-VN')}₫</strong>
                </p>
              </div>
            </div>

            {/* Quick action buttons claim and retry */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {hasAddedToCart ? (
                <div className="w-full bg-emerald-950 border border-emerald-500/20 text-emerald-400 text-xs py-3 font-mono uppercase tracking-widest">
                  ✓ Đã nhận quà tặng bỏ vào giỏ hàng!
                </div>
              ) : (
                <button
                  onClick={handleClaimPrize}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs py-4 uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" /> NHẬN THƯỞNG VÀO GIỎ
                </button>
              )}
              <button
                onClick={() => setGameState('IDLE')}
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-mono text-xs py-4 uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" /> CHƠI LẠI VÁN MỚI
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
