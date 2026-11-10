import type { Product, ProductsResponse } from '../types/product'

const API_URL = 'https://dummyjson.com/products'

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}?limit=12&skip=0`)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data: ProductsResponse = await response.json()

  return data.products
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/category-list`)

  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }

  const categories: string[] = await response.json()

  return categories
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`)

  if (response.status === 404) {
    throw new Error('Product not found')
  }

  if (!response.ok) {
    throw new Error('Failed to fetch product')
  }

  const product: Product = await response.json()

  return product
}