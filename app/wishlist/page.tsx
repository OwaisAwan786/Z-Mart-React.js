"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const mockWishlistItems = [
  {
    id: 1,
    name: "Smart Watch",
    price: 299.99,
    originalPrice: 399.99,
    image: "/images/smart-watch.jpg",
    inStock: true,
    rating: 4.8,
    reviews: 89,
    badge: "New",
  },
  {
    id: 2,
    name: "Laptop Stand",
    price: 79.99,
    originalPrice: 99.99,
    image: "/images/laptop-stand.jpg",
    inStock: true,
    rating: 4.3,
    reviews: 156,
    badge: "Sale",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 129.99,
    originalPrice: 159.99,
    image: "/images/running-shoes.jpg",
    inStock: false,
    rating: 4.4,
    reviews: 95,
    badge: "Out of Stock",
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: 89.99,
    originalPrice: 119.99,
    image: "/images/coffee-maker.jpg",
    inStock: true,
    rating: 4.2,
    reviews: 67,
    badge: "Popular",
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)

  const removeFromWishlist = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (id: number) => {
    // Add to cart logic here
    console.log(`Added item ${id} to cart`)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="h-24 w-24 mx-auto text-gray-400 mb-6" />
        <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
        <p className="text-gray-600 mb-8">Save items you love to your wishlist and shop them later!</p>
        <Link href="/products">
          <Button size="lg">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Start Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-gray-600 mt-2">{wishlistItems.length} items saved</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share Wishlist
          </Button>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Link href={`/products/${item.id}`}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg cursor-pointer"
                  />
                </Link>
                <Badge className="absolute top-2 left-2" variant={item.inStock ? "secondary" : "destructive"}>
                  {item.badge}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <Link href={`/products/${item.id}`}>
                <h3 className="font-semibold mb-2 hover:text-blue-600 cursor-pointer">{item.name}</h3>
              </Link>

              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">({item.reviews})</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-lg font-bold">Rs{item.price}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through ml-2">Rs{item.originalPrice}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="sm" disabled={!item.inStock} onClick={() => addToCart(item.id)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button variant="outline" className="w-full" size="sm" onClick={() => removeFromWishlist(item.id)}>
                  <Heart className="h-4 w-4 mr-2 fill-current text-red-500" />
                  Remove from Wishlist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommended Items */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sample recommended items */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Image
                  src="/images/wireless-headphones.jpg"
                  alt="Wireless Headphones"
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Badge className="absolute top-2 left-2" variant="secondary">
                  Best Seller
                </Badge>
              </div>
              <h3 className="font-semibold mb-2">Wireless Headphones</h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">(128)</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-lg font-bold">Rs199.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">Rs249.99</span>
                </div>
              </div>
              <Button className="w-full" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
