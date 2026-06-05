import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService, CartItem } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
@UseGuards(AuthGuard('jwt'))
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Request() req): Promise<CartItem[]> {
    return this.cartService.getCart(req.user.id);
  }

  @Post('add')
  async addToCart(
    @Request() req,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number
  ): Promise<CartItem[]> {
    return this.cartService.addToCart(req.user.id, productId, quantity);
  }

  @Post('update')
  async updateCartItem(
    @Request() req,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number
  ): Promise<CartItem[]> {
    return this.cartService.updateCartItem(req.user.id, productId, quantity);
  }

  @Delete('remove/:productId')
  async removeFromCart(@Request() req, @Param('productId') productId: string): Promise<CartItem[]> {
    return this.cartService.removeFromCart(req.user.id, +productId);
  }

  @Delete('clear')
  async clearCart(@Request() req): Promise<void> {
    return this.cartService.clearCart(req.user.id);
  }
}