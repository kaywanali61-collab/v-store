export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  specs: { label: string; value: string }[];
  badge?: string;
  inStock: boolean;
  features: string[];
  colors?: string[];
  trending?: boolean;
  featured?: boolean;
  deal?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  product: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Vortex Pro X1 Mechanical Keyboard",
    price: 179,
    originalPrice: 229,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 342,
    description: "Experience the future of gaming with the Vortex Pro X1. Featuring hot-swappable mechanical switches, per-key RGB lighting with 16.8 million colors, and an aerospace-grade aluminum frame. The ergonomic design ensures comfort during extended gaming sessions while the customizable macros give you the competitive edge you need to dominate every match.",
    shortDescription: "Premium mechanical gaming keyboard with hot-swap switches and per-key RGB",
    specs: [
      { label: "Switch Type", value: "Cherry MX Speed Silver" },
      { label: "Layout", value: "Full-size (104 keys)" },
      { label: "Backlight", value: "Per-key RGB (16.8M colors)" },
      { label: "Connection", value: "USB-C / Bluetooth 5.1" },
      { label: "Frame", value: "CNC Aluminum" },
      { label: "Weight", value: "1.2 kg" },
    ],
    badge: "Best Seller",
    inStock: true,
    features: ["Hot-swappable switches", "Per-key RGB with 16.8M colors", "Aerospace-grade aluminum frame", "Wireless & wired dual mode", "Customizable macros", "On-board memory for 5 profiles"],
    colors: ["Space Black", "Lunar White"],
    trending: true,
    featured: true,
    deal: true,
  },
  {
    id: 2,
    name: "Phantom Strike Wireless Mouse",
    price: 89,
    originalPrice: 119,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 518,
    description: "The Phantom Strike redefines precision gaming. With its ultra-lightweight 58g design, 25,600 DPI optical sensor, and zero-latency wireless technology, every flick and tracking movement is executed with surgical precision. The ergonomic shell provides the perfect grip for marathon gaming sessions.",
    shortDescription: "Ultra-light 58g wireless gaming mouse with 25,600 DPI sensor",
    specs: [
      { label: "Sensor", value: "PAW3395 Optical" },
      { label: "DPI", value: "Up to 25,600" },
      { label: "Weight", value: "58g (without cable)" },
      { label: "Battery", value: "80 hours" },
      { label: "Switches", value: "Kailh GM 8.0" },
      { label: "Connection", value: "2.4GHz / Bluetooth / USB-C" },
    ],
    badge: "Popular",
    inStock: true,
    features: ["Ultra-lightweight 58g design", "25,600 DPI optical sensor", "Zero-latency wireless", "80-hour battery life", "Customizable RGB lighting", "5 onboard profiles"],
    colors: ["Matte Black", "Ghost White"],
    trending: true,
    featured: true,
    deal: true,
  },
  {
    id: 3,
    name: "Eclipse 7.1 Gaming Headset",
    price: 149,
    originalPrice: 199,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 287,
    description: "Immerse yourself in virtual 7.1 surround sound with the Eclipse headset. Featuring 50mm titanium-coated drivers, memory foam ear cushions with cooling gel, and a detachable noise-cancelling microphone. Built for competitive gaming and marathon streaming sessions alike.",
    shortDescription: "Virtual 7.1 surround sound headset with 50mm titanium drivers",
    specs: [
      { label: "Driver Size", value: "50mm Titanium" },
      { label: "Surround", value: "Virtual 7.1" },
      { label: "Mic", value: "Detachable Noise-Cancelling" },
      { label: "Battery", value: "40 hours" },
      { label: "Weight", value: "320g" },
      { label: "Connection", value: "2.4GHz / USB-C / 3.5mm" },
    ],
    badge: "Top Rated",
    inStock: true,
    features: ["Virtual 7.1 surround sound", "50mm titanium-coated drivers", "Memory foam + cooling gel cushions", "Detachable noise-cancelling mic", "40-hour battery life", "Multi-platform compatible"],
    trending: true,
    featured: true,
  },
  {
    id: 4,
    name: "Nova X Ultra Smartphone",
    price: 799,
    originalPrice: 899,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 891,
    description: "The Nova X Ultra pushes the boundaries of mobile technology. Its 6.8\" AMOLED display with 120Hz refresh rate delivers stunning visuals, while the Snapdragon 8 Gen 3 processor ensures buttery-smooth performance. The 200MP camera system captures life in extraordinary detail.",
    shortDescription: "Flagship smartphone with 200MP camera and 120Hz AMOLED display",
    specs: [
      { label: "Display", value: "6.8\" AMOLED, 120Hz" },
      { label: "Processor", value: "Snapdragon 8 Gen 3" },
      { label: "RAM", value: "12GB LPDDR5X" },
      { label: "Storage", value: "256GB / 512GB" },
      { label: "Camera", value: "200MP + 50MP + 12MP" },
      { label: "Battery", value: "5000mAh, 100W charging" },
    ],
    badge: "New",
    inStock: true,
    features: ["6.8\" AMOLED 120Hz display", "Snapdragon 8 Gen 3", "200MP triple camera system", "5000mAh with 100W fast charging", "Under-display fingerprint", "IP68 water resistant"],
    colors: ["Obsidian", "Stellar Blue", "Phantom White"],
    trending: true,
    featured: true,
    deal: true,
  },
  {
    id: 5,
    name: "Pulse Pro Smartwatch",
    price: 249,
    originalPrice: 299,
    category: "wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 423,
    description: "Stay connected and track your fitness with the Pulse Pro. Featuring a stunning 1.9\" always-on AMOLED display, advanced health monitoring with ECG and SpO2, 14-day battery life, and 100+ workout modes. Your ultimate health and lifestyle companion.",
    shortDescription: "Premium smartwatch with AMOLED display and 14-day battery",
    specs: [
      { label: "Display", value: "1.9\" AMOLED, Always-On" },
      { label: "Battery", value: "14 days typical use" },
      { label: "Water Resistance", value: "5 ATM (50m)" },
      { label: "Sensors", value: "Heart rate, SpO2, ECG, GPS" },
      { label: "Compatibility", value: "iOS & Android" },
      { label: "Weight", value: "36g (without strap)" },
    ],
    inStock: true,
    features: ["1.9\" always-on AMOLED display", "ECG + SpO2 health monitoring", "14-day battery life", "Built-in GPS", "100+ workout modes", "Quick-release straps"],
    colors: ["Midnight Black", "Silver Frost", "Rose Gold"],
    trending: true,
    featured: false,
  },
  {
    id: 6,
    name: "Titan Controller Pro",
    price: 69,
    originalPrice: 89,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&q=80",
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 654,
    description: "The Titan Controller Pro offers precision control with Hall Effect triggers and thumbsticks that never develop drift. Custom back paddles, interchangeable thumbstick heights, and game-specific profiles make this the ultimate controller for competitive and casual gaming.",
    shortDescription: "Pro gaming controller with Hall Effect triggers and zero-drift sticks",
    specs: [
      { label: "Triggers", value: "Hall Effect" },
      { label: "Thumbsticks", value: "Hall Effect (zero drift)" },
      { label: "Back Paddles", value: "4 programmable" },
      { label: "Battery", value: "30 hours" },
      { label: "Connection", value: "2.4GHz / Bluetooth / USB-C" },
      { label: "Compatibility", value: "PC, PS5, Switch, Mobile" },
    ],
    badge: "Best Value",
    inStock: true,
    features: ["Hall Effect triggers & sticks", "Zero-drift technology", "4 programmable back paddles", "30-hour battery life", "Multi-platform compatible", "Custom thumbstick heights"],
    trending: false,
    featured: true,
    deal: true,
  },
  {
    id: 7,
    name: "Horizon 34\" Curved Monitor",
    price: 549,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
      "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 198,
    description: "Immerse yourself in the ultra-wide 34\" curved display with 3440x1440 resolution and 165Hz refresh rate. Quantum dot technology delivers 98% DCI-P3 color gamut while HDR600 ensures every scene pops with lifelike contrast. The perfect monitor for gaming and creative work.",
    shortDescription: "34\" ultrawide curved QHD monitor with 165Hz and HDR600",
    specs: [
      { label: "Size", value: "34\" Ultrawide Curved" },
      { label: "Resolution", value: "3440 x 1440 (UWQHD)" },
      { label: "Refresh Rate", value: "165Hz" },
      { label: "Response Time", value: "1ms (GtG)" },
      { label: "HDR", value: "HDR600" },
      { label: "Color", value: "98% DCI-P3, Quantum Dot" },
    ],
    badge: "Premium",
    inStock: true,
    features: ["34\" ultrawide curved display", "3440x1440 at 165Hz", "1ms response time", "HDR600 with Quantum Dot", "98% DCI-P3 color gamut", "USB-C with 90W power delivery"],
    trending: true,
    featured: true,
  },
  {
    id: 8,
    name: "Aura Buds Pro",
    price: 129,
    originalPrice: 159,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=800&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 712,
    description: "The Aura Buds Pro deliver studio-quality sound with adaptive ANC that intelligently adjusts to your environment. Hi-Res Audio certification, 36-hour total battery, and seamless multipoint connection between your phone, laptop, and tablet. Sound has never been this effortless.",
    shortDescription: "Hi-Res wireless earbuds with adaptive ANC and 36hr battery",
    specs: [
      { label: "Driver", value: "11mm Custom Dynamic" },
      { label: "ANC", value: "Adaptive (up to -48dB)" },
      { label: "Codec", value: "LDAC, aptX Adaptive, AAC" },
      { label: "Battery", value: "8h + 28h (case)" },
      { label: "Water Resistance", value: "IP55" },
      { label: "Weight", value: "5.2g per earbud" },
    ],
    inStock: true,
    features: ["Hi-Res Audio certified", "Adaptive ANC up to -48dB", "36-hour total battery", "Multipoint connection", "IP55 water resistant", "Wireless charging case"],
    colors: ["Onyx Black", "Pearl White", "Teal"],
    trending: true,
    featured: false,
    deal: true,
  },
  {
    id: 9,
    name: "Apex Blade 16\" Gaming Laptop",
    price: 1499,
    originalPrice: 1799,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 156,
    description: "Desktop-class power in a portable form factor. The Apex Blade features an Intel i9-14900HX, NVIDIA RTX 4080, and a stunning 16\" 240Hz mini-LED display. Vapor chamber cooling keeps temperatures low while the CNC aluminum chassis exudes premium craftsmanship.",
    shortDescription: "i9 + RTX 4080 gaming laptop with 240Hz mini-LED display",
    specs: [
      { label: "Processor", value: "Intel Core i9-14900HX" },
      { label: "GPU", value: "NVIDIA RTX 4080 (12GB)" },
      { label: "Display", value: "16\" 240Hz mini-LED" },
      { label: "RAM", value: "32GB DDR5-5600" },
      { label: "Storage", value: "1TB PCIe Gen5 NVMe" },
      { label: "Battery", value: "99.9Wh" },
    ],
    badge: "Powerhouse",
    inStock: true,
    features: ["Intel i9-14900HX processor", "NVIDIA RTX 4080 graphics", "16\" 240Hz mini-LED display", "32GB DDR5 RAM", "Vapor chamber cooling", "CNC aluminum unibody"],
    trending: true,
    featured: true,
    deal: true,
  },
  {
    id: 10,
    name: "Zenith 11\" Tablet Pro",
    price: 599,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
      "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 334,
    description: "The Zenith Tablet Pro is your portable creative studio. Its 11\" 2K OLED display with 120Hz delivers breathtaking colors, while the included stylus with 4096 pressure levels makes drawing and note-taking feel natural. Powered by a flagship chipset for smooth multitasking.",
    shortDescription: "11\" OLED tablet with included stylus and 120Hz display",
    specs: [
      { label: "Display", value: "11\" OLED, 2K, 120Hz" },
      { label: "Processor", value: "Snapdragon 8 Gen 2" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "128GB / 256GB" },
      { label: "Stylus", value: "Included, 4096 pressure levels" },
      { label: "Battery", value: "8000mAh" },
    ],
    inStock: true,
    features: ["11\" OLED 120Hz display", "Included precision stylus", "Snapdragon 8 Gen 2", "Quad speakers with Dolby Atmos", "Desktop mode with keyboard", "All-day battery life"],
    colors: ["Graphite", "Cloud Blue"],
    trending: false,
    featured: false,
  },
  {
    id: 11,
    name: "Sonic Boom Portable Speaker",
    price: 99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&q=80",
    ],
    rating: 4.4,
    reviewCount: 567,
    description: "Fill any space with immersive 360° sound. The Sonic Boom features dual passive radiators for deep bass, an IP67 waterproof rating for any adventure, and 24 hours of playback. Pair two for true stereo and transform any gathering into an experience.",
    shortDescription: "360° portable speaker with IP67 and 24-hour battery",
    specs: [
      { label: "Drivers", value: "Dual 55mm + Passive Radiators" },
      { label: "Output", value: "30W RMS" },
      { label: "Battery", value: "24 hours" },
      { label: "Water Resistance", value: "IP67" },
      { label: "Bluetooth", value: "5.3" },
      { label: "Weight", value: "680g" },
    ],
    inStock: true,
    features: ["360° immersive sound", "Deep bass with passive radiators", "IP67 waterproof & dustproof", "24-hour battery life", "Stereo pairing", "USB-C fast charging"],
    colors: ["Midnight", "Electric Blue", "Sunset Orange"],
    trending: false,
    featured: false,
  },
  {
    id: 12,
    name: "Vision 4K Webcam Pro",
    price: 129,
    originalPrice: 169,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1587826354460-e41b9e0f63b4?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1587826354460-e41b9e0f63b4?w=800&q=80",
    ],
    rating: 4.3,
    reviewCount: 289,
    description: "Look your best on every call and stream. The Vision 4K Pro delivers stunning 4K resolution at 60fps with AI-powered auto-framing, background blur, and low-light correction. Studio-quality video has never been this accessible.",
    shortDescription: "4K 60fps webcam with AI auto-framing and background blur",
    specs: [
      { label: "Resolution", value: "4K @ 60fps" },
      { label: "FOV", value: "90° adjustable" },
      { label: "AI Features", value: "Auto-frame, Background Blur" },
      { label: "Mic", value: "Dual noise-cancelling" },
      { label: "Mount", value: "Universal clip + tripod" },
      { label: "Connection", value: "USB-C" },
    ],
    inStock: true,
    features: ["4K resolution at 60fps", "AI-powered auto-framing", "Background blur & replacement", "Dual noise-cancelling mics", "Low-light correction", "Privacy shutter"],
    trending: false,
    featured: false,
    deal: true,
  },
  {
    id: 13,
    name: "Flux 75% Mechanical Keyboard",
    price: 139,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 445,
    description: "Compact perfection meets premium build quality. The Flux 75% features a CNC aluminum case, hot-swappable switches, gasket-mount design for the perfect typing feel, and south-facing RGB. Perfect for minimalist setups that demand performance.",
    shortDescription: "Compact 75% gasket-mount keyboard with aluminum case",
    specs: [
      { label: "Layout", value: "75% (84 keys)" },
      { label: "Mount", value: "Gasket" },
      { label: "Case", value: "CNC Aluminum" },
      { label: "Switches", value: "Hot-swappable (5-pin)" },
      { label: "Keycaps", value: "Double-shot PBT" },
      { label: "Connection", value: "USB-C / 2.4GHz / Bluetooth" },
    ],
    inStock: true,
    features: ["75% compact layout", "Gasket-mount design", "CNC aluminum case", "Hot-swappable switches", "Double-shot PBT keycaps", "Tri-mode connectivity"],
    trending: false,
    featured: false,
  },
  {
    id: 14,
    name: "Nebula VR Headset",
    price: 399,
    originalPrice: 499,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80",
    ],
    rating: 4.4,
    reviewCount: 178,
    description: "Step into new realities with the Nebula VR. Featuring 4K+ resolution per eye, 120Hz refresh rate, inside-out tracking, and hand tracking without controllers. With a growing library of 500+ games and experiences, this is your portal to the metaverse.",
    shortDescription: "4K+ standalone VR headset with hand tracking",
    specs: [
      { label: "Resolution", value: "4K+ per eye (LCD)" },
      { label: "Refresh Rate", value: "90Hz / 120Hz" },
      { label: "FOV", value: "110°" },
      { label: "Tracking", value: "6DoF Inside-out + Hand" },
      { label: "Storage", value: "256GB" },
      { label: "Weight", value: "480g" },
    ],
    badge: "New",
    inStock: true,
    features: ["4K+ resolution per eye", "Hand tracking technology", "6DoF inside-out tracking", "256GB built-in storage", "500+ games & experiences", "Wireless standalone design"],
    trending: true,
    featured: true,
    deal: true,
  },
  {
    id: 15,
    name: "Chronos Fitness Band",
    price: 59,
    category: "wearables",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
    ],
    rating: 4.3,
    reviewCount: 834,
    description: "Your health on your wrist, simplified. The Chronos Fitness Band tracks heart rate, sleep, SpO2, and 30+ workout types with 21-day battery life. The ultra-light 22g design means you'll forget you're wearing it — until it reminds you to move.",
    shortDescription: "Ultra-light fitness band with 21-day battery and SpO2 tracking",
    specs: [
      { label: "Display", value: "1.47\" AMOLED" },
      { label: "Battery", value: "21 days" },
      { label: "Weight", value: "22g" },
      { label: "Water Resistance", value: "5 ATM" },
      { label: "Sensors", value: "Heart rate, SpO2, Accelerometer" },
      { label: "Workouts", value: "30+ modes" },
    ],
    inStock: true,
    features: ["1.47\" AMOLED display", "21-day battery life", "Ultra-light 22g design", "Heart rate & SpO2 monitoring", "30+ workout modes", "Smart notifications"],
    colors: ["Black", "Navy", "Pink"],
    trending: false,
    featured: false,
  },
  {
    id: 16,
    name: "Quantum 100W GaN Charger",
    price: 45,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 1243,
    description: "One charger to power them all. The Quantum 100W GaN charger features 3 USB-C and 1 USB-A port, intelligently distributing power to charge your laptop, phone, tablet, and earbuds simultaneously. 50% smaller than traditional chargers with foldable prongs for travel.",
    shortDescription: "100W GaN charger with 4 ports for all your devices",
    specs: [
      { label: "Max Output", value: "100W (USB-C1)" },
      { label: "Ports", value: "3x USB-C + 1x USB-A" },
      { label: "Technology", value: "GaN (Gallium Nitride)" },
      { label: "Protocols", value: "PD 3.1, QC 4+, PPS" },
      { label: "Size", value: "50% smaller than 96W" },
      { label: "Weight", value: "185g" },
    ],
    badge: "Best Seller",
    inStock: true,
    features: ["100W max output", "3 USB-C + 1 USB-A ports", "GaN technology (compact)", "Charges laptop + 3 devices", "Universal compatibility", "Foldable prongs for travel"],
    trending: true,
    featured: false,
  },
];

