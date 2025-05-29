"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, ShoppingCart, Filter } from "lucide-react"
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

// Expanded products array with all categories
const products = [
  // Electronics
  {
    id: 1,
    name: "Wireless Headphones",
    price: 55999,
    originalPrice: 69999,
    rating: 4.5,
    reviews: 128,
    image: "/images/wireless-headphones.jpg",
    category: "Electronics",
    inStock: true,
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
    category: "Electronics",
    inStock: true,
    badge: "New",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 22399,
    originalPrice: 27999,
    rating: 4.3,
    reviews: 156,
    image: "/images/laptop-stand.jpg",
    category: "Electronics",
    inStock: true,
    badge: "Sale",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 41999,
    originalPrice: 55999,
    rating: 4.6,
    reviews: 203,
    image: "/images/bluetooth-speaker.jpg",
    category: "Electronics",
    inStock: false,
    badge: "Popular",
  },
  {
    id: 5,
    name: "Smartphone",
    price: 139999,
    originalPrice: 159999,
    rating: 4.7,
    reviews: 342,
    image: "/images/smartphone.png",
    category: "Electronics",
    inStock: true,
    badge: "New",
  },
  {
    id: 6,
    name: "Tablet",
    price: 69999,
    originalPrice: 89999,
    rating: 4.4,
    reviews: 178,
    image: "/images/tablet.png",
    category: "Electronics",
    inStock: true,
    badge: "Sale",
  },
  {
    id: 7,
    name: "Gaming Mouse",
    price: 8999,
    originalPrice: 12999,
    rating: 4.6,
    reviews: 267,
    image: "/images/gaming-mouse.png",
    category: "Electronics",
    inStock: true,
    badge: "Popular",
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    price: 18999,
    originalPrice: 24999,
    rating: 4.5,
    reviews: 189,
    image: "/images/keyboard.png",
    category: "Electronics",
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: 9,
    name: "HD Webcam",
    price: 12999,
    originalPrice: 16999,
    rating: 4.3,
    reviews: 145,
    image: "/images/webcam.png",
    category: "Electronics",
    inStock: true,
    badge: "New",
  },
  {
    id: 10,
    name: "Power Bank",
    price: 6999,
    originalPrice: 9999,
    rating: 4.4,
    reviews: 298,
    image: "/images/power-bank.png",
    category: "Electronics",
    inStock: true,
    badge: "Sale",
  },

  // Fashion
  {
    id: 11,
    name: "Running Shoes",
    price: 36399,
    originalPrice: 44799,
    rating: 4.4,
    reviews: 95,
    image: "/images/running-shoes.jpg",
    category: "Fashion",
    inStock: true,
    badge: "Sale",
  },
  {
    id: 12,
    name: "Cotton T-Shirt",
    price: 2999,
    originalPrice: 3999,
    rating: 4.2,
    reviews: 156,
    image: "/images/t-shirt.png",
    category: "Fashion",
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: 13,
    name: "Denim Jeans",
    price: 8999,
    originalPrice: 12999,
    rating: 4.3,
    reviews: 234,
    image: "/images/jeans.png",
    category: "Fashion",
    inStock: true,
    badge: "Popular",
  },
  {
    id: 14,
    name: "Casual Sneakers",
    price: 12999,
    originalPrice: 16999,
    rating: 4.5,
    reviews: 187,
    image: "/images/sneakers.png",
    category: "Fashion",
    inStock: true,
    badge: "New",
  },
  {
    id: 15,
    name: "Winter Jacket",
    price: 18999,
    originalPrice: 24999,
    rating: 4.6,
    reviews: 123,
    image: "/images/jacket.png",
    category: "Fashion",
    inStock: true,
    badge: "Sale",
  },
  {
    id: 16,
    name: "Summer Dress",
    price: 14999,
    originalPrice: 19999,
    rating: 4.4,
    reviews: 89,
    image: "/images/dress.png",
    category: "Fashion",
    inStock: true,
    badge: "New",
  },
  {
    id: 17,
    name: "Travel Backpack",
    price: 11999,
    originalPrice: 15999,
    rating: 4.5,
    reviews: 167,
    image: "/images/backpack.png",
    category: "Fashion",
    inStock: true,
    badge: "Popular",
  },
  {
    id: 18,
    name: "Sunglasses",
    price: 7999,
    originalPrice: 10999,
    rating: 4.3,
    reviews: 145,
    image: "/images/sunglasses.png",
    category: "Fashion",
    inStock: true,
    badge: "Sale",
  },
  {
    id: 19,
    name: "Analog Watch",
    price: 16999,
    originalPrice: 22999,
    rating: 4.6,
    reviews: 198,
    image: "/images/watch-analog.png",
    category: "Fashion",
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: 20,
    name: "Leather Belt",
    price: 4999,
    originalPrice: 6999,
    rating: 4.2,
    reviews: 134,
    image: "/images/belt.png",
    category: "Fashion",
    inStock: true,
    badge: "Popular",
  },

  // Home & Garden
  {
    id: 21,
    name: "Coffee Maker",
    price: 25199,
    originalPrice: 33599,
    rating: 4.2,
    reviews: 67,
    image: "/images/coffee-maker.jpg",
    category: "Home & Garden",
    inStock: true,
    badge: "New",
  },
  {
    id: 22,
    name: "Comfortable Sofa",
    price: 89999,
    originalPrice: 119999,
    rating: 4.5,
    reviews: 89,
    image: "/images/sofa.png",
    category: "Home & Garden",
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: 23,
    name: "Dining Table",
    price: 69999,
    originalPrice: 89999,
    rating: 4.4,
    reviews: 76,
    image: "/images/dining-table.png",
    category: "Home & Garden",
    inStock: true,
    badge: "Sale",
  },
  {
    id: 24,
    name: "Queen Bed Frame",
    price: 54999,
    originalPrice: 69999,
    rating: 4.3,
    reviews: 112,
    image: "/images/bed-frame.png",
    category: "Home & Garden",
    inStock: true,
    badge: "Popular",
  },
  {
    id: 25,
    name: "Table Lamp",
    price: 8999,
    originalPrice: 12999,
    rating: 4.2,
    reviews: 145,
    image: "/images/lamp.png",
    category: "Home & Garden",
    inStock: true,
    badge: "New",
  },
  {
    id: 26,
    name: "Wall Mirror",
    price: 12999,
    originalPrice: 16999,
    rating: 4.4,
    reviews: 98,
    image: "/images/mirror.png",
    category: "Home & Garden",
    inStock: true,
    badge: "Sale",
  },
  {
    id: 27,
    name: "Plant Pot Set",
    price: 4999,
    originalPrice: 6999,
    rating: 4.1,
    reviews: 167,
    image: "/images/plant-pot.png",
    category: "Home & Garden",
    inStock: true,
    badge: "Popular",
  },
  {
    id: 28,
    name: "Window Curtains",
    price: 7999,
    originalPrice: 10999,
    rating: 4.3,
    reviews: 134,
    image: "/images/curtains.png",
    category: "Home & Garden",
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: 29,
    name: "Area Rug",
    price: 15999,
    originalPrice: 21999,
    rating: 4.5,
    reviews: 89,
    image: "/images/rug.png",
    category: "Home & Garden",
    inStock: true,
    badge: "New",
  },
  {
    id: 30,
    name: "Bookshelf",
    price: 18999,
    originalPrice: 24999,
    rating: 4.4,
    reviews: 156,
    image: "/images/bookshelf.png",
    category: "Home & Garden",
    inStock: true,
    badge: "Sale",
  },

  // Sports
  {
    id: 31,
    name: "Basketball",
    price: 3999,
    originalPrice: 5999,
    rating: 4.3,
    reviews: 189,
    image: "/images/basketball.png",
    category: "Sports",
    inStock: true,
    badge: "Popular",
  },
  {
    id: 32,
    name: "Tennis Racket",
    price: 14999,
    originalPrice: 19999,
    rating: 4.5,
    reviews: 123,
    image: "/images/tennis-racket.png",
    category: "Sports",
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: 33,
    name: "Yoga Mat",
    price: 5999,
    originalPrice: 7999,
    rating: 4.4,
    reviews: 267,
    image: "/images/yoga-mat.png",
    category: "Sports",
    inStock: true,
    badge: "New",
  },
  {
    id: 34,
    name: "Dumbbell Set",
    price: 24999,
    originalPrice: 32999,
    rating: 4.6,
    reviews: 145,
    image: "/images/dumbbells.png",
    category: "Sports",
    inStock: true,
    badge: "Sale",
  },
  {
    id: 35,
    name: "Mountain Bike",
    price: 89999,
    originalPrice: 119999,
    rating: 4.5,
    reviews: 98,
    image: "/images/bicycle.png",
    category: "Sports",
    inStock: true,
    badge: "Popular",
  },
  {
    id: 36,
    name: "Football",
    price: 2999,
    originalPrice: 3999,
    rating: 4.2,
    reviews: 234,
    image: "/images/football.png",
    category: "Sports",
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: 37,
    name: "Swimming Goggles",
    price: 1999,
    originalPrice: 2999,
    rating: 4.3,
    reviews: 178,
    image: "/images/swimming-goggles.png",
    category: "Sports",
    inStock: true,
    badge: "New",
  },
  {
    id: 38,
    name: "Gym Bag",
    price: 8999,
    originalPrice: 11999,
    rating: 4.4,
    reviews: 156,
    image: "/images/gym-bag.png",
    category: "Sports",
    inStock: true,
    badge: "Sale",
  },
  {
    id: 39,
    name: "Protein Shaker",
    price: 1499,
    originalPrice: 1999,
    rating: 4.1,
    reviews: 289,
    image: "/images/protein-shaker.png",
    category: "Sports",
    inStock: true,
    badge: "Popular",
  },
]

