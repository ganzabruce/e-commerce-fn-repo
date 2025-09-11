import React, { useState } from 'react'
import type { CartItem, CartModalProps as Props } from './types'
import CartHeader from './CartHeader'
import CartStatus from './CartStatus'
import CartItemRow from './CartItemRow'
import CartFooter from './CartFooter'

const CartModal: React.FC<Props> = ({ isOpen, onClose, items = [] }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(items.length > 0 ? items : [
    {
      id: '1',
      name: 'Apple iPhone 11 Pro Max 256GB',
      price: 199.00,
      originalPrice: 254.00,
      image: '/api/placeholder/60/60',
      quantity: 1,
      category: 'Electronics'
    },
    {
      id: '2',
      name: 'Apple AirPods with Wireless Charging Case',
      price: 85.00,
      image: '/api/placeholder/60/60',
      quantity: 2,
      category: 'Audio'
    },
    {
      id: '3',
      name: 'Apple Watch Series 5',
      price: 499.00,
      originalPrice: 599.00,
      image: '/api/placeholder/60/60',
      quantity: 1,
      category: 'Wearables'
    }
  ])

  if (!isOpen) return null

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const isEmpty = cartItems.length === 0

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex">
      <div className="ml-auto bg-amber-400 w-full max-w-md h-full shadow-2xl transform transition-transform duration-300">
        <CartHeader onClose={onClose} />
        <div className="bg-white h-[calc(100vh-80px)] flex flex-col">
          <CartStatus isEmpty={isEmpty} totalItems={getTotalItems()} onContinue={onClose} />
          {!isEmpty && (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItemRow 
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </div>
              <CartFooter total={getTotalPrice()} onContinue={onClose} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartModal