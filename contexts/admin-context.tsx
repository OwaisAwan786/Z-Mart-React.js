"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  category: string
  brand: string
  rating: number
  reviews: number
  image: string
  inStock: boolean
  stockQuantity: number
  features: string[]
  specifications: Record<string, string>
  createdAt: string
}

interface Order {
  id: string
  customer: string
  email: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date: string
  items: Array<{
    productId: number
    name: string
    quantity: number
    price: number
  }>
  shippingAddress: string
}

interface User {
  id: number
  name: string
  email: string
  orders: number
  joined: string
  status: "active" | "inactive"
  totalSpent: number
}

interface AdminState {
  products: Product[]
  orders: Order[]
  users: User[]
  stats: {
    totalRevenue: number
    totalOrders: number
    totalProducts: number
    totalUsers: number
  }
}

type AdminAction =
  | { type: "ADD_PRODUCT"; payload: Omit<Product, "id" | "createdAt"> }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "UPDATE_ORDER_STATUS"; payload: { id: string; status: Order["status"] } }
  | { type: "ADD_ORDER"; payload: Omit<Order, "id" | "date"> }
  | { type: "DELETE_ORDER"; payload: string }

const AdminContext = createContext<{
  state: AdminState
  dispatch: React.Dispatch<AdminAction>
} | null>(null)

