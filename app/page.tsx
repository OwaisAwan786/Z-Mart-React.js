import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Truck, Shield, Headphones } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Helper function to format PKR currency
const formatPKR = (amount: number) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 55999,
    originalPrice: 69999,
    rating: 4.5,
    reviews: 128,
    image: "/images/wireless-headphones.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 83999,
    originalPrice: 111999,
    rating: 4.8,
    reviews: 89,
    image: "/images/smart-watch.jpg",
    badge: "New",
  },
  {
    id: 5,
    name: "Smartphone",
    price: 139999,
    originalPrice: 159999,
    rating: 4.7,
    reviews: 342,
    image: "/images/smartphone.png",
    badge: "Hot",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 41999,
    originalPrice: 55999,
    rating: 4.6,
    reviews: 203,
    image: "/images/bluetooth-speaker.jpg",
    badge: "Popular",
  },
  {
    id: 11,
    name: "Running Shoes",
    price: 36399,
    originalPrice: 44799,
    rating: 4.4,
    reviews: 95,
    image: "/images/running-shoes.jpg",
    badge: "Sale",
  },
  {
    id: 22,
    name: "Comfortable Sofa",
    price: 89999,
    originalPrice: 119999,
    rating: 4.5,
    reviews: 89,
    image: "/images/sofa.png",
    badge: "Featured",
  },
  {
    id: 32,
    name: "Tennis Racket",
    price: 14999,
    originalPrice: 19999,
    rating: 4.5,
    reviews: 123,
    image: "/images/tennis-racket.png",
    badge: "Sport",
  },
  {
    id: 15,
    name: "Winter Jacket",
    price: 18999,
    originalPrice: 24999,
    rating: 4.6,
    reviews: 123,
    image: "/images/jacket.png",
    badge: "Winter",
  },
]

const categories = [
  { name: "Electronics", image: "/images/categories/electronics.jpg", count: 245, slug: "electronics" },
  { name: "Fashion", image: "/images/categories/fashion.jpg", count: 189, slug: "fashion" },
  { name: "Home & Garden", image: "/images/categories/home-garden.jpg", count: 156, slug: "home-garden" },
  { name: "Sports", image: "/images/categories/sports.jpg", count: 98, slug: "sports" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Shop the Latest Tech & Fashion</h1>
              <p className="text-xl mb-8 opacity-90">
                Discover amazing products at unbeatable prices. Free shipping on orders over PKR 14,000.
              </p>
              <div className="flex gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/category/electronics">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    Browse Electronics
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/hero-product.png"
                alt="Hero Product"
                width={500}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders over PKR 14,000</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round the clock customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/category/${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={200}
                      height={200}
                      className="mx-auto mb-4 rounded-lg"
                    />
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.count} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover rounded-lg cursor-pointer"
                      />
                    </Link>
                    <Badge className="absolute top-2 left-2" variant="secondary">
                      {product.badge}
                    </Badge>
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold mb-2 hover:text-blue-600 cursor-pointer">{product.name}</h3>
                  </Link>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold">{formatPKR(product.price)}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {formatPKR(product.originalPrice)}
                      </span>
                    </div>
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <Button className="w-full" size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      View Product
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">Subscribe to our newsletter for the latest deals and updates</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg text-gray-900" />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
