import { NextResponse } from "next/server"

// Mock product data (same as in route.ts)
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation technology. Perfect for music lovers and professionals who need crystal clear audio quality.",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    brand: "TechBrand",
    rating: 4.5,
    reviews: 128,
    images: ["/images/wireless-headphones.jpg", "/images/wireless-headphones.jpg", "/images/wireless-headphones.jpg"],
    inStock: true,
    stockQuantity: 25,
    features: [
      "Active Noise Cancellation",
      "30-hour Battery Life",
      "Wireless Charging Case",
      "Premium Sound Quality",
      "Comfortable Fit",
    ],
    specifications: {
      "Battery Life": "30 hours",
      Connectivity: "Bluetooth 5.0",
      Weight: "250g",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 ohms",
    },
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Advanced smartwatch with comprehensive health monitoring features and fitness tracking capabilities.",
    price: 299.99,
    originalPrice: 399.99,
    category: "Electronics",
    brand: "SmartTech",
    rating: 4.8,
    reviews: 89,
    images: ["/images/smart-watch.jpg", "/images/smart-watch.jpg"],
    inStock: true,
    stockQuantity: 15,
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant", "Sleep Tracking", "Multiple Sport Modes"],
    specifications: {
      Display: "1.4 inch OLED",
      Battery: "7 days",
      "Water Resistance": "50m",
      Sensors: "Heart Rate, GPS, Accelerometer",
      Compatibility: "iOS & Android",
    },
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const product = products.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const productIndex = products.findIndex((p) => p.id === id)

  if (productIndex === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  const body = await request.json()
  const updatedProduct = { ...products[productIndex], ...body, id }
  products[productIndex] = updatedProduct

  return NextResponse.json(updatedProduct)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const productIndex = products.findIndex((p) => p.id === id)

  if (productIndex === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  products.splice(productIndex, 1)
  return NextResponse.json({ message: "Product deleted successfully" })
}