const categories = ["All", "Electronics", "Fashion", "Home & Garden", "Sports"]
const priceRanges = [
  { label: "Under PKR 15,000", min: 0, max: 15000 },
  { label: "PKR 15,000 - PKR 30,000", min: 15000, max: 30000 },
  { label: "PKR 30,000 - PKR 60,000", min: 30000, max: 60000 },
  { label: "PKR 60,000+", min: 60000, max: Number.POSITIVE_INFINITY },
]

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("")
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [showInStockOnly, setShowInStockOnly] = useState(false)

  const handleFilter = () => {
    let filtered = products

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Price range filter
    if (selectedPriceRange) {
      const range = priceRanges.find((r) => r.label === selectedPriceRange)
      if (range) {
        filtered = filtered.filter((product) => product.price >= range.min && product.price <= range.max)
      }
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Stock filter
    if (showInStockOnly) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    setFilteredProducts(filtered)
  }

  useEffect(() => {
    handleFilter()
  }, [selectedCategory, selectedPriceRange, sortBy, searchQuery, showInStockOnly])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Search</label>
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.label} value={range.label}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stock Filter */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={showInStockOnly}
                    onCheckedChange={(checked) => setShowInStockOnly(checked as boolean)}
                  />
                  <label htmlFor="inStock" className="text-sm font-medium">
                    In Stock Only
                  </label>
                </div>
              </div>

              <Button onClick={handleFilter} className="w-full">
                Apply Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Sort and Results */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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
                    {product.badge && (
                      <Badge className="absolute top-2 left-2" variant="secondary">
                        {product.badge}
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge className="absolute top-2 right-2" variant="destructive">
                        Out of Stock
                      </Badge>
                    )}
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
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {formatPKR(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button className="w-full" size="sm" disabled={!product.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSelectedCategory("All")
                  setSelectedPriceRange("")
                  setSearchQuery("")
                  setShowInStockOnly(false)
                  setFilteredProducts(products)
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