// Initial mock data with PKR prices and all categories
const initialProducts: Product[] = [
  // Electronics (10 products)
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 55999,
    originalPrice: 69999,
    category: "Electronics",
    brand: "TechBrand",
    rating: 4.5,
    reviews: 128,
    image: "/images/wireless-headphones.jpg",
    inStock: true,
    stockQuantity: 25,
    features: ["Noise Cancellation", "30-hour Battery", "Wireless Charging"],
    specifications: {
      "Battery Life": "30 hours",
      Connectivity: "Bluetooth 5.0",
      Weight: "250g",
    },
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Advanced smartwatch with health monitoring features",
    price: 83999,
    originalPrice: 111999,
    category: "Electronics",
    brand: "SmartTech",
    rating: 4.8,
    reviews: 89,
    image: "/images/smart-watch.jpg",
    inStock: true,
    stockQuantity: 15,
    features: ["Heart Rate Monitor", "GPS", "Water Resistant"],
    specifications: {
      Display: "1.4 inch OLED",
      Battery: "7 days",
      "Water Resistance": "50m",
    },
    createdAt: "2024-01-02",
  },
  {
    id: 3,
    name: "Laptop Stand",
    description: "Ergonomic laptop stand for better posture",
    price: 22399,
    originalPrice: 27999,
    category: "Electronics",
    brand: "ErgoTech",
    rating: 4.3,
    reviews: 156,
    image: "/images/laptop-stand.jpg",
    inStock: true,
    stockQuantity: 50,
    features: ["Adjustable Height", "Aluminum Build", "Portable"],
    specifications: {
      Material: "Aluminum",
      Weight: "1.2kg",
      Compatibility: "All laptops",
    },
    createdAt: "2024-01-03",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    description: "Portable wireless speaker with premium sound quality",
    price: 41999,
    originalPrice: 55999,
    category: "Electronics",
    brand: "SoundMax",
    rating: 4.6,
    reviews: 203,
    image: "/images/bluetooth-speaker.jpg",
    inStock: true,
    stockQuantity: 30,
    features: ["360° Sound", "Waterproof", "12-hour Battery"],
    specifications: {
      "Battery Life": "12 hours",
      Connectivity: "Bluetooth 5.0",
      "Water Rating": "IPX7",
    },
    createdAt: "2024-01-04",
  },
  {
    id: 5,
    name: "Smartphone",
    description: "Latest flagship smartphone with advanced camera system",
    price: 139999,
    originalPrice: 159999,
    category: "Electronics",
    brand: "TechPro",
    rating: 4.7,
    reviews: 342,
    image: "/images/smartphone.png",
    inStock: true,
    stockQuantity: 20,
    features: ["Triple Camera", "5G Ready", "Fast Charging"],
    specifications: {
      Display: "6.7 inch AMOLED",
      Storage: "256GB",
      RAM: "8GB",
    },
    createdAt: "2024-01-05",
  },
  {
    id: 6,
    name: "Tablet",
    description: "High-performance tablet for work and entertainment",
    price: 69999,
    originalPrice: 89999,
    category: "Electronics",
    brand: "TabletCorp",
    rating: 4.4,
    reviews: 178,
    image: "/images/tablet.png",
    inStock: true,
    stockQuantity: 18,
    features: ["10.1 inch Display", "Stylus Support", "All-day Battery"],
    specifications: {
      Display: "10.1 inch IPS",
      Storage: "128GB",
      Battery: "10 hours",
    },
    createdAt: "2024-01-06",
  },
  {
    id: 7,
    name: "Gaming Mouse",
    description: "Professional gaming mouse with RGB lighting",
    price: 8999,
    originalPrice: 12999,
    category: "Electronics",
    brand: "GameGear",
    rating: 4.6,
    reviews: 267,
    image: "/images/gaming-mouse.png",
    inStock: true,
    stockQuantity: 45,
    features: ["RGB Lighting", "Programmable Buttons", "High DPI"],
    specifications: {
      DPI: "16000",
      Buttons: "8",
      Connection: "USB",
    },
    createdAt: "2024-01-07",
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    description: "Premium mechanical keyboard for gaming and typing",
    price: 18999,
    originalPrice: 24999,
    category: "Electronics",
    brand: "KeyMaster",
    rating: 4.5,
    reviews: 189,
    image: "/images/keyboard.png",
    inStock: true,
    stockQuantity: 35,
    features: ["Mechanical Switches", "Backlit Keys", "Compact Design"],
    specifications: {
      "Switch Type": "Blue",
      Layout: "TKL",
      Connection: "USB-C",
    },
    createdAt: "2024-01-08",
  },
  {
    id: 9,
    name: "HD Webcam",
    description: "1080p webcam for video calls and streaming",
    price: 12999,
    originalPrice: 16999,
    category: "Electronics",
    brand: "CamTech",
    rating: 4.3,
    reviews: 145,
    image: "/images/webcam.png",
    inStock: true,
    stockQuantity: 40,
    features: ["1080p HD", "Auto Focus", "Built-in Mic"],
    specifications: {
      Resolution: "1920x1080",
      "Frame Rate": "30fps",
      Connection: "USB 3.0",
    },
    createdAt: "2024-01-09",
  },
  {
    id: 10,
    name: "Power Bank",
    description: "High-capacity portable charger for all devices",
    price: 6999,
    originalPrice: 9999,
    category: "Electronics",
    brand: "PowerMax",
    rating: 4.4,
    reviews: 298,
    image: "/images/power-bank.png",
    inStock: true,
    stockQuantity: 60,
    features: ["20000mAh", "Fast Charging", "Multiple Ports"],
    specifications: {
      Capacity: "20000mAh",
      Ports: "3 USB",
      "Charging Speed": "18W",
    },
    createdAt: "2024-01-10",
  },

  // Fashion (10 products)
  {
    id: 11,
    name: "Running Shoes",
    description: "Comfortable running shoes with advanced cushioning",
    price: 36399,
    originalPrice: 44799,
    category: "Fashion",
    brand: "SportFlex",
    rating: 4.4,
    reviews: 95,
    image: "/images/running-shoes.jpg",
    inStock: true,
    stockQuantity: 25,
    features: ["Breathable Mesh", "Cushioned Sole", "Lightweight"],
    specifications: {
      Material: "Mesh & Synthetic",
      "Sole Type": "Rubber",
      Weight: "280g",
    },
    createdAt: "2024-01-11",
  },
  {
    id: 12,
    name: "Cotton T-Shirt",
    description: "Premium cotton t-shirt for everyday comfort",
    price: 2999,
    originalPrice: 3999,
    category: "Fashion",
    brand: "ComfortWear",
    rating: 4.2,
    reviews: 156,
    image: "/images/t-shirt.png",
    inStock: true,
    stockQuantity: 80,
    features: ["100% Cotton", "Pre-shrunk", "Soft Feel"],
    specifications: {
      Material: "100% Cotton",
      Fit: "Regular",
      Care: "Machine Wash",
    },
    createdAt: "2024-01-12",
  },
  {
    id: 13,
    name: "Denim Jeans",
    description: "Classic denim jeans with modern fit",
    price: 8999,
    originalPrice: 12999,
    category: "Fashion",
    brand: "DenimCo",
    rating: 4.3,
    reviews: 234,
    image: "/images/jeans.png",
    inStock: true,
    stockQuantity: 45,
    features: ["Stretch Denim", "Fade Resistant", "Comfortable Fit"],
    specifications: {
      Material: "98% Cotton, 2% Elastane",
      Fit: "Slim",
      Wash: "Dark Blue",
    },
    createdAt: "2024-01-13",
  },
  {
    id: 14,
    name: "Casual Sneakers",
    description: "Stylish casual sneakers for everyday wear",
    price: 12999,
    originalPrice: 16999,
    category: "Fashion",
    brand: "UrbanStep",
    rating: 4.5,
    reviews: 187,
    image: "/images/sneakers.png",
    inStock: true,
    stockQuantity: 35,
    features: ["Canvas Upper", "Rubber Sole", "Lace-up"],
    specifications: {
      Material: "Canvas",
      "Sole Material": "Rubber",
      Style: "Low-top",
    },
    createdAt: "2024-01-14",
  },
  {
    id: 15,
    name: "Winter Jacket",
    description: "Warm winter jacket with water-resistant coating",
    price: 18999,
    originalPrice: 24999,
    category: "Fashion",
    brand: "WarmWear",
    rating: 4.6,
    reviews: 123,
    image: "/images/jacket.png",
    inStock: true,
    stockQuantity: 20,
    features: ["Water Resistant", "Insulated", "Multiple Pockets"],
    specifications: {
      Material: "Polyester",
      Insulation: "Synthetic",
      "Water Rating": "DWR",
    },
    createdAt: "2024-01-15",
  },
  {
    id: 16,
    name: "Summer Dress",
    description: "Elegant summer dress for special occasions",
    price: 14999,
    originalPrice: 19999,
    category: "Fashion",
    brand: "ElegantStyle",
    rating: 4.4,
    reviews: 89,
    image: "/images/dress.png",
    inStock: true,
    stockQuantity: 30,
    features: ["Flowy Design", "Breathable Fabric", "Easy Care"],
    specifications: {
      Material: "Polyester Blend",
      Length: "Midi",
      Sleeve: "Sleeveless",
    },
    createdAt: "2024-01-16",
  },
  {
    id: 17,
    name: "Travel Backpack",
    description: "Durable travel backpack with multiple compartments",
    price: 11999,
    originalPrice: 15999,
    category: "Fashion",
    brand: "TravelGear",
    rating: 4.5,
    reviews: 167,
    image: "/images/backpack.png",
    inStock: true,
    stockQuantity: 40,
    features: ["Water Resistant", "Laptop Compartment", "Ergonomic"],
    specifications: {
      Capacity: "35L",
      Material: "Nylon",
      Dimensions: "50x30x20cm",
    },
    createdAt: "2024-01-17",
  },
  {
    id: 18,
    name: "Sunglasses",
    description: "UV protection sunglasses with polarized lenses",
    price: 7999,
    originalPrice: 10999,
    category: "Fashion",
    brand: "SunShield",
    rating: 4.3,
    reviews: 145,
    image: "/images/sunglasses.png",
    inStock: true,
    stockQuantity: 55,
    features: ["UV400 Protection", "Polarized", "Lightweight"],
    specifications: {
      "Lens Material": "Polycarbonate",
      "Frame Material": "Acetate",
      "UV Protection": "100%",
    },
    createdAt: "2024-01-18",
  },
  {
    id: 19,
    name: "Analog Watch",
    description: "Classic analog watch with leather strap",
    price: 16999,
    originalPrice: 22999,
    category: "Fashion",
    brand: "TimeClassic",
    rating: 4.6,
    reviews: 198,
    image: "/images/watch-analog.png",
    inStock: true,
    stockQuantity: 25,
    features: ["Leather Strap", "Water Resistant", "Classic Design"],
    specifications: {
      Movement: "Quartz",
      "Case Material": "Stainless Steel",
      "Water Resistance": "30m",
    },
    createdAt: "2024-01-19",
  },
  {
    id: 20,
    name: "Leather Belt",
    description: "Genuine leather belt with metal buckle",
    price: 4999,
    originalPrice: 6999,
    category: "Fashion",
    brand: "LeatherCraft",
    rating: 4.2,
    reviews: 134,
    image: "/images/belt.png",
    inStock: true,
    stockQuantity: 70,
    features: ["Genuine Leather", "Metal Buckle", "Adjustable"],
    specifications: {
      Material: "Genuine Leather",
      Width: "3.5cm",
      Length: "120cm",
    },
    createdAt: "2024-01-20",
  },

  // Home & Garden (10 products)
  {
    id: 21,
    name: "Coffee Maker",
    description: "Automatic coffee maker with programmable timer",
    price: 25199,
    originalPrice: 33599,
    category: "Home & Garden",
    brand: "BrewMaster",
    rating: 4.2,
    reviews: 67,
    image: "/images/coffee-maker.jpg",
    inStock: true,
    stockQuantity: 15,
    features: ["Programmable", "Auto Shut-off", "12-cup Capacity"],
    specifications: {
      Capacity: "12 cups",
      Power: "1000W",
      Material: "Stainless Steel",
    },
    createdAt: "2024-01-21",
  },
  {
    id: 22,
    name: "Comfortable Sofa",
    description: "3-seater sofa with premium fabric upholstery",
    price: 89999,
    originalPrice: 119999,
    category: "Home & Garden",
    brand: "ComfortHome",
    rating: 4.5,
    reviews: 89,
    image: "/images/sofa.png",
    inStock: true,
    stockQuantity: 8,
    features: ["3-Seater", "Premium Fabric", "Sturdy Frame"],
    specifications: {
      Seating: "3 People",
      Material: "Fabric",
      Dimensions: "200x90x85cm",
    },
    createdAt: "2024-01-22",
  },
  {
    id: 23,
    name: "Dining Table",
    description: "Wooden dining table for 6 people",
    price: 69999,
    originalPrice: 89999,
    category: "Home & Garden",
    brand: "WoodCraft",
    rating: 4.4,
    reviews: 76,
    image: "/images/dining-table.png",
    inStock: true,
    stockQuantity: 12,
    features: ["Solid Wood", "6-Seater", "Easy Assembly"],
    specifications: {
      Material: "Solid Wood",
      Seating: "6 People",
      Dimensions: "180x90x75cm",
    },
    createdAt: "2024-01-23",
  },
  {
    id: 24,
    name: "Queen Bed Frame",
    description: "Modern queen size bed frame with headboard",
    price: 54999,
    originalPrice: 69999,
    category: "Home & Garden",
    brand: "SleepWell",
    rating: 4.3,
    reviews: 112,
    image: "/images/bed-frame.png",
    inStock: true,
    stockQuantity: 10,
    features: ["Queen Size", "Upholstered Headboard", "Sturdy Build"],
    specifications: {
      Size: "Queen (150x200cm)",
      Material: "Wood & Fabric",
      Height: "120cm",
    },
    createdAt: "2024-01-24",
  },
  {
    id: 25,
    name: "Table Lamp",
    description: "Modern table lamp with adjustable brightness",
    price: 8999,
    originalPrice: 12999,
    category: "Home & Garden",
    brand: "LightUp",
    rating: 4.2,
    reviews: 145,
    image: "/images/lamp.png",
    inStock: true,
    stockQuantity: 35,
    features: ["Adjustable Brightness", "Touch Control", "LED Bulb"],
    specifications: {
      "Light Type": "LED",
      Power: "12W",
      Height: "45cm",
    },
    createdAt: "2024-01-25",
  },
  {
    id: 26,
    name: "Wall Mirror",
    description: "Decorative wall mirror with wooden frame",
    price: 12999,
    originalPrice: 16999,
    category: "Home & Garden",
    brand: "ReflectStyle",
    rating: 4.4,
    reviews: 98,
    image: "/images/mirror.png",
    inStock: true,
    stockQuantity: 25,
    features: ["Wooden Frame", "Easy Mounting", "Decorative"],
    specifications: {
      Size: "60x80cm",
      "Frame Material": "Wood",
      Shape: "Rectangular",
    },
    createdAt: "2024-01-26",
  },
  {
    id: 27,
    name: "Plant Pot Set",
    description: "Set of 3 ceramic plant pots with drainage",
    price: 4999,
    originalPrice: 6999,
    category: "Home & Garden",
    brand: "GreenThumb",
    rating: 4.1,
    reviews: 167,
    image: "/images/plant-pot.png",
    inStock: true,
    stockQuantity: 50,
    features: ["Ceramic Material", "Drainage Holes", "Set of 3"],
    specifications: {
      Material: "Ceramic",
      Sizes: "Small, Medium, Large",
      Drainage: "Yes",
    },
    createdAt: "2024-01-27",
  },
  {
    id: 28,
    name: "Window Curtains",
    description: "Blackout curtains for bedroom and living room",
    price: 7999,
    originalPrice: 10999,
    category: "Home & Garden",
    brand: "WindowStyle",
    rating: 4.3,
    reviews: 134,
    image: "/images/curtains.png",
    inStock: true,
    stockQuantity: 40,
    features: ["Blackout", "Thermal Insulated", "Easy Installation"],
    specifications: {
      Size: "140x240cm",
      Material: "Polyester",
      "Light Blocking": "99%",
    },
    createdAt: "2024-01-28",
  },
  {
    id: 29,
    name: "Area Rug",
    description: "Soft area rug for living room decoration",
    price: 15999,
    originalPrice: 21999,
    category: "Home & Garden",
    brand: "RugMaster",
    rating: 4.5,
    reviews: 89,
    image: "/images/rug.png",
    inStock: true,
    stockQuantity: 20,
    features: ["Soft Texture", "Non-slip", "Easy Clean"],
    specifications: {
      Size: "200x300cm",
      Material: "Polyester",
      Thickness: "12mm",
    },
    createdAt: "2024-01-29",
  },
  {
    id: 30,
    name: "Bookshelf",
    description: "5-tier wooden bookshelf for home office",
    price: 18999,
    originalPrice: 24999,
    category: "Home & Garden",
    brand: "StudySpace",
    rating: 4.4,
    reviews: 156,
    image: "/images/bookshelf.png",
    inStock: true,
    stockQuantity: 15,
    features: ["5 Tiers", "Solid Wood", "Easy Assembly"],
    specifications: {
      Material: "Solid Wood",
      Tiers: "5",
      Dimensions: "80x30x180cm",
    },
    createdAt: "2024-01-30",
  },

  // Sports (9 products)
  {
    id: 31,
    name: "Basketball",
    description: "Official size basketball for indoor and outdoor play",
    price: 3999,
    originalPrice: 5999,
    category: "Sports",
    brand: "SportsPro",
    rating: 4.3,
    reviews: 189,
    image: "/images/basketball.png",
    inStock: true,
    stockQuantity: 60,
    features: ["Official Size", "Durable", "Good Grip"],
    specifications: {
      Size: "Size 7",
      Material: "Synthetic Leather",
      "Suitable For": "Indoor/Outdoor",
    },
    createdAt: "2024-01-31",
  },
  {
    id: 32,
    name: "Tennis Racket",
    description: "Professional tennis racket for intermediate players",
    price: 14999,
    originalPrice: 19999,
    category: "Sports",
    brand: "TennisAce",
    rating: 4.5,
    reviews: 123,
    image: "/images/tennis-racket.png",
    inStock: true,
    stockQuantity: 25,
    features: ["Lightweight", "Good Control", "Durable Strings"],
    specifications: {
      Weight: "280g",
      "Head Size": "100 sq in",
      "String Pattern": "16x19",
    },
    createdAt: "2024-02-01",
  },
  {
    id: 33,
    name: "Yoga Mat",
    description: "Non-slip yoga mat for home workouts",
    price: 5999,
    originalPrice: 7999,
    category: "Sports",
    brand: "YogaFlow",
    rating: 4.4,
    reviews: 267,
    image: "/images/yoga-mat.png",
    inStock: true,
    stockQuantity: 45,
    features: ["Non-slip", "Eco-friendly", "Lightweight"],
    specifications: {
      Size: "183x61cm",
      Thickness: "6mm",
      Material: "TPE",
    },
    createdAt: "2024-02-02",
  },
  {
    id: 34,
    name: "Dumbbell Set",
    description: "Adjustable dumbbell set for home gym",
    price: 24999,
    originalPrice: 32999,
    category: "Sports",
    brand: "FitStrong",
    rating: 4.6,
    reviews: 145,
    image: "/images/dumbbells.png",
    inStock: true,
    stockQuantity: 20,
    features: ["Adjustable Weight", "Comfortable Grip", "Space Saving"],
    specifications: {
      "Weight Range": "5-25kg each",
      Material: "Cast Iron",
      "Grip Type": "Knurled",
    },
    createdAt: "2024-02-03",
  },
  {
    id: 35,
    name: "Mountain Bike",
    description: "21-speed mountain bike for outdoor adventures",
    price: 89999,
    originalPrice: 119999,
    category: "Sports",
    brand: "TrailRider",
    rating: 4.5,
    reviews: 98,
    image: "/images/bicycle.png",
    inStock: true,
    stockQuantity: 8,
    features: ["21 Speeds", "Suspension Fork", "Disc Brakes"],
    specifications: {
      "Wheel Size": "26 inch",
      Speeds: "21",
      "Frame Material": "Aluminum",
    },
    createdAt: "2024-02-04",
  },
  {
    id: 36,
    name: "Football",
    description: "Official size football for training and matches",
    price: 2999,
    originalPrice: 3999,
    category: "Sports",
    brand: "KickMaster",
    rating: 4.2,
    reviews: 234,
    image: "/images/football.png",
    inStock: true,
    stockQuantity: 70,
    features: ["Official Size", "Durable", "Good Flight"],
    specifications: {
      Size: "Size 5",
      Material: "PU Leather",
      Weight: "410-450g",
    },
    createdAt: "2024-02-05",
  },
  {
    id: 37,
    name: "Swimming Goggles",
    description: "Anti-fog swimming goggles with UV protection",
    price: 1999,
    originalPrice: 2999,
    category: "Sports",
    brand: "AquaVision",
    rating: 4.3,
    reviews: 178,
    image: "/images/swimming-goggles.png",
    inStock: true,
    stockQuantity: 80,
    features: ["Anti-fog", "UV Protection", "Adjustable Strap"],
    specifications: {
      "Lens Type": "Polycarbonate",
      "UV Protection": "Yes",
      "Strap Material": "Silicone",
    },
    createdAt: "2024-02-06",
  },
  {
    id: 38,
    name: "Gym Bag",
    description: "Spacious gym bag with shoe compartment",
    price: 8999,
    originalPrice: 11999,
    category: "Sports",
    brand: "FitCarry",
    rating: 4.4,
    reviews: 156,
    image: "/images/gym-bag.png",
    inStock: true,
    stockQuantity: 35,
    features: ["Shoe Compartment", "Water Resistant", "Multiple Pockets"],
    specifications: {
      Capacity: "40L",
      Material: "Polyester",
      Dimensions: "55x25x25cm",
    },
    createdAt: "2024-02-07",
  },
  {
    id: 39,
    name: "Protein Shaker",
    description: "BPA-free protein shaker with mixing ball",
    price: 1499,
    originalPrice: 1999,
    category: "Sports",
    brand: "ShakeFit",
    rating: 4.1,
    reviews: 289,
    image: "/images/protein-shaker.png",
    inStock: true,
    stockQuantity: 90,
    features: ["BPA-free", "Leak Proof", "Mixing Ball"],
    specifications: {
      Capacity: "600ml",
      Material: "Tritan Plastic",
      "Dishwasher Safe": "Yes",
    },
    createdAt: "2024-02-08",
  },
]

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@zmart.com",
    total: 83998,
    status: "delivered",
    date: "2024-01-15",
    items: [
      { productId: 1, name: "Wireless Headphones", quantity: 1, price: 55999 },
      { productId: 3, name: "Laptop Stand", quantity: 1, price: 22399 },
    ],
    shippingAddress: "123 Main St, Karachi, Pakistan",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@zmart.com",
    total: 83999,
    status: "shipped",
    date: "2024-01-14",
    items: [{ productId: 2, name: "Smart Watch", quantity: 1, price: 83999 }],
    shippingAddress: "456 Oak Ave, Lahore, Pakistan",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob@zmart.com",
    total: 22399,
    status: "processing",
    date: "2024-01-13",
    items: [{ productId: 3, name: "Laptop Stand", quantity: 1, price: 22399 }],
    shippingAddress: "789 Pine St, Islamabad, Pakistan",
  },
]

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@zmart.com",
    orders: 5,
    joined: "2023-12-01",
    status: "active",
    totalSpent: 363995,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@zmart.com",
    orders: 3,
    joined: "2023-11-15",
    status: "active",
    totalSpent: 251997,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@zmart.com",
    orders: 8,
    joined: "2023-10-20",
    status: "active",
    totalSpent: 615992,
  },
]

