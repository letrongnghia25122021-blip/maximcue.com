import React, { useState } from 'react';
import { X, HelpCircle, Check, Sparkles, User, Target, CircleDollarSign } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ConsultFormProps {
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function ConsultForm({ onClose, onSelectProduct }: ConsultFormProps) {
  // Step responses
  const [level, setLevel] = useState('Beginner');
  const [discipline, setDiscipline] = useState('Pool');
  const [style, setStyle] = useState('All-round');
  const [budget, setBudget] = useState('Mid');
  const [recommendation, setRecommendation] = useState<Product | null>(null);

  const calculateRecommendation = (e: React.FormEvent) => {
    e.preventDefault();

    let matched: Product;

    // Smart logic mapping to store inventory
    if (budget === 'Low') {
      // Return ngọn composite (600,000₫)
      matched = PRODUCTS.find((p) => p.id === 'ngon-composite-5-16-18') || PRODUCTS[2];
    } else if (budget === 'High') {
      // Premium Carbon Cue (7,990,000₫)
      matched = PRODUCTS.find((p) => p.id === 'allin-age-carbon') || PRODUCTS[1];
    } else {
      // Mid budget (1M to 5M)
      if (style === 'Aggressive') {
        // Poker Elite black
        matched = PRODUCTS.find((p) => p.id === 'allin-poker-tay-tron') || PRODUCTS[3];
      } else {
        // Recommend Blindbag or Case
        matched = PRODUCTS.find((p) => p.id === 'tui-mu-allin-cue') || PRODUCTS[0];
      }
    }

    setRecommendation(matched);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-55 p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-white/10 w-full max-w-xl relative p-6 sm:p-8 rounded-none">
        
        {/* Close trigger */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-[#e9c349] p-1 bg-zinc-900 border border-transparent hover:border-white/10 z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Section Header */}
        <div className="text-center mb-6">
          <span className="text-[#e9c349] text-xs font-mono uppercase tracking-[0.2em] block">ROUTINE ANALYSIS</span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase mt-1">Cơ Chế Tư Vấn Chọn Cơ Tối Ưu</h2>
          <p className="text-zinc-400 text-xs mt-1.5 max-w-sm mx-auto">Chỉ với 4 câu hỏi đơn giản, giải thuật của chúng tôi sẽ phân tích kỹ thuật và định đoạt mẫu gậy bida carbon phù hợp nhất của bạn.</p>
        </div>

        {recommendation ? (
          /* Recommendation Result Panel */
          <div className="text-center space-y-6 py-4 animate-fade-in">
            <div className="p-3 bg-zinc-900 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> PHÂN TÍCH THÀNH CÔNG! ĐÂY LÀ SẢN PHẨM KHUYÊN DÙNG CỦA BẠN:
            </div>

            <div className="bg-zinc-900 border border-white/5 p-4 flex gap-4 text-left items-center">
              <img
                src={recommendation.image}
                alt={recommendation.name}
                className="w-20 h-20 object-cover border border-white/5"
              />
              <div className="flex-1">
                <span className="text-[10px] text-[#e9c349] font-mono uppercase tracking-wider block">PHÙ HỢP NHẤT</span>
                <h4 className="font-serif text-md font-bold text-white truncate">{recommendation.name}</h4>
                <p className="text-xs text-[#e9c349] font-mono font-medium mt-1">
                  Giá bán lẻ: {recommendation.price.toLocaleString('vi-VN')}₫
                </p>
                <p className="text-[11px] text-zinc-400 font-sans mt-1 line-clamp-1 italic">
                  "{recommendation.description}"
                </p>
              </div>
            </div>

            <div className="text-xs text-zinc-400 text-left bg-zinc-900/40 p-3.5 border border-white/5 space-y-1">
              <p className="font-bold border-b border-white/5 pb-1 mb-1.5 uppercase tracking-wider text-[10px] text-zinc-300">Vì sao sản phẩm này tối ưu cho bạn?</p>
              {budget === 'Low' && <p>• Phù hợp với hạn mức ngân sách tiết kiệm nhất của bạn mang lại hiệu năng cao nhất.</p>}
              {budget === 'High' && <p>• Vật liệu sợi carbon bách đấu cao cấp đáp ứng trọn vẹn đòi hỏi truyền lực và chống tạt bạt tốt của đấu thủ chuyên nghiệp.</p>}
              {discipline === 'Pool' && <p>• Kích thước phíp 12.4mm chuẩn xác giúp bạn chốt dứt điểm gọn gàng các quả bida pool lỗ mục tiêu.</p>}
              {style === 'Aggressive' && <p>• Độ đầm 19.5oz thúc đẩy việc phát lực đi các cú cắm phê, trô kéo bóng cái cực nảy.</p>}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onSelectProduct(recommendation)}
                className="flex-1 bg-[#e9c349] text-black font-mono font-bold text-xs py-4 uppercase tracking-widest hover:brightness-105"
              >
                XEM CHI TIẾT SẢN PHẨM
              </button>
              <button
                onClick={() => setRecommendation(null)}
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-mono text-xs py-4 uppercase tracking-widest"
              >
                TƯ VẤN LẠI
              </button>
            </div>
          </div>
        ) : (
          /* Dynamic consultation questionnaire */
          <form onSubmit={calculateRecommendation} className="space-y-4">
            
            {/* Level Selector */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1">
                <User className="h-3.5 w-3.5 text-[#e9c349]" /> 1. Trình độ bida của bạn hiện nay?
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                {[
                  { id: 'Beginner', text: 'Mới chơi' },
                  { id: 'Intermediate', text: 'Cọ xát phong trào' },
                  { id: 'Advanced', text: 'Thi đấu giải bida' }
                ].map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLevel(l.id)}
                    className={`p-2.5 border transition-all ${
                      level === l.id
                        ? 'bg-[#e9c349] text-black border-[#e9c349] font-bold'
                        : 'bg-zinc-900 border-white/5 text-zinc-300'
                    }`}
                  >
                    {l.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Discipline Preference Selector */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1">
                <Target className="h-3.5 w-3.5 text-[#e9c349]" /> 2. Thể loại bida hay chơi nhất?
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                {[
                  { id: 'Pool', text: 'Bida Lỗ (Pool)' },
                  { id: 'Carom', text: '3 Băng (Cushion)' },
                  { id: 'Libre', text: 'Mộc / Libre' }
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDiscipline(d.id)}
                    className={`p-2.5 border transition-all ${
                      discipline === d.id
                        ? 'bg-[#e9c349] text-black border-[#e9c349] font-bold'
                        : 'bg-zinc-900 border-white/5 text-zinc-300'
                    }`}
                  >
                    {d.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Play Style Preference */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1">
                <HelpCircle className="h-3.5 w-3.5 text-[#e9c349]" /> 3. Thiên hướng hay lối đánh?
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                {[
                  { id: 'Aggressive', text: 'Tấn công phát lực' },
                  { id: 'Defensive', text: 'Phòng ngự điều bi' },
                  { id: 'All-round', text: 'Toàn diện linh hoạt' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStyle(s.id)}
                    className={`p-2.5 border transition-all ${
                      style === s.id
                        ? 'bg-[#e9c349] text-black border-[#e9c349] font-bold'
                        : 'bg-zinc-900 border-white/5 text-zinc-300'
                    }`}
                  >
                    {s.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Money Limit Budget range */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1">
                <CircleDollarSign className="h-3.5 w-3.5 text-[#e9c349]" /> 4. Ngân sách dự chi đầu tư cơ?
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                {[
                  { id: 'Low', text: 'Dưới 1 Triệu' },
                  { id: 'Mid', text: '1 đến 5 Triệu' },
                  { id: 'High', text: 'Trên 5 Triệu' }
                ].map((bg) => (
                  <button
                    key={bg.id}
                    type="button"
                    onClick={() => setBudget(bg.id)}
                    className={`p-2.5 border transition-all ${
                      budget === bg.id
                        ? 'bg-[#e9c349] text-black border-[#e9c349] font-bold'
                        : 'bg-zinc-900 border-white/5 text-zinc-300'
                    }`}
                  >
                    {bg.text}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#e9c349] text-black font-mono font-bold text-xs py-4 uppercase tracking-widest hover:brightness-105 active:scale-[0.99] transition-all"
            >
              🚀 PHÂN TÍCH ĐỀ XUẤT CƠ BIDA HOÀN HẢO
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
