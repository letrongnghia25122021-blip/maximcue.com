import React from 'react';
import { Mail, Phone, MapPin, ShieldAlert, Heart, Club, ShieldCheck } from 'lucide-react';
import maximBilliardLogo from '../assets/images/maxim_billiard_logo_1782206540434.jpg';

export default function Footer() {
  return (
    <footer className="bg-black/95 text-zinc-400 text-xs font-mono border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo brand intro block */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="Maxim Billiard Logo"
                className="h-9 w-auto object-contain brightness-100"
                src={maximBilliardLogo}
              />
              <span className="font-serif text-lg font-bold tracking-widest text-white leading-none">
                MAXIM <span className="text-[10px] block font-sans tracking-[0.3em] text-[#e9c349] mt-0.5">BILLIARD</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-sans leading-relaxed">
              Mạng lưới đại hạt phân phối độc quyền các dòng cơ carbon bida, ngọn composite nghệ thuật và hộp bao da bảo quản chính hãng Allin Cue phạm vi Đông Nam Á. Đại diện của kỹ nghệ đỉnh phong.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h5 className="text-white text-xs uppercase tracking-widest font-bold border-l-2 border-[#e9c349] pl-2">
              Chính Sách Khách Hàng
            </h5>
            <ul className="space-y-2 text-[11px] text-zinc-500">
              <li><span className="hover:text-[#e9c349] transition-colors cursor-pointer">✓ Bảo hành trục carbon trọn đời hư méo cong vênh</span></li>
              <li><span className="hover:text-[#e9c349] transition-colors cursor-pointer">✓ Đổi mới trong vòng 7 ngày đầu nếu lỗi xước dập</span></li>
              <li><span className="hover:text-[#e9c349] transition-colors cursor-pointer">✓ Miễn phí hoàn toán phí shipper đơn hàng trên 1.5 triệu</span></li>
              <li><span className="hover:text-[#e9c349] transition-colors cursor-pointer">✓ Cam kết bồi thường gấp 10 lần nếu phát hiện nhái giả</span></li>
            </ul>
          </div>

          {/* Direct Address location contact coordinates */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <h5 className="text-white text-xs uppercase tracking-widest font-bold border-l-2 border-[#e9c349] pl-2">
              Thông Tin Liên Hệ Toàn Quốc
            </h5>
            <div className="space-y-3 font-sans text-xs">
              <div className="flex gap-2 items-start">
                <MapPin className="h-4 w-4 text-[#e9c349] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white font-mono">Trụ sở Hà Nội:</p>
                  <p className="text-zinc-500">Khu đô thị vinhomes Green Bay, Mễ Trì, Nam Từ Liêm, Hà Nội, Việt Nam.</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <MapPin className="h-4 w-4 text-[#e9c349] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white font-mono">Đại lý TP. Hồ Chí Minh:</p>
                  <p className="text-zinc-500">Đường Nguyễn Thị Thập, Quận 7, TP. Hồ Chí Minh, Việt Nam.</p>
                </div>
              </div>
              <div className="flex gap-4 pt-2 border-t border-white/5 font-mono text-[11px]">
                <div className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-[#e9c349]" />
                  <span>HOTLINE: 0926.888.788</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-[#e9c349]" />
                  <span>SUPPORT@MAXIMBILLIARD.VN</span>
                </div>
              </div>
              <p className="text-[10px] text-zinc-500 font-sans mt-2 italic leading-relaxed">
                * Khách mua hàng liên hệ số điện thoại trên hoặc Zalo số điện thoại đó luôn để được tư vấn giao hàng hỏa tốc.
              </p>
            </div>
          </div>
        </div>

        {/* Partners Payments logos and copyright section */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>© 2026 MAXIM BILLIARD & ALLIN CUE VIETNAM. Tất cả quyền được bảo lưu.</p>
            <span className="hidden sm:inline-block">|</span>
            <div className="flex items-center gap-1 text-[#e9c349]/70 font-sans">
              <span>Đại Sứ Thương Hiệu: <strong>Ivan Nunez</strong></span>
            </div>
          </div>

          {/* Bank Payment logo */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] uppercase tracking-widest">ĐỐI TÁC THANH TOÁN AN TOÀN STB:</span>
            <img
              alt="STB Banking logo partner"
              className="h-5 w-auto object-contain opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-opacity"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLu71bSrw2pIiY9mgMtzg2vravPmSGX2pBRZ8VpPEyCJcEOrrwK301DIH9GJ0e-WDkPsWq-27S5YbjoXx_vhQSRr_HQlKK2rPuktjgt6hWLQRU0xzljssH516RLxXJtWPBzwlb7ge3EUVkXSGtfbaIBXcGyn-_d_pM1RPyYeSnH2uRJcciPD5Pg-KFl9-poflIKLnyAsO80CIunpNQ3WUjMf6X7153tI9AJt-rzc8w-O6WF0hskiCYpLPEAj12CKR7X45wKKf2AN0"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
