"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react"

export default function Header() {
  const [cartItems] = useState(3)
  const [wishlistItems] = useState(2)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4" suppressHydrationWarning={true}>
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b" suppressHydrationWarning={true}>
          <div className="flex items-center gap-4" suppressHydrationWarning={true}>
            <span>Free shipping on orders over PKR 14,000</span>
          </div>
          <div className="flex items-center gap-4" suppressHydrationWarning={true}>
            <Link href="/track-order" className="hover:text-blue-600">
              Track Order
            </Link>
            <Link href="/help" className="hover:text-blue-600">
              Help
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4" suppressHydrationWarning={true}>
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Z-Mart
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8" suppressHydrationWarning={true}>
            <div className="relative w-full" suppressHydrationWarning={true}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input type="search" placeholder="Search products..." className="pl-10 pr-4" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4" suppressHydrationWarning={true}>
            {/* Wishlist */}
            <Link href="/wishlist" className="relative">
              <Button variant="ghost" size="sm">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {wishlistItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">Register</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="search" placeholder="Search products..." className="pl-10 pr-4" />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                <Link
                  href="/products"
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Products
                </Link>
                <Link
                  href="/category/electronics"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Electronics
                </Link>
                <Link
                  href="/category/fashion"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Fashion
                </Link>
                <Link
                  href="/category/home-garden"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home & Garden
                </Link>
                <Link
                  href="/category/sports"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sports
                </Link>
              </nav>

              {/* Mobile User Actions */}
              <div className="border-t pt-4 space-y-2">
                <Link
                  href="/login"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  href="/profile"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  href="/orders"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Orders
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 py-4 border-t">
          <Link href="/products" className="hover:text-blue-600 font-medium">
            All Products
          </Link>
          <Link href="/category/electronics" className="hover:text-blue-600">
            Electronics
          </Link>
          <Link href="/category/fashion" className="hover:text-blue-600">
            Fashion
          </Link>
          <Link href="/category/home-garden" className="hover:text-blue-600">
            Home & Garden
          </Link>
          <Link href="/category/sports" className="hover:text-blue-600">
            Sports
          </Link>
        </nav>
      </div>
    </header>
  )
}
