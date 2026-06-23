import { Product, NewsArticle, CustomerFeedback } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'allin-age-carbon',
    name: 'Allin Age Carbon Premium',
    price: 7990000,
    originalPrice: 9500000,
    rating: 5,
    salesCount: 1093,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuNOb32Sl4RmnXS64SDGe1reG3BPKMEWaEjgArWTif8XEXBvGO0zOa7YB2jNRVOC26lGOREuopmcc8RXbWWqogi98FBvAugUGonpMasw7IbN1XbXdphVheeyaoVrGHQIOw1sZNfkKzN6uZeiVnKX1LCn0BMKwORzpdM3690c2sFtbN-lp2OAF7OAdXuVvjyafLrYi01ZxtqiCn-MUeI21O4HJDx_1GeIsqdcITgKuYBvpi2iFdoirYdK-M',
    gallery: [
      'https://lh3.googleusercontent.com/aida/AP1WRLuNOb32Sl4RmnXS64SDGe1reG3BPKMEWaEjgArWTif8XEXBvGO0zOa7YB2jNRVOC26lGOREuopmcc8RXbWWqogi98FBvAugUGonpMasw7IbN1XbXdphVheeyaoVrGHQIOw1sZNfkKzN6uZeiVnKX1LCn0BMKwORzpdM3690c2sFtbN-lp2OAF7OAdXuVvjyafLrYi01ZxtqiCn-MUeI21O4HJDx_1GeIsqdcITgKuYBvpi2iFdoirYdK-M'
    ],
    category: 'cue',
    label: 'CƠ CARBON CAO CẤP',
    description: 'Allin Age đại diện cho kỷ nguyên cơ bida thế hệ mới với trục ngọn sợi carbon hiệu suất cao siêu bền, truyền động tức thì mà không bị cong vênh hay biến đổi theo khí hậu ẩm Việt Nam. Thiết kế chuôi gỗ phong tuyển chọn khảm họa tiết công nghệ vát 3D tinh tế.',
    specs: {
      'Chiều dài ngọn': '29 inches (~73.6cm)',
      'Đường kính đầu': '12.4 mm',
      'Trọng lượng cơ': '19oz - 20oz (có thể tinh chỉnh)',
      'Ren kết nối': 'Uni-loc Radial Pin',
      'Đầu tẩy': 'Allin Premium Pigskin 9 lớp',
      'Tay quấn': 'Tay trơn bóng loáng tôn chuôi gỗ phong'
    },
    reviews: [
      { name: 'Kẻ Săn Bóng', rating: 5, date: '20/06/2026', comment: 'Đường bi đi cực đầm và bám bi. Tay trơn cầm ôm mịn, ngọn carbon lau qua là sạch bóng mịn màng.' },
      { name: 'Trần Minh Đức', rating: 5, date: '15/06/2026', comment: 'Đáng tiền đến từng xu dồi dào sức mạnh truyền từ tay đến quả bi cái luôn!' }
    ]
  },
  {
    id: 'ngon-composite-5-16-18',
    name: 'Ngọn Composite 5/16/18 High-Performance',
    price: 600000,
    originalPrice: 850000,
    rating: 4.6,
    salesCount: 2879,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuTsSJCxV70R4XYwmUW6J2_kbinCBpc6cmw3lSMLt6uazxamHv0civ6UfQJFR2xKckpVyPGIfJFRAlsNxu4LF_dCG3gMKrkTIurUKyfV_my4Xy0MRDfXYTwTB9bN5pUjk_Kd4QG53AYO5DyiVEyGTInuv937XCBauBzOlEPbqZV2OUzaUxa2yUyUVIk2i1-LlwvbmPsWNzp7WvC41ycSq9i7VhlWX3GzlHs9w6meXnSjuIEeMx-O-Ao_Qc',
    gallery: [
      'https://lh3.googleusercontent.com/aida/AP1WRLuTsSJCxV70R4XYwmUW6J2_kbinCBpc6cmw3lSMLt6uazxamHv0civ6UfQJFR2xKckpVyPGIfJFRAlsNxu4LF_dCG3gMKrkTIurUKyfV_my4Xy0MRDfXYTwTB9bN5pUjk_Kd4QG53AYO5DyiVEyGTInuv937XCBauBzOlEPbqZV2OUzaUxa2yUyUVIk2i1-LlwvbmPsWNzp7WvC41ycSq9i7VhlWX3GzlHs9w6meXnSjuIEeMx-O-Ao_Qc'
    ],
    category: 'shaft',
    label: 'BÁN CHẠY NHẤT',
    description: 'Ngọn Composite công nghệ kết hợp sợi carbon gia cường và lõi polyurethane giảm độ bạt lệch lệch hướng (low deflection), mang lại độ thẳng tắp lý tưởng cho từng đường chọc. Loại ren phổ thông 5/16/18 tương thích nhiều dòng chuôi bida phổ biến trên thị trường.',
    specs: {
      'Chiều dài': '29 inches',
      'Trọng lượng': '3.8 oz',
      'Đường kính đầu': '12.4mm / 12.8mm',
      'Ren kết nối': '5/16/18',
      'Đầu tẩy': 'Thủy tinh ép hoặc da nhiều lớp'
    },
    reviews: [
      { name: 'Nguyễn Tấn Tài', rating: 4.8, date: '10/06/2026', comment: 'Rẻ nhưng cải thiện cú đánh cực nhiều, mua lắp vừa khít chuôi cũ ở nhà luôn.' }
    ]
  },
  {
    id: 'allin-poker-tay-tron',
    name: 'Allin Poker bản Tay trơn Elite',
    price: 2250000,
    originalPrice: 3000000,
    rating: 4.9,
    salesCount: 3021,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLujjsOS0mD1f0k2tjMJIHalZOJSs9mmHxzBnH16EKJgHm8qHd53T-zLsh45MoQ3JxjSRiYdRydkJaaOnJLmwEYmhII1MAk1Qd4qYWRELpvcpCQoSI2rh-saLK3K_TCZOikgUbDkzvEG98z3D-jXughz1vZy6jdyMcfqHc6ScrmPcFTMJpSiaejDqpUwL0XeXI_m1ttugwhua0ku1m6HepHszKQU6jXbRmWLjfSuPU4yVHT2OACll-cgYA',
    gallery: [
      'https://lh3.googleusercontent.com/aida/AP1WRLujjsOS0mD1f0k2tjMJIHalZOJSs9mmHxzBnH16EKJgHm8qHd53T-zLsh45MoQ3JxjSRiYdRydkJaaOnJLmwEYmhII1MAk1Qd4qYWRELpvcpCQoSI2rh-saLK3K_TCZOikgUbDkzvEG98z3D-jXughz1vZy6jdyMcfqHc6ScrmPcFTMJpSiaejDqpUwL0XeXI_m1ttugwhua0ku1m6HepHszKQU6jXbRmWLjfSuPU4yVHT2OACll-cgYA'
    ],
    category: 'cue',
    label: 'BẢN GIỚI HẠN',
    description: 'Lấy cảm hứng từ sự mạo hiểm và chiến thuật đỉnh cao của bộ môn Poker, Allin Poker Tay Trơn sở hữu thiết kế chuôi đen tuyền tuyệt đối sang trọng hòa quyện dải sơn phản quang độc nhất. Ngọn carbon siêu cứng hỗ trợ tăng lực dứt điểm và tạo độ xoáy ép phê cực kỳ ảo diệu.',
    specs: {
      'Ngọn': 'Carbon Fiber 12.4mm',
      'Vật liệu chuôi': 'Maple cứng sấy khô 2 năm',
      'Trọng lượng': '19.5 oz có thể tăng chỉnh tạ',
      'Đầu tẩy': 'Everest / Kamui size M',
      'Tay quấn': 'Không quấn - Sơn bóng Nano chống bám vân tay'
    },
    reviews: [
      { name: 'Lê Hoàng Hải', rating: 5, date: '21/04/2026', comment: 'Cơ quá đẹp, thiết kế tinh xảo, cầm rất đầm tay chắc chắn.' }
    ]
  },
  // Extra products to fill catalog and make the e-commerce rich!
  {
    id: 'allin-skylight-glove',
    name: 'Găng Tay Bida Allin Falcon Cao Cấp',
    price: 180000,
    originalPrice: 250000,
    rating: 4.7,
    salesCount: 1540,
    image: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=400', // standard high-res billiard glove alternative with fallback colorful style
    gallery: [
      'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=400'
    ],
    category: 'accessory',
    description: 'Găng tay 3 ngón Allin Falcon co giãn 4 chiều cực ráo mồ hôi, bề mặt thun mịn siêu mát lướt mướt ngọn gậy carbon mượt mà tối đa. Thiết kế lưới hở ngón thoáng khí tuyệt đối.',
    specs: {
      'Chất liệu': 'Lycra cao cấp kết hợp Nylon Mesh',
      'Kích cỡ': 'Freesize co giãn lớn',
      'Màu sắc': 'Đỏ, Xanh Dương, Đỏ đậm, Hồng, Vàng'
    },
    reviews: [
      { name: 'Quốc Bảo', rating: 5, date: '19/06/2026', comment: 'Găng đeo êm, thoáng mát chọc mượt vô cùng.' }
    ]
  },
  {
    id: 'allin-luxury-case',
    name: 'Bao Da Đựng Cơ Allin Skylight Capsule',
    price: 1650000,
    originalPrice: 2100000,
    rating: 4.8,
    salesCount: 618,
    image: 'https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?auto=format&fit=crop&q=80&w=400', // billiard elements fallback
    gallery: [
      'https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?auto=format&fit=crop&q=80&w=400'
    ],
    category: 'accessory',
    label: 'RECOMMENDED',
    description: 'Hộp đựng cơ ống tròn (Hard Case) thiết kế Skylight tối giản gọn gàng, chống sốc và chống nước hoàn hảo bảo vệ gậy carbon vô giá của bạn an toàn trong mọi chuyến đi đấu.',
    specs: {
      'Sức chứa': '1 Chuôi + 2 Ngọn (1B2S)',
      'Vật liệu': 'Da PU dập vân dệt kim chống xước + khung ABS chịu lực',
      'Đại tiện ích': 'Có quai đeo chéo êm ái, ngăn phụ đựng lơ/găng'
    },
    reviews: [
      { name: 'Đỗ Hữu Quân', rating: 5, date: '05/06/2026', comment: 'Màu xám lông chuột rất sành điệu, bao chịu lực nẩy chèn ép thoải mái bảo vệ ngọn cơ carbon tuyệt hảo.' }
    ]
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-tu-the-cam-co',
    title: 'Kỹ Thuật Cầm Cơ Và Tư Thế Đánh Bida Chuẩn Cho Người Mới',
    date: '19/06/2026',
    category: 'KỸ THUẬT',
    summary: 'Trong bida, tư thế đứng và cách cầm cơ là nền tảng của mọi kỹ thuật. Một người chơi giỏi phải sở hữu bệ đỡ thăng bằng, khuỷu tay vuông góc để phát lực chuẩn xác nhất.',
    content: 'Để có một cú ra cơ mượt mà, bạn cần đứng dang vát chân 1 góc 45 độ, giữ thẳng lưng và cúi gập người sát hông cơ bida. Tay cầm chuôi giữ lỏng lẻo ở khớp ngón nhưng vững vàng, tạo góc 90 độ tại cẳng tay khi gậy chạm bi cái. Tuyệt đối không nhấp vai khi phát lực, hãy nhấp bằng cùi chỏ để duy trì đầu gậy đi thẳng tắp không chệch tâm xê xích.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsBYLYLiDHg0iJNP2ZaYTk3R_amOCW-r8eGTIkKOCID1JKZ5BxXOJ9T5QuA424Pp3PoMP89wZNdeOmXHCyOGN9P1QvBx35p1985-jyiQ4_clzOcy66hEtfCCa86lENAcMmFfyvhoXmlEtv6VojicFtyDJZFoUpzRqY_mlfFqZnY2pjxGIkzmOSt6RUtQfx8XvNTiEoZ2LFK1yj3jqxffIoJMZqiYcj8JQ2Rr52UQSLjEtGFJor_8KoPUA'
  },
  {
    id: 'news-nha-tai-tro-kim-cuong',
    title: 'Allin Cue Tự Hào Là Nhà Tài Trợ Kim Cương Giải 99 Road To World',
    date: '02/04/2026',
    category: 'SỰ KIỆN',
    summary: 'Một hành trình lớn cần những bước đi xứng tầm! Allin Cue chính thức đồng hành cùng giải đấu bida 9 hole quy mô quốc tế với tổng giá trị giải thưởng kỷ lục 5Tỷ148Triệu VNĐ.',
    content: 'Giải đấu Road To World 99 Allinc2 quy tụ hơn 256 cơ thủ sừng sỏ nhất toàn đất nước Việt Nam và các đại diện Tây Ban Nha, Hàn Quốc. Trong vai trò nhà tài trợ Độc Quyền Kim Cương, Allin Cue cung cấp toàn bộ trang bị gậy đấu carbon tối tân nhất để ban trọng tài thẩm định, thúc đẩy trình độ và tạo sân chơi lành mạnh, bùng cháy đam mê.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEPSdtb5gr_uWO98Dz1mWzWVX404OSJtR8FGZJQAi3OZ7lpmegZ6N3s1pWixQLa5ISLf_EbJwCHJVSNz-tvsAmFFdnpvpMK0johbPLWuWEsuhxgrL9gENcTzlPPwFVj8nwx1XHvc47nn8bGQbcxFUX076j8cbkPnMfrLQecLggtzp22gAn1cm5L1qGKIK2D9rey0z2yGutL6uCccS8YyiBf8jPfkpfG4qp2eI47lfqZCMyJ97705eGVk09ss1FhVJoSMyvVS8JgM8'
  },
  {
    id: 'news-chon-ngon-co',
    title: 'Cách Chọn Ngọn Cơ Bida Phù Hợp: Bí Quyết Nâng Cao Độ Chính Xác',
    date: '13/06/2026',
    category: 'KIẾN THỨC',
    summary: 'Nhiều người chơi thường tập trung vào mẫu hoa văn hoành tráng ở chuôi nhưng thực tế, ngọn cơ mới là linh hồn quyết định độ xoáy bóng cái và độ lệch bạt hướng bi.',
    content: 'Hãy ưu tiên chọn ngọn carbon hoặc composite vì chúng triệt tiêu độ bạt (deflection) cực tốt nhờ trọng lượng đầu ngọn siêu nhẹ. Ngọn carbon có độ cứng cáp gần như tuyệt đối, không bị nở hay cong hỏng khi thay đổi thời tiết. Kích thước ngọn 12.4mm lý tưởng cho cầu bi gom ba băng hoặc 12.8mm thích hợp cho các cú đề pa phá bàn sấm sét ở thể thức pool.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5ZuvOo4QhoTdmz92ktpLLTdxvRMyhS8eYFXoKuSAiFKblXZ5FQ6owlCuimYouHmTQkO2fPoWnQU8ObfGeehte5hqVIoh13cz1XCHsYirEm-_LY8aAyEQ3YfwovPnUKZkjWj0oxdYcM_EUp9VRb_Joafy2nhVOUuhFczSRYIJNf0uvw6A1FNGy1a22bhq4NU4vh2FSjKhAbW1ACm1Gwv6ZCc14N8RctJHwwJczTnnXlRqhM3UaPOuyxFclGt-6aG29pEYQNSjDG60'
  }
];

