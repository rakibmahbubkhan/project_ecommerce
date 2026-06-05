import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_number', unique: true })
  orderNumber: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ name: 'discount_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ name: 'tax_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ name: 'shipping_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
  shippingAmount: number;

  @Column({ name: 'grand_total', type: 'decimal', precision: 10, scale: 2 })
  grandTotal: number;

  @Column({ type: 'enum', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' })
  status: string;

  @Column({ name: 'payment_method', nullable: true })
  paymentMethod: string;

  @Column({ name: 'payment_status', type: 'enum', enum: ['pending', 'paid', 'failed'], default: 'pending' })
  paymentStatus: string;

  @Column({ name: 'shipping_address', type: 'text', nullable: true })
  shippingAddress: string;

  @Column({ name: 'billing_address', type: 'text', nullable: true })
  billingAddress: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}