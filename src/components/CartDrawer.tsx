import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CreditCard, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Checkout Form state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BANK'>('COD');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Totals calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percent) / 100 : 0;
  const deliveryFee = subtotal > 1500000 ? 0 : 40000;
  const finalTotal = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'MAXIM666') {
      setAppliedDiscount({ code: 'MAXIM666', percent: 15 });
      setPromoError('');
    } else if (code === 'ALLINCUE') {
      setAppliedDiscount({ code: 'ALLINCUE', percent: 10 });
      setPromoError('');
    } else {
      setPromoError('Mã không hợp lệ. Thử MAXIM666 (15%) hoặc ALLINCUE (10%)');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Vui lòng nhập đầy đủ thông tin giao hàng!');
      return;
    }
    setIsOrderPlaced(true);
  };

  const handleCloseConfirm = () => {
    onClearCart();
    setIsOrderPlaced(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-zinc-950 border-l border-white/10 z-55 shadow-2xl flex flex-col justify-between">
      {/* Header section */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-[#e9c349]" />
          <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
            Giỏ Hàng Của Bạn
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-zinc-900 border border-transparent hover:border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {isOrderPlaced ? (
        /* Order Confirmed View */
        <div className="flex-1 p-8 flex flex-col justify-center items-center text-center space-y-6">
          <CheckCircle2 className="h-16 w-16 text-emerald-400 stroke-[1.5] animate-bounce" />
          <h4 className="font-serif text-2xl font-bold text-white uppercase tracking-wider">
            Đặt Hàng Thành Công!
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
            Cảm ơn quý khách <strong>{customerName}</strong> đã đặt niềm tin vào các dòng cơ cao cấp của <strong className="text-white">MAXIM BILLIARD</strong>.
          </p>

          <div className="w-full bg-zinc-900 p-4 border border-white/5 space-y-2 text-left text-xs font-mono">
            <p className="text-zinc-500 border-b border-white/5 pb-2 uppercase text-[10px] tracking-widest text-[#e9c349]">Thông Tin Đơn Hàng</p>
            <p><span className="text-zinc-500">Mã đơn:</span> #MXM{Math.floor(100000 + Math.random() * 900000)}</p>
            <p><span className="text-zinc-500">Người nhận:</span> {customerName}</p>
            <p><span className="text-zinc-500">SĐT:</span> {customerPhone}</p>
            <p><span className="text-zinc-500">Địa chỉ:</span> {customerAddress}</p>
            <p><span className="text-zinc-500">Thanh toán:</span> {paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản Ngân hàng (Đã xác nhận)'}</p>
            <p className="border-t border-white/5 pt-2 text-[#e9c349] font-bold"><span className="text-zinc-500 font-normal">Tổng cộng:</span> {finalTotal.toLocaleString('vi-VN')}₫</p>
          </div>

          <button
            onClick={handleCloseConfirm}
            className="w-full bg-[#e9c349] text-black font-semibold font-mono text-xs py-4 uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all"
          >
            Quay lại Cửa Hàng
          </button>
        </div>
      ) : isCheckingOut ? (
        /* Checkout Shipping Form and Bank details view */
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono border-b border-white/5 pb-3">
            <button onClick={() => setIsCheckingOut(false)} className="text-[#e9c349] uppercase hover:underline">
              ← Sửa đổi giỏ hàng
            </button>
            <span className="text-zinc-400 font-mono uppercase tracking-widest">Bước 2: Giao Hàng</span>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">Họ tên người nhận*</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full bg-zinc-900 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#e9c349]"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">Số điện thoại*</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0912xxxxxx"
                className="w-full bg-zinc-900 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#e9c349]"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">Địa chỉ nhận hàng*</label>
              <textarea
                required
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Số nhà, Tên đường, Quận, Thành phố..."
                rows={3}
                className="w-full bg-zinc-900 border border-white/10 p-3 text-xs text-white focus:outline-none focus:border-[#e9c349] resize-none"
              />
            </div>

            <div className="pt-2">
              <label className="block text-xs text-zinc-400 uppercase tracking-widest mb-1.5 font-mono">Phương thức thanh toán</label>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-3 border transition-colors ${
                    paymentMethod === 'COD'
                      ? 'bg-[#e9c349] text-black border-[#e9c349] font-bold'
                      : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  COD nhận hàng
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('BANK')}
                  className={`p-3 border transition-colors ${
                    paymentMethod === 'BANK'
                      ? 'bg-[#e9c349] text-black border-[#e9c349] font-bold'
                      : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  Chuyển Khoản QR
                </button>
              </div>
            </div>

            {paymentMethod === 'BANK' && (
              <div className="bg-zinc-900 p-4 border border-[#e9c349]/20 text-center space-y-3">
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">Quét mã QR QR-Pay tự động</p>
                <div className="w-40 h-40 bg-white p-2 mx-auto inline-block border border-white/10">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=STB:0701234567-MaximBilliard"
                    alt="VietQR bank simulation"
                    className="w-full h-full"
                  />
                </div>
                <div className="text-left text-xs space-y-1 font-mono">
                  <p><span className="text-zinc-500">Ngân hàng:</span> Sacombank (STB)</p>
                  <p><span className="text-zinc-500">Số tài khoản:</span> 070123456788</p>
                  <p><span className="text-zinc-500">Người nhận:</span> MAXIM BILLIARD ACADEMY</p>
                  <p><span className="text-zinc-500">Số tiền:</span> <strong className="text-[#e9c349]">{finalTotal.toLocaleString('vi-VN')}₫</strong></p>
                  <p><span className="text-zinc-500">Nội dung:</span> MXM{customerPhone}</p>
                </div>
              </div>
            )}
          </form>

          {/* Pricing Summary */}
          <div className="border-t border-white/10 pt-4 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-zinc-500">Tạm tính:</span>
              <span className="text-white">{subtotal.toLocaleString('vi-VN')}₫</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Khuyến mãi ({appliedDiscount?.code}):</span>
                <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-zinc-500">Phí giao hàng:</span>
              <span className="text-white">{deliveryFee === 0 ? 'Phần quà miễn phí' : `${deliveryFee.toLocaleString('vi-VN')}₫`}</span>
            </div>
            <div className="flex justify-between border-t border-white/5 pt-2 text-sm text-[#e9c349] font-bold">
              <span>Đơn hàng TỔNG CỘNG:</span>
              <span>{finalTotal.toLocaleString('vi-VN')}₫</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-[#e9c349] text-black font-bold font-mono text-xs py-4 uppercase tracking-widest hover:brightness-110 tracking-widest mt-2"
          >
            XÁC NHẬN ĐẶT HÀNG & GIAO HÀNG
          </button>
        </div>
      ) : cart.length === 0 ? (
        /* Empty Cart View */
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
          <ShoppingBag className="h-12 w-12 text-zinc-700 stroke-[1.2]" />
          <p className="text-sm text-zinc-500 font-mono uppercase tracking-widest">
            Giỏ hàng của bạn đang trống.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 border border-zinc-700 text-zinc-400 hover:border-[#e9c349] hover:text-[#e9c349] text-xs font-mono uppercase tracking-wider transition-all"
          >
            Tiếp Tục Xem Hàng
          </button>
        </div>
      ) : (
        /* Ordinary Cart View with product summary */
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-zinc-900/40 p-3 border border-white/5 relative"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-16 w-16 object-cover bg-zinc-950 border border-white/5"
                />
                <div className="flex-1 flex flex-col justify-between text-xs font-mono">
                  <div>
                    <div className="flex justify-between gap-1 items-start">
                      <h5 className="text-white font-bold tracking-tight line-clamp-1">
                        {item.product.name}
                      </h5>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-0.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Specifications badges if defined */}
                    {item.selectedSpecs && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.selectedSpecs.weight && (
                          <span className="bg-zinc-850 text-zinc-400 text-[9px] px-1.5 py-0.5">
                            {item.selectedSpecs.weight}
                          </span>
                        )}
                        {item.selectedSpecs.wrap && (
                          <span className="bg-zinc-850 text-zinc-400 text-[9px] px-1.5 py-0.5">
                            {item.selectedSpecs.wrap}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 bg-zinc-950 border border-white/10 hover:border-[#e9c349]/50 text-zinc-400"
                      >
                        <Minus className="h-2.5 w-2.5" />
                      </button>
                      <span className="w-6 text-center text-white text-xs">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 bg-zinc-950 border border-white/10 hover:border-[#e9c349]/50 text-zinc-400"
                      >
                        <Plus className="h-2.5 w-2.5" />
                      </button>
                    </div>
                    <span className="text-[#e9c349] font-bold">
                      {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promo code wrapper */}
          <div className="bg-zinc-900 p-3 border border-white/5">
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono mb-2">
              Mã Giảm Giá / Voucher
            </p>
            <div className="flex gap-2 font-mono">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Ví dụ: MAXIM666"
                className="flex-1 bg-zinc-950 border border-white/10 p-2 text-xs text-white focus:outline-none"
              />
              <button
                onClick={handleApplyPromo}
                className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-4 py-2"
              >
                ÁP DỤNG
              </button>
            </div>
            {promoError && <p className="text-red-400 text-[10px] mt-1 font-mono">{promoError}</p>}
            {appliedDiscount && (
              <p className="text-emerald-400 text-[10px] mt-1.5 font-mono">
                ✓ Áp dụng mã <strong>{appliedDiscount.code}</strong> giảm {appliedDiscount.percent}% thành công!
              </p>
            )}
          </div>

          {/* Pricing values summary */}
          <div className="border-t border-white/10 pt-4 space-y-1.5 text-xs font-mono bg-zinc-900/10 p-4 border border-white/5">
            <div className="flex justify-between">
              <span className="text-zinc-500">Cộng tổng tạm tính:</span>
              <span className="text-white">{subtotal.toLocaleString('vi-VN')}₫</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Ưu đãi voucher:</span>
                <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-zinc-500">Phí ship:</span>
              <span className="text-white">{deliveryFee === 0 ? 'Miễn phí' : `${deliveryFee.toLocaleString('vi-VN')}₫`}</span>
            </div>
            {subtotal < 1500000 && (
              <p className="text-[10px] text-[#e9c349]/70 italic mt-0.5">
                * Thêm {(1500000 - subtotal).toLocaleString('vi-VN')}₫ nữa để được Miễn Phí Shipper toàn quốc.
              </p>
            )}
            <div className="flex justify-between border-t border-white/5 pt-2 text-[#e9c349] text-sm font-bold">
              <span>ĐƠN HÀNG TỔNG CỘNG:</span>
              <span>{finalTotal.toLocaleString('vi-VN')}₫</span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckingOut(true)}
            className="w-full bg-[#e9c349] text-black font-bold font-mono text-xs py-4 uppercase tracking-widest hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 leading-none"
          >
            📋 TIẾN HÀNH THANH TOÁN
          </button>
        </div>
      )}

      {/* Trust reassurance footer */}
      <div className="p-4 bg-zinc-950 border-t border-white/5 text-center flex items-center justify-center gap-1.5 text-[9px] text-zinc-500 font-mono uppercase tracking-wider">
        <ShieldCheck className="h-3 w-3 text-emerald-500" />
        <span>Bảo hành carbon trọn vẹn, không sợ dập nứt cong</span>
      </div>
    </div>
  );
}