function calculateStats(products: Product[], orders: Order[], users: User[]) {
  return {
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    totalOrders: orders.length,
    totalProducts: products.length,
    totalUsers: users.length,
  }
}

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const newProduct: Product = {
        ...action.payload,
        id: Math.max(...state.products.map((p) => p.id), 0) + 1,
        createdAt: new Date().toISOString().split("T")[0],
      }
      const newProducts = [...state.products, newProduct]
      return {
        ...state,
        products: newProducts,
        stats: calculateStats(newProducts, state.orders, state.users),
      }
    }

    case "UPDATE_PRODUCT": {
      const newProducts = state.products.map((product) => (product.id === action.payload.id ? action.payload : product))
      return {
        ...state,
        products: newProducts,
        stats: calculateStats(newProducts, state.orders, state.users),
      }
    }

    case "DELETE_PRODUCT": {
      const newProducts = state.products.filter((product) => product.id !== action.payload)
      return {
        ...state,
        products: newProducts,
        stats: calculateStats(newProducts, state.orders, state.users),
      }
    }

    case "UPDATE_ORDER_STATUS": {
      const newOrders = state.orders.map((order) =>
        order.id === action.payload.id ? { ...order, status: action.payload.status } : order,
      )
      return {
        ...state,
        orders: newOrders,
        stats: calculateStats(state.products, newOrders, state.users),
      }
    }

    case "ADD_ORDER": {
      const newOrder: Order = {
        ...action.payload,
        id: `ORD-${String(state.orders.length + 1).padStart(3, "0")}`,
        date: new Date().toISOString().split("T")[0],
      }
      const newOrders = [...state.orders, newOrder]
      return {
        ...state,
        orders: newOrders,
        stats: calculateStats(state.products, newOrders, state.users),
      }
    }

    case "DELETE_ORDER": {
      const newOrders = state.orders.filter((order) => order.id !== action.payload)
      return {
        ...state,
        orders: newOrders,
        stats: calculateStats(state.products, newOrders, state.users),
      }
    }

    default:
      return state
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const initialState: AdminState = {
    products: initialProducts,
    orders: initialOrders,
    users: initialUsers,
    stats: calculateStats(initialProducts, initialOrders, initialUsers),
  }

  const [state, dispatch] = useReducer(adminReducer, initialState)

  return <AdminContext.Provider value={{ state, dispatch }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