export const TESTIMONIALS: CustomerFeedback[] = [
  {
    id: 'fb-ivan-nunez',
    name: 'Ivan Nunez',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhh6KaFoJ-dy5ICCbZTRmesRKZLQXkiBIBpimtQF2eB-mmI4odVhI7CBlG2P8SUWOiH6WXnpDSowcwP6T74WUXNZUAX1H0JSoJF1ETpdlkXalqMqWN3WfOba3_Z19vgHQMDIqs10khCv_5AZX4MTkITTffS0d4pbmthDi7_1eEOkPXYiuPrltbN0yxDwvlUTZs_YFtao3mEsgGOu5pniBQCEwlTbiwuvGzwWVu7YvzHdhT5fpEACPmVjNaOLkrBfIfaXAErOIxr7U',
    title: 'Vô địch Tây Ban Nha | National Team',
    comment: 'Allin Cue cho cảm giác đánh chắc tay, truyền lực cực tốt và kiểm soát bi chính xác. Ngọn cơ ổn định, không rung ngay cả khi thực hiện cú đánh mạnh hay kỹ thuật khó.',
    rating: 5
  },
  {
    id: 'fb-hoang-phu-tho',
    name: 'Hoàng Phú Thọ',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaEEruxrlknHWPfbUxN7KlyfhzMwywoZF9QsUbKjPNgOlaSUN60cDSW3KVqvbtwdvZBI_BoYiuxlr-T7B8pfulaTUh8zkpiraO6OOytfW9geudRHJChuUkGCkFflWUk-bHMILG169AAvYQnG2ZixrHWtfRwCDT4MceAdk0MgRsNLjToiOeJDs2Uy6a7PKcRStMJ5fDdVJlxV0Itr9yJZBWVACGKvUosVZ4jcQSrEWBz0SxPKhF_H0mMz5AL_zqugGOTm_CQlvU1Ew',
    title: 'Top 3 Vô địch Quốc gia 2025-2026',
    comment: 'Có thể nói hãng Allin vô cùng đầu tư khi sử dụng ngọn Carbon tân tiến cho những mẫu cơ tầm giá chỉ 2-3 triệu. Đánh rất mạnh, có lực. Phù hợp cho cả tập luyện lẫn thi đấu ngày đêm.',
    rating: 5
  }
];
