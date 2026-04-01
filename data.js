// LUXORA - Product Data Catalog
// All images are real photographs from Unsplash (not AI-generated)

const BRANDS = ['LUXORA', 'Artisan & Webb', 'Maison Claire', 'Nordic Studio', 'Valenté'];

const CATEGORIES = [
  { id: 'men', name: "Men's Collection", icon: '👔' },
  { id: 'women', name: "Women's Collection", icon: '👗' },
  { id: 'footwear', name: 'Footwear', icon: '👟' },
  { id: 'accessories', name: 'Accessories', icon: '⌚' },
  { id: 'bags', name: 'Bags & Luggage', icon: '👜' }
];

const SIZES = {
  clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  footwear: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
  accessories: ['One Size'],
  bags: ['One Size']
};

const PRODUCTS = [
  {
    id: 1,
    name: 'Tailored Navy Suit',
    description: 'Impeccably crafted from premium Italian wool, this tailored navy suit features a modern slim fit, half-canvas construction, and hand-finished details. Perfect for boardroom meetings or evening occasions.',
    price: 895,
    originalPrice: 1200,
    category: 'men',
    subcategory: 'Suits',
    brand: 'Valenté',
    sizes: SIZES.clothing,
    colors: ['Navy', 'Charcoal', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    newArrival: false,
    bestSeller: true
  },
  {
    id: 2,
    name: 'Classic Oxford Shirt',
    description: 'A wardrobe essential crafted from 100% Egyptian cotton. Features a button-down collar, single-needle stitching, and a comfortable regular fit that transitions seamlessly from office to weekend.',
    price: 145,
    originalPrice: null,
    category: 'men',
    subcategory: 'Shirts',
    brand: 'LUXORA',
    sizes: SIZES.clothing,
    colors: ['White', 'Light Blue', 'Pink'],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: true
  },
  {
    id: 3,
    name: 'Slim Fit Chinos',
    description: 'These premium chinos are made from stretch-infused cotton twill for all-day comfort. The slim tapered leg and clean front create a refined silhouette perfect for smart-casual dressing.',
    price: 120,
    originalPrice: 160,
    category: 'men',
    subcategory: 'Pants',
    brand: 'Nordic Studio',
    sizes: SIZES.clothing,
    colors: ['Khaki', 'Navy', 'Olive'],
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.5,
    reviews: 67,
    inStock: true,
    featured: false,
    newArrival: true,
    bestSeller: false
  },
  {
    id: 4,
    name: 'Merino Wool Sweater',
    description: 'Luxuriously soft merino wool V-neck sweater, perfect for layering. Features ribbed cuffs and hem, with a relaxed yet refined fit that works with everything from jeans to dress pants.',
    price: 195,
    originalPrice: null,
    category: 'men',
    subcategory: 'Knitwear',
    brand: 'Artisan & Webb',
    sizes: SIZES.clothing,
    colors: ['Burgundy', 'Camel', 'Grey'],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.7,
    reviews: 45,
    inStock: true,
    featured: true,
    newArrival: false,
    bestSeller: false
  },
  {
    id: 5,
    name: 'Premium Denim Jacket',
    description: 'Classic trucker-style denim jacket crafted from heavy-weight selvedge denim. Features copper hardware, adjustable waist tabs, and a comfortable fit that improves with age.',
    price: 265,
    originalPrice: null,
    category: 'men',
    subcategory: 'Outerwear',
    brand: 'LUXORA',
    sizes: SIZES.clothing,
    colors: ['Indigo', 'Washed Blue', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    featured: true,
    newArrival: false,
    bestSeller: true
  },
  {
    id: 6,
    name: 'Silk Evening Gown',
    description: 'A breathtaking floor-length evening gown in lustrous silk charmeuse. Features a draped cowl neckline, open back detail, and a flowing silhouette that moves beautifully.',
    price: 1250,
    originalPrice: 1600,
    category: 'women',
    subcategory: 'Dresses',
    brand: 'Valenté',
    sizes: SIZES.clothing,
    colors: ['Emerald', 'Midnight Blue', 'Champagne'],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.9,
    reviews: 78,
    inStock: true,
    featured: true,
    newArrival: false,
    bestSeller: true
  },
  {
    id: 7,
    name: 'Silk Wrap Blouse',
    description: 'Elegant wrap blouse in pure silk crepe de chine. The flattering crossover design, balloon sleeves, and self-tie waist create a feminine silhouette suitable for work or evening wear.',
    price: 285,
    originalPrice: null,
    category: 'women',
    subcategory: 'Tops',
    brand: 'Maison Claire',
    sizes: SIZES.clothing,
    colors: ['Ivory', 'Blush', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.6,
    reviews: 92,
    inStock: true,
    featured: false,
    newArrival: true,
    bestSeller: false
  },
  {
    id: 8,
    name: 'Structured Blazer',
    description: 'A power piece in double-faced wool. This structured blazer features peaked lapels, a single-button closure, and princess seams for a sculpted fit that commands attention.',
    price: 485,
    originalPrice: null,
    category: 'women',
    subcategory: 'Blazers',
    brand: 'Artisan & Webb',
    sizes: SIZES.clothing,
    colors: ['Camel', 'Black', 'Check'],
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.7,
    reviews: 63,
    inStock: true,
    featured: true,
    newArrival: false,
    bestSeller: false
  },
  {
    id: 9,
    name: 'Floral Midi Dress',
    description: 'A romantic midi dress in printed viscose with a fitted bodice and flowing skirt. Features puff sleeves, a sweetheart neckline, and a concealed back zip. Perfect for garden parties.',
    price: 320,
    originalPrice: 420,
    category: 'women',
    subcategory: 'Dresses',
    brand: 'Nordic Studio',
    sizes: SIZES.clothing,
    colors: ['Floral Print', 'Blue Floral', 'Rose'],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.4,
    reviews: 51,
    inStock: true,
    featured: false,
    newArrival: true,
    bestSeller: false
  },
  {
    id: 10,
    name: 'Cashmere Cardigan',
    description: 'Pure Grade-A Mongolian cashmere cardigan with mother-of-pearl buttons. Lightweight yet incredibly warm, this versatile piece is the ultimate luxury layering essential.',
    price: 450,
    originalPrice: null,
    category: 'women',
    subcategory: 'Knitwear',
    brand: 'LUXORA',
    sizes: SIZES.clothing,
    colors: ['Oatmeal', 'Soft Pink', 'Grey'],
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.8,
    reviews: 109,
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: true
  },
  {
    id: 11,
    name: 'Italian Leather Sneakers',
    description: 'Minimalist sneakers handcrafted in Italy from full-grain calfskin leather. Features a cushioned insole, margom rubber sole, and clean lines that elevate any casual outfit.',
    price: 385,
    originalPrice: null,
    category: 'footwear',
    subcategory: 'Sneakers',
    brand: 'Valenté',
    sizes: SIZES.footwear,
    colors: ['White', 'Black', 'Off-White'],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.7,
    reviews: 201,
    inStock: true,
    featured: true,
    newArrival: false,
    bestSeller: true
  },
  {
    id: 12,
    name: 'Classic Stiletto Heels',
    description: 'Timeless pointed-toe stilettos in patent leather. The 90mm heel height offers the perfect balance of elegance and comfort, with a padded insole for all-day wear.',
    price: 595,
    originalPrice: 750,
    category: 'footwear',
    subcategory: 'Heels',
    brand: 'Maison Claire',
    sizes: SIZES.footwear,
    colors: ['Black Patent', 'Nude', 'Red'],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.5,
    reviews: 87,
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: false
  },
  {
    id: 13,
    name: 'Suede Chelsea Boots',
    description: 'Classic Chelsea boots in supple Italian suede. Features elastic side panels, a leather pull tab, and a Blake-stitched leather sole. A versatile boot for any season.',
    price: 425,
    originalPrice: null,
    category: 'footwear',
    subcategory: 'Boots',
    brand: 'Artisan & Webb',
    sizes: SIZES.footwear,
    colors: ['Tan', 'Black', 'Dark Brown'],
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.8,
    reviews: 134,
    inStock: true,
    featured: true,
    newArrival: false,
    bestSeller: true
  },
  {
    id: 14,
    name: 'Performance Running Shoes',
    description: 'Engineered for performance with responsive cushioning, breathable mesh upper, and a lightweight design. Carbon-fiber plate technology provides energy return with every stride.',
    price: 220,
    originalPrice: 280,
    category: 'footwear',
    subcategory: 'Sneakers',
    brand: 'Nordic Studio',
    sizes: SIZES.footwear,
    colors: ['Red/Black', 'White/Grey', 'Blue'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.6,
    reviews: 312,
    inStock: true,
    featured: false,
    newArrival: true,
    bestSeller: true
  },
  {
    id: 15,
    name: 'Penny Loafers',
    description: 'Hand-sewn penny loafers in burnished calfskin. The Goodyear-welted construction ensures longevity, while the leather sole develops a beautiful patina over time.',
    price: 345,
    originalPrice: null,
    category: 'footwear',
    subcategory: 'Loafers',
    brand: 'LUXORA',
    sizes: SIZES.footwear,
    colors: ['Cognac', 'Black', 'Burgundy'],
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.7,
    reviews: 76,
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: false
  },
  {
    id: 16,
    name: 'Swiss Chronograph Watch',
    description: 'A precision timepiece with Swiss automatic movement, sapphire crystal, and a 42mm stainless steel case. Features chronograph subdials and 100m water resistance.',
    price: 2450,
    originalPrice: null,
    category: 'accessories',
    subcategory: 'Watches',
    brand: 'Valenté',
    sizes: SIZES.accessories,
    colors: ['Silver/Blue', 'Gold/Black', 'Rose Gold'],
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.9,
    reviews: 245,
    inStock: true,
    featured: true,
    newArrival: false,
    bestSeller: true
  },
  {
    id: 17,
    name: 'Aviator Sunglasses',
    description: 'Iconic aviator sunglasses with polarized mineral glass lenses and a lightweight titanium frame. Provides 100% UV protection with unmatched optical clarity.',
    price: 295,
    originalPrice: null,
    category: 'accessories',
    subcategory: 'Sunglasses',
    brand: 'LUXORA',
    sizes: SIZES.accessories,
    colors: ['Gold/Green', 'Silver/Blue', 'Black/Grey'],
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.6,
    reviews: 178,
    inStock: true,
    featured: false,
    newArrival: true,
    bestSeller: false
  },
  {
    id: 18,
    name: 'Italian Leather Belt',
    description: 'Handcrafted from full-grain Italian leather with a solid brass buckle. The belt develops a rich patina over time, making each piece uniquely yours.',
    price: 165,
    originalPrice: null,
    category: 'accessories',
    subcategory: 'Belts',
    brand: 'Artisan & Webb',
    sizes: ['S (30-32)', 'M (34-36)', 'L (38-40)', 'XL (42-44)'],
    colors: ['Brown', 'Black', 'Tan'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.5,
    reviews: 94,
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: false
  },
  {
    id: 19,
    name: 'Cashmere Scarf',
    description: 'Woven from the finest Mongolian cashmere, this generously sized scarf is incredibly soft and warm. The timeless design makes it a versatile accessory for any occasion.',
    price: 225,
    originalPrice: 295,
    category: 'accessories',
    subcategory: 'Scarves',
    brand: 'Maison Claire',
    sizes: SIZES.accessories,
    colors: ['Camel', 'Grey', 'Navy'],
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.7,
    reviews: 62,
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: false
  },
  {
    id: 20,
    name: 'Leather Tote Bag',
    description: 'A spacious tote handcrafted from vegetable-tanned leather. Features an organized interior with laptop compartment, zip pocket, and card slots. Ages beautifully with use.',
    price: 685,
    originalPrice: null,
    category: 'bags',
    subcategory: 'Totes',
    brand: 'LUXORA',
    sizes: SIZES.bags,
    colors: ['Cognac', 'Black', 'Olive'],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.8,
    reviews: 167,
    inStock: true,
    featured: true,
    newArrival: false,
    bestSeller: true
  },
  {
    id: 21,
    name: 'Crossbody Bag',
    description: 'Compact yet spacious crossbody bag in pebbled leather with an adjustable strap. Features a magnetic flap closure, interior zip pocket, and polished hardware details.',
    price: 395,
    originalPrice: 495,
    category: 'bags',
    subcategory: 'Crossbody',
    brand: 'Maison Claire',
    sizes: SIZES.bags,
    colors: ['Tan', 'Black', 'Burgundy'],
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.5,
    reviews: 83,
    inStock: true,
    featured: false,
    newArrival: true,
    bestSeller: false
  },
  {
    id: 22,
    name: 'Canvas Travel Backpack',
    description: 'Rugged yet refined travel backpack in waxed canvas with leather trim. Features a padded laptop sleeve, multiple organizer pockets, and comfortable ergonomic straps.',
    price: 295,
    originalPrice: null,
    category: 'bags',
    subcategory: 'Backpacks',
    brand: 'Nordic Studio',
    sizes: SIZES.bags,
    colors: ['Olive', 'Navy', 'Grey'],
    images: [
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.6,
    reviews: 129,
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: true
  },
  {
    id: 23,
    name: 'Satin Evening Clutch',
    description: 'An exquisite evening clutch in duchesse satin with crystal-embellished clasp. Features a detachable chain strap for versatile carrying options. Lined in silk.',
    price: 545,
    originalPrice: null,
    category: 'bags',
    subcategory: 'Clutches',
    brand: 'Valenté',
    sizes: SIZES.bags,
    colors: ['Gold', 'Silver', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.8,
    reviews: 56,
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: false
  },
  {
    id: 24,
    name: 'Premium Cotton Hoodie',
    description: 'Heavyweight French terry hoodie in 100% organic cotton. Features a relaxed fit, kangaroo pocket, and brushed fleece interior for supreme comfort. Minimal branding for understated style.',
    price: 175,
    originalPrice: null,
    category: 'men',
    subcategory: 'Knitwear',
    brand: 'LUXORA',
    sizes: SIZES.clothing,
    colors: ['Heather Grey', 'Black', 'Navy'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop&q=80'
    ],
    rating: 4.7,
    reviews: 234,
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: true
  }
];

// Hero images for homepage banners (real Unsplash photographs)
const HERO_IMAGES = {
  main: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop&q=80',
  secondary: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&fit=crop&q=80',
  tertiary: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=900&fit=crop&q=80'
};

// Category banner images
const CATEGORY_IMAGES = {
  men: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=500&fit=crop&q=80',
  women: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=500&fit=crop&q=80',
  footwear: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=500&fit=crop&q=80',
  accessories: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=500&fit=crop&q=80',
  bags: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=500&fit=crop&q=80'
};
