"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Truck, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Helper function to format PKR currency
const formatPKR = (amount: number) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const cartItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 55999,
    quantity: 2,
    image: "/images/wireless-headphones.jpg",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 83999,
    quantity: 1,
    image: "/images/smart-watch.jpg",
  },
]

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [sameAsShipping, setSameAsShipping] = useState(true)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = shippingMethod === "express" ? 4500 : 1500
  const tax = subtotal * 0.17 // 17% GST in Pakistan
  const total = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/cart" className="flex items-center text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+92 300 1234567" />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Karachi" />
                </div>
                <div>
                  <Label htmlFor="state">Province</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sindh">Sindh</SelectItem>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="kpk">Khyber Pakhtunkhwa</SelectItem>
                      <SelectItem value="balochistan">Balochistan</SelectItem>
                      <SelectItem value="islamabad">Islamabad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zip">Postal Code</Label>
                  <Input id="zip" placeholder="75500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Method */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="standard" id="standard" />
                  <div className="flex-1">
                    <Label htmlFor="standard" className="font-medium">
                      Standard Shipping
                    </Label>
                    <p className="text-sm text-gray-600">5-7 business days</p>
                  </div>
                  <span className="font-medium">{formatPKR(1500)}</span>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="express" id="express" />
                  <div className="flex-1">
                    <Label htmlFor="express" className="font-medium">
                      Express Shipping
                    </Label>
                    <p className="text-sm text-gray-600">2-3 business days</p>
                  </div>
                  <span className="font-medium">{formatPKR(4500)}</span>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="easypaisa" id="easypaisa" />
                  <Label htmlFor="easypaisa">EasyPaisa</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="jazzcash" id="jazzcash" />
                  <Label htmlFor="jazzcash">JazzCash</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </div>
              )}

              {paymentMethod === "easypaisa" && (
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <Input id="mobileNumber" placeholder="03XX XXXXXXX" />
                  </div>
                </div>
              )}

              {paymentMethod === "jazzcash" && (
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="jazzMobileNumber">Mobile Number</Label>
                    <Input id="jazzMobileNumber" placeholder="03XX XXXXXXX" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="sameAsShipping"
                  checked={sameAsShipping}
                  onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                />
                <Label htmlFor="sameAsShipping">Same as shipping address</Label>
              </div>

              {!sameAsShipping && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="billingAddress">Address</Label>
                    <Input id="billingAddress" placeholder="123 Main St" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="billingCity">City</Label>
                      <Input id="billingCity" placeholder="Karachi" />
                    </div>
                    <div>
                      <Label htmlFor="billingState">Province</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sindh">Sindh</SelectItem>
                          <SelectItem value="punjab">Punjab</SelectItem>
                          <SelectItem value="kpk">Khyber Pakhtunkhwa</SelectItem>
                          <SelectItem value="balochistan">Balochistan</SelectItem>
                          <SelectItem value="islamabad">Islamabad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="billingZip">Postal Code</Label>
                      <Input id="billingZip" placeholder="75500" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">{formatPKR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Order Totals */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPKR(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (17% GST)</span>
                  <span>{formatPKR(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPKR(total)}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">Your payment information is secure and encrypted</span>
              </div>

              {/* Place Order Button */}
              <Button className="w-full" size="lg">
                Place Order - {formatPKR(total)}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
