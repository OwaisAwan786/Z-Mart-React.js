"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Package, Search, Eye, Download, Truck } from "lucide-react"
import Link from "next/link"

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 299.99,
    items: 3,
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA1234567890",
    items_detail: [
      { name: "Wireless Headphones", quantity: 1, price: 199.99, image: "/images/wireless-headphones.jpg" },
      { name: "Phone Case", quantity: 2, price: 50.0, image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 149.99,
    items: 1,
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA1234567891",
    items_detail: [{ name: "Bluetooth Speaker", quantity: 1, price: 149.99, image: "/images/bluetooth-speaker.jpg" }],
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "processing",
    total: 79.99,
    items: 1,
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: null,
    items_detail: [{ name: "Laptop Stand", quantity: 1, price: 79.99, image: "/images/laptop-stand.jpg" }],
  },
  {
    id: "ORD-004",
    date: "2023-12-28",
    status: "cancelled",
    total: 399.99,
    items: 1,
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: null,
    items_detail: [{ name: "Smart Watch", quantity: 1, price: 399.99, image: "/images/smart-watch.jpg" }],
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      delivered: "default",
      shipped: "outline",
      processing: "secondary",
      cancelled: "destructive",
    }
    return <Badge variant={variants[status] || "default"}>{status}</Badge>
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items_detail.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const selectedOrderDetails = selectedOrder ? orders.find((o) => o.id === selectedOrder) : null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                <p className="text-gray-600 mb-4">You haven't placed any orders yet or no orders match your search.</p>
                <Link href="/products">
                  <Button>Start Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card
                key={order.id}
                className={`cursor-pointer transition-all ${selectedOrder === order.id ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => setSelectedOrder(order.id)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                      <p className="text-sm text-gray-600">{order.items} item(s)</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status)}
                      <p className="font-semibold text-lg mt-1">${order.total}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    {order.items_detail.slice(0, 3).map((item, index) => (
                      <img
                        key={index}
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ))}
                    {order.items_detail.length > 3 && (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-sm font-medium">
                        +{order.items_detail.length - 3}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {order.trackingNumber && (
                      <Button variant="outline" size="sm">
                        <Truck className="h-4 w-4 mr-2" />
                        Track
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Order Details */}
        <div>
          {selectedOrderDetails ? (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>{selectedOrderDetails.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Status</h4>
                  {getStatusBadge(selectedOrderDetails.status)}
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Items</h4>
                  <div className="space-y-3">
                    {selectedOrderDetails.items_detail.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                  <p className="text-sm text-gray-600">{selectedOrderDetails.shippingAddress}</p>
                </div>

                {selectedOrderDetails.trackingNumber && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Tracking Number</h4>
                      <p className="text-sm font-mono bg-gray-100 p-2 rounded">{selectedOrderDetails.trackingNumber}</p>
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${selectedOrderDetails.total}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full">Reorder Items</Button>
                  <Button variant="outline" className="w-full">
                    Download Invoice
                  </Button>
                  {selectedOrderDetails.status === "delivered" && (
                    <Button variant="outline" className="w-full">
                      Leave Review
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-4">
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="font-semibold mb-2">Select an Order</h3>
                <p className="text-gray-600 text-sm">Click on an order to view its details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
