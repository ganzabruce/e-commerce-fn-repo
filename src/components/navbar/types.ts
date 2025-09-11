export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  category?: string
}

export interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  items?: CartItem[]
}


