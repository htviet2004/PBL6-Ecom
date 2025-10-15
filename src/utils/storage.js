// Simple localStorage helpers for persisting seller data per shop
// Keys: seller:products:<shopId>, seller:orders:<shopId>

const PRODUCTS_KEY = (shopId) => `seller:products:${shopId}`
const ORDERS_KEY = (shopId) => `seller:orders:${shopId}`

export function getSellerProducts(shopId, seedProducts = []){
  const key = PRODUCTS_KEY(shopId)
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore parse error, will seed below */ }
  // Seed on first access
  try {
    localStorage.setItem(key, JSON.stringify(seedProducts))
  } catch { /* ignore set error */ }
  return seedProducts
}

export function setSellerProducts(shopId, products){
  const key = PRODUCTS_KEY(shopId)
  localStorage.setItem(key, JSON.stringify(products))
}

export function getSellerOrders(shopId){
  const key = ORDERS_KEY(shopId)
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore parse error, return empty */ }
  return []
}

export function setSellerOrders(shopId, orders){
  const key = ORDERS_KEY(shopId)
  localStorage.setItem(key, JSON.stringify(orders))
}

// Helpers to generate simple sample orders for a shop (optional)
export function ensureSampleOrders(shopId, products){
  let orders = getSellerOrders(shopId)
  if (orders.length > 0) return orders
  if (!products || products.length === 0) return []

  const now = Date.now()
  const sample = [
    {
      id: `${shopId}-1001`,
      date: new Date(now - 86400000 * 1).toISOString(),
      status: 'pending',
      items: [ { productId: products[0].id, name: products[0].name, qty: 1, price: products[0].price } ],
    },
    {
      id: `${shopId}-1002`,
      date: new Date(now - 86400000 * 3).toISOString(),
      status: 'shipped',
      items: [ { productId: products[1]?.id || products[0].id, name: products[1]?.name || products[0].name, qty: 2, price: (products[1]?.price || products[0].price) } ],
    },
  ]
  setSellerOrders(shopId, sample)
  return sample
}
