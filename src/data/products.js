import ip15Image from '../assets/img/ip15.jpg'

export const CATEGORIES = [
  'Tất cả',
  'Điện thoại',
  'Laptop',
  'Thời trang',
  'Mỹ phẩm',
  'Gia dụng',
  'Thể thao',
  'Đồ chơi',
]

// For images: place files in public/img to reference as "/img/filename.jpg"
export const PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 28990000,
    category: 'Điện thoại',
    image: ip15Image,
    vouchers: ['Giảm 50k', 'Freeship Xtra'],
    shipping: { area: 'Hồ Chí Minh', feeText: '0đ - 25k (tùy khu vực)' },
    variants: { colors: ['Đen', 'Trắng', 'Xanh'], sizes: [] },
    shop: { name: 'V-Market Official', rating: 4.9, followers: '230k', avatar: '/img/shop-avatar.png' },
    specs: [
      ['Thương hiệu', 'Apple'],
      ['Xuất xứ', 'Việt Nam / Nhập khẩu chính hãng'],
      ['Bảo hành', '12 tháng'],
      ['Model', 'A3100'],
    ],
    description: 'iPhone 15 Pro với chip A17 Pro, khung titan, camera mạnh mẽ, sạc USB‑C.'
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    price: 25990000,
    category: 'Laptop',
    image: '/img/macbook-air-m2.jpg',
    vouchers: ['Giảm 100k'],
    shipping: { area: 'Toàn quốc', feeText: 'Freeship đơn từ 0đ' },
    variants: { colors: ['Bạc', 'Xám'], sizes: [] },
    shop: { name: 'V-Market Store', rating: 4.8, followers: '150k', avatar: '/img/shop-avatar.png' },
    specs: [
      ['CPU', 'Apple M2'],
      ['RAM', '8GB'],
      ['SSD', '256GB'],
      ['Màn hình', '13.6" Liquid Retina'],
    ],
    description: 'MacBook Air M2 thiết kế mỏng nhẹ, hiệu năng cao, pin bền bỉ.'
  },
  {
    id: 3,
    name: 'Áo Hoodie Unisex',
    price: 299000,
    category: 'Thời trang',
    image: '/img/ao-hoodie-unisex.jpg',
    vouchers: ['Giảm 10k'],
    shipping: { area: 'Toàn quốc', feeText: '15k - 30k' },
    variants: { colors: ['Đen', 'Trắng', 'Be'], sizes: ['S','M','L','XL'] },
    shop: { name: 'VM Fashion', rating: 4.7, followers: '80k', avatar: '/img/shop-avatar.png' },
    specs: [
      ['Chất liệu', 'Cotton'],
      ['Phong cách', 'Unisex'],
    ],
    description: 'Hoodie form rộng, chất cotton dày dặn, thoải mái, trẻ trung.'
  },
  {
    id: 4,
    name: 'Son Môi Lì',
    price: 199000,
    category: 'Mỹ phẩm',
    image: '/img/son-moi-li.jpg',
    vouchers: ['Freeship Xtra'],
    shipping: { area: 'Toàn quốc', feeText: '0đ - 20k' },
    variants: { colors: ['Đỏ gạch', 'Hồng đất', 'Cam cháy'], sizes: [] },
    shop: { name: 'VM Beauty', rating: 4.9, followers: '210k', avatar: '/img/shop-avatar.png' },
    specs: [
      ['Loại', 'Son lì'],
      ['Khối lượng', '3.5g'],
    ],
    description: 'Son lì mịn mượt, bền màu, không khô môi.'
  },
  {
    id: 5,
    name: 'Nồi Chiên Không Dầu',
    price: 1599000,
    category: 'Gia dụng',
    image: '/img/noi-chien-khong-dau.jpg',
    vouchers: ['Giảm 30k'],
    shipping: { area: 'Toàn quốc', feeText: 'Freeship đơn từ 0đ' },
    variants: { colors: ['Đen'], sizes: [] },
    shop: { name: 'VM Home', rating: 4.6, followers: '45k', avatar: '/img/shop-avatar.png' },
    specs: [
      ['Dung tích', '5L'],
      ['Công suất', '1500W'],
    ],
    description: 'Nồi chiên không dầu dung tích lớn, dễ vệ sinh, tiết kiệm thời gian.'
  },
  {
    id: 6,
    name: 'Giày Chạy Bộ',
    price: 899000,
    category: 'Thể thao',
    image: '/img/giay-chay-bo.jpg',
    vouchers: ['Giảm 20k'],
    shipping: { area: 'Toàn quốc', feeText: '15k - 25k' },
    variants: { colors: ['Đen', 'Xanh'], sizes: ['39','40','41','42','43'] },
    shop: { name: 'VM Sport', rating: 4.7, followers: '60k', avatar: '/img/shop-avatar.png' },
    specs: [
      ['Chất liệu', 'Mesh + EVA'],
      ['Công dụng', 'Chạy bộ, tập gym'],
    ],
    description: 'Đế êm, bám tốt, hỗ trợ chuyển động mượt mà.'
  },
  {
    id: 7,
    name: 'Bộ Lego Sáng Tạo',
    price: 499000,
    category: 'Đồ chơi',
    image: '/img/bo-lego-sang-tao.jpg',
    vouchers: ['Giảm 10k', 'Freeship'],
    shipping: { area: 'Toàn quốc', feeText: '0đ - 20k' },
    variants: { colors: [], sizes: [] },
    shop: { name: 'VM Kids', rating: 4.8, followers: '30k', avatar: '/img/shop-avatar.png' },
    specs: [
      ['Độ tuổi', '6+'],
      ['Chất liệu', 'Nhựa ABS an toàn'],
    ],
    description: 'Kích thích sáng tạo, nhiều mảnh ghép đa dạng.'
  },
]

export function getProductById(id) {
  const numericId = Number(id)
  return PRODUCTS.find(p => p.id === numericId)
}
