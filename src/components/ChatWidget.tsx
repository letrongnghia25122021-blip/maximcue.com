import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Phone, MessageCircle, Info } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
  actions?: { label: string; href: string; isZalo?: boolean }[];
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      sender: 'agent',
      text: 'Xin chào! Tôi là nhân viên bán hàng của MaXim - Billiard.',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showNotification, setShowNotification] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'Bạn muốn tư vấn mua hàng ?',
    'Bạn muốn thiết kế gậy riêng cho mình?',
    'Bạn cần hỗ trợ?',
  ];

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (text: string, isUser = true) => {
    if (!text.trim()) return;

    const newMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: isUser ? 'user' : 'agent',
      text: text,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);

    if (isUser) {
      // Simulate response
      setTimeout(() => {
        let responseText = '';
        if (text.includes('tư vấn mua hàng')) {
          responseText = 'Dạ vâng ạ! Bạn đang quan tâm đến dòng cơ nào của MaXim - Billiard vậy ạ? Bạn có thể nhắn tin Zalo ngay cho tôi hoặc gọi Hotline 0926888788 để tôi gửi ảnh thực tế và báo giá nét nhất nhé!';
        } else if (text.includes('thiết kế gậy')) {
          responseText = 'Chào bạn! Với dịch vụ custom gậy bida carbon riêng theo yêu cầu, bạn có thể tự thiết kế chuôi, khắc tên laser trực tiếp lên cán gậy. Bạn muốn tôi kết nối Zalo hỗ trợ chi tiết phần này hay trao đổi trực tiếp luôn ạ?';
        } else {
          responseText = 'Dạ MaXim - Billiard sẵng sàng hỗ trợ bạn ngay đây ạ! Quý khách cần hỗ trợ gấp vui lòng gọi điện hotline hoặc kết nối Zalo với nhân viên hỗ trợ trực tuyến để được xử lý ngay trong 5 phút nhé!';
        }

        const responseMsg: Message = {
          id: Math.random().toString(36).substr(2, 9),
          sender: 'agent',
          text: responseText,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          actions: [
            { label: 'Gọi Hotline: 0926.888.788', href: 'tel:0926888788' },
            { label: 'Nhắn Zalo nhân viên 💬', href: 'https://zalo.me/0926888788', isZalo: true },
          ],
        };
        setMessages((prev) => [...prev, responseMsg]);
      }, 800);
    }
  };

  const handleQuickQuestionClick = (question: string) => {
    handleSendMessage(question, true);
  };

  const currentHour = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Trigger Button */}
      <div className="relative">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowNotification(false);
          }}
          className="flex items-center justify-center w-14 h-14 bg-[#e9c349] hover:bg-white text-black rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none border-2 border-black"
          id="chat-trigger-btn"
        >
          {isOpen ? (
            <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
          ) : (
            <MessageSquare className="h-6 w-6 transition-transform duration-300 group-hover:scale-105" />
          )}
        </button>

        {/* Small live notification badge */}
        {showNotification && !isOpen && (
          <>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] text-white font-bold items-center justify-center">
                1
              </span>
            </span>

            {/* Teaser tooltips popup */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2, duration: 0.4 }}
              className="absolute right-16 bottom-2 whitespace-nowrap bg-zinc-950 border border-white/10 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div>
                <span className="font-bold text-[#e9c349]">Hỗ trợ trực tuyến</span> (5p có mặt)
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Chat Window Panel Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[380px] h-[520px] bg-zinc-950 border border-white/10 shadow-2xl flex flex-col overflow-hidden"
            id="chat-window-panel"
          >
            {/* Window Header */}
            <div className="bg-gradient-to-r from-zinc-900 to-black p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-[#e9c349] flex items-center justify-center overflow-hidden">
                    {/* Render elegant avatar initials */}
                    <span className="font-serif font-bold text-[#e9c349] text-base">LN</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-950 rounded-full" />
                </div>
                <div className="text-left">
                  <h4 className="font-serif font-bold text-white text-sm">Lê Nghĩa</h4>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-400 font-medium">Nhân Viên Bán Hàng</span>
                    <span className="text-[9px] text-[#e9c349] font-mono tracking-tight mt-0.5">
                      🟢 Trực tuyến - Có mặt sau 5 phút
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-900 border border-transparent hover:border-white/5 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Window Messages Scroll view */}
            <div className="flex-1 overflow-y-auto p-4 bg-zinc-950/98 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-mono mb-1">
                    <span>{msg.sender === 'user' ? 'Bạn' : 'Lê Nghĩa (MaXim)'}</span>
                    <span>•</span>
                    <span>{msg.time}</span>
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed font-sans ${
                      msg.sender === 'user'
                        ? 'bg-[#e9c349] text-black font-medium rounded-tr-none'
                        : 'bg-zinc-900 text-zinc-200 border border-white/5 rounded-tl-none'
                    }`}
                  >
                    {msg.text}

                    {/* Quick call-to-action buttons for support representative messages */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-white/5 space-y-1.5">
                        {msg.actions.map((act, idx) => (
                          <a
                            key={idx}
                            href={act.href}
                            target={act.isZalo ? '_blank' : undefined}
                            rel={act.isZalo ? 'noopener noreferrer' : undefined}
                            className={`flex items-center justify-center gap-1.5 w-full text-center py-2 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider font-mono transition-all ${
                              act.isZalo
                                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                : 'bg-[#e9c349] hover:bg-white text-black'
                            }`}
                          >
                            {act.isZalo ? <MessageCircle className="h-3.5 w-3.5" /> : <Phone className="h-3 w-3" />}
                            {act.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick response Questions Options */}
            <div className="px-4 py-2 bg-zinc-900/30 border-t border-white/5 space-y-1.5">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono text-left">
                💡 Câu hỏi gợi ý:
              </p>
              <div className="flex flex-col gap-1">
                {quickQuestions.map((q, idx) => {
                  const alreadyAsked = messages.some((m) => m.sender === 'user' && m.text === q);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestionClick(q)}
                      disabled={alreadyAsked}
                      className={`text-left text-xs px-3 py-2 rounded-xl border transition-all text-ellipsis overflow-hidden whitespace-nowrap ${
                        alreadyAsked
                          ? 'border-zinc-800 text-zinc-600 cursor-not-allowed bg-transparent'
                          : 'border-[#e9c349]/20 hover:border-[#e9c349] text-zinc-300 hover:text-white bg-zinc-900/40 hover:bg-zinc-900'
                      }`}
                    >
                      {q}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Window Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
                setInputValue('');
              }}
              className="p-3 bg-zinc-900 border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập nội dung tin nhắn của bạn..."
                className="flex-1 bg-zinc-950 border border-white/10 focus:border-[#e9c349] focus:outline-none text-xs text-white rounded-lg px-3 py-2.5 font-sans"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-[#e9c349] hover:bg-white disabled:bg-zinc-800 disabled:text-zinc-600 text-black p-2.5 rounded-lg transition-all"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