export const categories: Category[] = [
  {
    id: "gaming",
    name: "Gaming",
    description: "Professional-grade peripherals and hardware for competitive and casual gamers.",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=600&q=80",
    productCount: 8,
  },
  {
    id: "mobile",
    name: "Mobile & Audio",
    description: "Premium smartphones, tablets, and wireless audio for the connected lifestyle.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    productCount: 4,
  },
  {
    id: "wearables",
    name: "Wearables",
    description: "Smartwatches and fitness trackers that blend technology with everyday style.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    productCount: 2,
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Essential tech accessories designed to complement and enhance your devices.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    productCount: 3,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed K.",
    role: "Pro Gamer",
    rating: 5,
    text: "The Vortex Pro X1 keyboard completely transformed my gaming experience. The build quality is insane and the RGB customization is next level. Best purchase I've made this year.",
    product: "Vortex Pro X1 Keyboard",
  },
  {
    id: 2,
    name: "Sara M.",
    role: "Content Creator",
    rating: 5,
    text: "I switched to the Nova X Ultra and I'm never going back. The camera quality is absolutely stunning for my content, and the display is gorgeous. V Store delivered it the next day!",
    product: "Nova X Ultra Smartphone",
  },
  {
    id: 3,
    name: "Dara R.",
    role: "Software Engineer",
    rating: 5,
    text: "The Apex Blade laptop handles everything I throw at it — from compiling massive projects to running AAA games at max settings. The build quality rivals laptops twice its price.",
    product: "Apex Blade Gaming Laptop",
  },
  {
    id: 4,
    name: "Lana T.",
    role: "Fitness Coach",
    rating: 4,
    text: "The Pulse Pro smartwatch has been a game changer for tracking my clients' workouts. The health monitoring features are incredibly accurate and the battery lasts forever.",
    product: "Pulse Pro Smartwatch",
  },
  {
    id: 5,
    name: "Ryan P.",
    role: "Streamer",
    rating: 5,
    text: "The Eclipse headset's 7.1 surround sound gives me a competitive advantage in every FPS game. My viewers also love the crystal-clear mic quality on my streams.",
    product: "Eclipse 7.1 Headset",
  },
  {
    id: 6,
    name: "Zara A.",
    role: "Designer",
    rating: 5,
    text: "The Horizon monitor's color accuracy is phenomenal for my design work. And when I'm done working, gaming on that ultrawide curved display is an incredible experience.",
    product: "Horizon 34\" Monitor",
  },
];

export function getProduct(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getTrendingProducts(): Product[] {
  return products.filter(p => p.trending);
}

export function getDealProducts(): Product[] {
  return products.filter(p => p.deal && p.originalPrice);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
  );
}
