import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';

// Export the interface so it can be used in the controller
export interface CartItem {
  productId: number;
  quantity: number;
  product?: Product;
}

interface Cart {
  userId: number;
  items: CartItem[];
}

@Injectable()
export class CartService {
  private carts: Map<number, Cart> = new Map();

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getCart(userId: number): Promise<CartItem[]> {
    let cart = this.carts.get(userId);
    if (!cart) {
      cart = { userId, items: [] };
      this.carts.set(userId, cart);
    }

    // Fetch product details for each cart item
    for (const item of cart.items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });
      if (product) {
        item.product = product;
      }
    }

    return cart.items;
  }

  async addToCart(userId: number, productId: number, quantity: number): Promise<CartItem[]> {
    const product = await this.productRepository.findOne({
      where: { id: productId, isActive: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cart = this.carts.get(userId);
    if (!cart) {
      cart = { userId, items: [] };
      this.carts.set(userId, cart);
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    return this.getCart(userId);
  }

  async updateCartItem(userId: number, productId: number, quantity: number): Promise<CartItem[]> {
    const cart = this.carts.get(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const item = cart.items.find(item => item.productId === productId);
    if (!item) {
      throw new NotFoundException('Item not found in cart');
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.productId !== productId);
    } else {
      item.quantity = quantity;
    }

    return this.getCart(userId);
  }

  async removeFromCart(userId: number, productId: number): Promise<CartItem[]> {
    const cart = this.carts.get(userId);
    if (cart) {
      cart.items = cart.items.filter(item => item.productId !== productId);
    }
    return this.getCart(userId);
  }

  async clearCart(userId: number): Promise<void> {
    this.carts.delete(userId);
  }
}