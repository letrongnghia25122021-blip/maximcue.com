import React, { useState } from 'react';
import { X, Sparkles, Check, Heart, HelpCircle, ShieldAlert, Award, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface CueCustomizerProps {
  onClose: () => void;
  onAddToCart: (product: Product, selectedSpecs?: any) => void;
}

export default function CueCustomizer({ onClose, onAddToCart }: CueCustomizerProps) {
  // Custom states
  const [shaft, setShaft] = useState('Allin Pro Carbon 12.4mm');
  const [butt, setButt] = useState('Onyx Black Poker 3D');
  const [wrap, setWrap] = useState('Tay trơn bóng Nano');
  const [joint, setJoint] = useState('Uni-loc Radial Pin');
  const [engraving, setEngraving] = useState('');
  const [added, setAdded] = useState(false);

  // Specifications metadata
  const ShaftOptions = [
    { name: 'Allin Pro Carbon 12.4mm', price: 2500000, desc: 'Độ thẳng thắt, chống cong tắp 99.9%' },
    { name: 'Ngọn Composite Low Deflection', price: 900000, desc: 'Lõi đặc triệt giảm bạt sấp bóng cực tốt' },
    { name: 'Gỗ Thích Hardrock Maple 13mm', price: 400000, desc: 'Gỗ phong sấy khô Bắc Mỹ cổ điển' }
  ];

  const ButtOptions = [
    { name: 'Onyx Black Poker 3D', color: 'bg-black', price: 0, desc: 'Đen tuyền phản quang phong cách tối giản' },
    { name: 'Golden Royal Phoenix', color: 'bg-gradient-to-r from-amber-600 to-yellow-500', price: 1200000, desc: 'Chuôi gỗ mun tuyển chọn khảm họa tiết Phượng Hoàng Vàng' },
    { name: 'Nebula Space Chameleon', color: 'bg-gradient-to-r from-purple-700 via-blue-800 to-indigo-900', price: 800000, desc: 'Sơn dải màu vũ trụ lung linh đổi màu theo ánh sáng' }
  ];

  const WrapOptions = [
    { name: 'Tay trơn bóng Nano', price: 0, desc: 'Khoe trọn nét đẹp tự nhiên của thớ gỗ' },
    { name: 'Quấn da bò cao cấp khâu chéo', price: 1100000, desc: 'Cầm ôm tay chắc chắn, tăng cảm giác tự tin' },
    { name: 'Quấn chỉ Linen Ireland mịn', price: 400000, desc: 'Hút mồ hôi tối đa cho người hay ra mồ hôi tay' }
  ];

  const JointOptions = [
    { name: 'Uni-loc Radial Pin', price: 0 },
    { name: 'Ren 5/16/18 Steel Joint', price: 150000 },
    { name: 'Ren 3/8/10 Quick Release', price: 200000 }
  ];

  // Price calculations
  const basePrice = 3500000;
  const shaftExtra = ShaftOptions.find(o => o.name === shaft)?.price || 0;
  const buttExtra = ButtOptions.find(o => o.name === butt)?.price || 0;
  const wrapExtra = WrapOptions.find(o => o.name === wrap)?.price || 0;
  const jointExtra = JointOptions.find(o => o.name === joint)?.price || 0;
  const engravingExtra = engraving.trim() !== '' ? 150000 : 0;
  const totalPrice = basePrice + shaftExtra + buttExtra + wrapExtra + jointExtra + engravingExtra;

  // Custom visual representation build
  const getShaftVisualColor = () => {
    if (shaft.includes('Carbon')) return 'bg-zinc-800 border-zinc-700';
    if (shaft.includes('Composite')) return 'bg-zinc-400 border-zinc-350';
    return 'bg-amber-100 border-amber-200';
  };

  const getButtVisualClass = () => {
    const active = ButtOptions.find(o => o.name === butt);
    return active ? active.color : 'bg-zinc-900';
  };

  const getWrapVisualTexture = () => {
    if (wrap.includes('da bò')) return 'repeating-linear-gradient border-amber-900 opacity-90 pattern-leather';
    if (wrap.includes('chỉ Linen')) return 'bg-zinc-700 border-zinc-650 opacity-90 pattern-weave';
    return 'bg-zinc-950/20';
  };

  const handleAddCustToCart = () => {
    // Pack options as custom product
    const customProductPlaceholder: Product = {
      id: `custom-cue-${Date.now()}`,
      name: `Cơ Bida Custom - ${engraving || 'Độc Bản Maxim'}`,
      price: totalPrice,
      rating: 5,
      salesCount: 1,
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLujjsOS0mD1f0k2tjMJIHalZOJSs9mmHxzBnH16EKJgHm8qHd53T-zLsh45MoQ3JxjSRiYdRydkJaaOnJLmwEYmhII1MAk1Qd4qYWRELpvcpCQoSI2rh-saLK3K_TCZOikgUbDkzvEG98z3D-jXughz1vZy6jdyMcfqHc6ScrmPcFTMJpSiaejDqpUwL0XeXI_m1ttugwhua0ku1m6HepHszKQU6jXbRmWLjfSuPU4yVHT2OACll-cgYA',
      gallery: [],
      category: 'cue',
      description: `Cá nhân hóa cơ bida Allin phiên bản đặc biệt. Ngọn: ${shaft}. Chuôi: ${butt}. Tay quấn: ${wrap}. Đầu ren: ${joint}. Khắc chữ laser: "${engraving || 'Trơn'}"`,
      specs: {
        'Ngọn cơ': shaft,
        'Chuôi cơ': butt,
        'Grip bao quấn': wrap,
        'Ren kết nối': joint,
        'Chạm Laser riêng': engraving || 'Không khắc'
      },
      reviews: []
    };

    onAddToCart(customProductPlaceholder);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-55 p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-white/10 w-full max-w-5xl relative p-6 sm:p-8 flex flex-col lg:flex-row h-[90vh] lg:h-auto overflow-y-auto gap-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-[#e9c349] p-1 bg-zinc-900 border border-transparent hover:border-white/10 z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* LEFT COMPONENT: STUNNING REAL-TIME GRAPHIC PREVIEW */}
        <div className="w-full lg:w-2/5 bg-zinc-900/40 border border-white/5 p-6 flex flex-col justify-between items-center relative min-h-[350px]">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest text-center block">RENDER 3D SHAPE VIEW</span>
            <p className="text-white font-serif text-center text-sm font-semibold tracking-wide mt-1">Cơ Bản Thiết Kế Độc Bản</p>
          </div>

          {/* SKELETON RENDER */}
          <div className="relative w-full h-48 flex items-center justify-center py-6">
            {/* Visual cue rendered horizontally */}
            <div className="flex items-center w-4/5 h-8 bg-black/40 border border-white/5 rounded-none p-1 relative overflow-visible">
              
              {/* Tip layer */}
              <div className="h-4 w-1.5 bg-amber-700/80 rounded-l border border-l-black absolute left-0" title="Nhựa Phíp" />
              <div className="h-4 w-1 bg-blue-500 rounded-l absolute left-1.5" title="Đầu tẩy da heo" />
              
              {/* Shaft Layer (Carbon/Composite/Gỗ) */}
              <div className={`h-4 w-1/2 absolute left-2.5 transition-all duration-300 border-y ${getShaftVisualColor()}`} title={`Ngọn: ${shaft}`}>
                <span className="absolute inset-0 flex items-center justify-center text-[7px] text-white/20 font-mono tracking-widest">SHAFT</span>
              </div>

              {/* Joint Collar Ring */}
              <div className="h-5 w-3 bg-zinc-300 border border-zinc-400 absolute left-[calc(2.5px+50%)] z-10 font-mono text-[6px] text-zinc-900 flex items-center justify-center font-bold" title={`Ren: ${joint}`}>
                J
              </div>

              {/* Grip Wrap Option Layer */}
              <div className={`h-4 w-1/4 absolute left-[calc(14.5px+50%)] border-y bg-zinc-800 transition-all duration-300 ${getWrapVisualTexture()}`} title={`Tay Quấn: ${wrap}`}>
                <span className="absolute inset-0 flex items-center justify-center text-[7px] text-white/30 font-mono tracking-widest">GRIP</span>
              </div>

              {/* Butt Material Option Layer */}
              <div className={`h-5 w-1/8 rounded-r absolute right-0 transition-all duration-300 border-y border-r ${getButtVisualClass()}`} title={`Chuôi: ${butt}`}>
                <span className="absolute inset-0 flex items-center justify-center text-[7px] text-zinc-100/50 font-mono">BUTT</span>

                {/* Laser text simulation overlay */}
                {engraving.trim() !== '' && (
                  <span className="absolute top-[8px] right-2 transform rotate-12 text-[7px] text-[#e9c349] font-mono whitespace-nowrap bg-black/60 px-0.5 pointer-events-none lowercase">
                    {engraving.slice(0, 10)}
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* Spec values indicators */}
          <div className="w-full text-xs font-mono space-y-1 bg-zinc-950 p-4 border border-white/5">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-1">Chi tiết kết cấu:</p>
            <p className="truncate"><span className="text-zinc-500">Ngọn:</span> <span className="text-white">{shaft}</span></p>
            <p className="truncate"><span className="text-zinc-500">Chuôi:</span> <span className="text-white">{butt}</span></p>
            <p className="truncate"><span className="text-zinc-500">Bọc Grip:</span> <span className="text-white">{wrap}</span></p>
            <p className="truncate"><span className="text-zinc-500">Ren:</span> <span className="text-white">{joint}</span></p>
            {engraving.trim() !== '' && <p><span className="text-zinc-500">Khắc Laser:</span> <span className="text-[#e9c349]">"{engraving}"</span></p>}
          </div>
        </div>

        {/* RIGHT COMPONENT: INTERACTIVE CONFIGURATIONS PAIN */}
        <div className="w-full lg:w-3/5 flex flex-col justify-between max-h-[75vh] pr-2">
          
          <div className="space-y-6 overflow-y-auto">
            <div>
              <span className="text-xs text-[#e9c349] font-mono uppercase tracking-widest">REAL-TIME CUSTOMIZER</span>
              <h2 className="font-serif text-2xl font-bold text-white uppercase mt-1">Cá Nhân Hóa Cơ Bida Cao Cấp</h2>
              <p className="text-xs text-zinc-400 mt-2">Tính năng độc quyền cho phép bạn tinh chế từ ngọn Carbon đến hoa văn chuôi và khắc tên độc bản để gặt hái thành công trên mọi bàn Pool.</p>
            </div>

            {/* 1. Shaft custom option */}
            <div className="space-y-3">
              <h5 className="text-xs text-zinc-400 font-mono uppercase tracking-wider border-l-2 border-[#e9c349] pl-2">
                1. Lựa Chọn Ngọn Công Nghệ
              </h5>
              <div className="grid grid-cols-1 gap-2">
                {ShaftOptions.map((o) => (
                  <button
                    key={o.name}
                    onClick={() => setShaft(o.name)}
                    className={`p-3 text-left border flex justify-between items-center transition-all ${
                      shaft === o.name
                        ? 'border-[#e9c349] bg-[#e9c349]/5'
                        : 'border-white/5 bg-zinc-900/40 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-xs text-white font-bold block">{o.name}</span>
                      <span className="text-[10px] text-zinc-400 font-sans block">{o.desc}</span>
                    </div>
                    <span className="text-xs text-[#e9c349] font-mono">
                      {o.price === 0 ? 'Mặc định' : `+${o.price.toLocaleString('vi-VN')}₫`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Butt custom option */}
            <div className="space-y-3">
              <h5 className="text-xs text-zinc-400 font-mono uppercase tracking-wider border-l-2 border-[#e9c349] pl-2">
                2. Vật Liệu & Họa Tiết Chuôi Gỗ
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {ButtOptions.map((o) => (
                  <button
                    key={o.name}
                    onClick={() => setButt(o.name)}
                    className={`p-3 text-left border flex flex-col justify-between transition-all aspect-[5/3] sm:aspect-square ${
                      butt === o.name
                        ? 'border-[#e9c349] bg-[#e9c349]/5'
                        : 'border-white/5 bg-zinc-900/40 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className={`h-4 w-4 rounded-full ${o.color} border border-white/20`} />
                      <span className="text-[10px] text-[#e9c349] font-mono font-bold">
                        {o.price === 0 ? 'Mặc định' : `+${o.price.toLocaleString('vi-VN')}₫`}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block mt-2">{o.name}</span>
                      <span className="text-[9px] text-zinc-400 font-sans line-clamp-2 mt-1 leading-snug">{o.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Wrap option */}
            <div className="space-y-3">
              <h5 className="text-xs text-zinc-400 font-mono uppercase tracking-wider border-l-2 border-[#e9c349] pl-2">
                3. Tay Quấn Grip Cầm Cơ
              </h5>
              <div className="grid grid-cols-1 gap-2">
                {WrapOptions.map((o) => (
                  <button
                    key={o.name}
                    onClick={() => setWrap(o.name)}
                    className={`p-3 text-left border flex justify-between items-center transition-all ${
                      wrap === o.name
                        ? 'border-[#e9c349] bg-[#e9c349]/5'
                        : 'border-white/5 bg-zinc-900/40 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="text-xs text-white font-bold block">{o.name}</span>
                      <span className="text-[10px] text-zinc-400 font-sans block">{o.desc}</span>
                    </div>
                    <span className="text-xs text-[#e9c349] font-mono">
                      {o.price === 0 ? 'Mặc định' : `+${o.price.toLocaleString('vi-VN')}₫`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Engraving option */}
            <div className="space-y-3">
              <h5 className="text-xs text-zinc-400 font-mono uppercase tracking-wider border-l-2 border-[#e9c349] pl-2">
                4. Cá Nhân Hóa Khắc Chữ Laser (+150.000₫)
              </h5>
              <div className="bg-zinc-900/50 p-4 border border-white/5 space-y-2">
                <input
                  type="text"
                  maxLength={18}
                  placeholder="Ví dụ: NGUYENDUONG, KHANH POOL..."
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                  className="w-full bg-zinc-950 border border-white/10 p-3 text-xs text-[#e9c349] focus:outline-none placeholder-zinc-650 font-mono uppercase"
                />
                <p className="text-[10px] text-zinc-500 italic">Khắc tối đa 18 ký tự không dấu. Chữ sẽ được chạm khắc tinh khiết bằng máy laser Đức chìm dưới chuôi gỗ cơ.</p>
              </div>
            </div>
          </div>

          {/* BOTTOM TOTAL PRICE & EXPORT ADD TO FOOTER CART */}
          <div className="border-t border-white/10 pt-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-[10px] text-zinc-500 font-mono uppercase block">Ước tính giá trị:</span>
                <span className="text-2xl font-mono text-[#e9c349] font-bold">
                  {totalPrice.toLocaleString('vi-VN')}₫
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-950/20 border border-emerald-500/10 px-3 py-1 font-mono uppercase">
                <Award className="h-4 w-4" />
                <span>Hoàn thiện và kiểm hạch 5 sao</span>
              </div>
            </div>

            {added && (
              <div className="mb-3 p-2 bg-emerald-950 border border-emerald-500/20 text-emerald-400 text-xs text-center font-mono uppercase">
                ✓ Thiết kế cơ bida độc bản đã được thêm vào giỏ hàng!
              </div>
            )}

            <button
              onClick={handleAddCustToCart}
              className="w-full bg-[#e9c349] text-black font-mono font-bold text-xs py-4 uppercase tracking-widest hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" /> ĐẶT MUA CƠ TỰ THIẾT KẾ
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}
