import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const slug = this.generateSlug(createProductDto.name);
    const product = this.productRepository.create({
      ...createProductDto,
      slug,
    });
    return await this.productRepository.save(product);
  }

  async findAll(page: number = 1, limit: number = 10, search?: string): Promise<{ products: Product[]; total: number }> {
    const skip = (page - 1) * limit;
    
    const whereCondition: any = {};
    if (search) {
      whereCondition.name = Like(`%${search}%`);
    }
    
    const [products, total] = await this.productRepository.findAndCount({
      where: whereCondition,
      relations: {
        category: true,
      },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    
    return { products, total };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: {
        category: true,
      },
    });
    
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    
    if (updateProductDto.name && updateProductDto.name !== product.name) {
      product.slug = this.generateSlug(updateProductDto.name);
    }
    
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async updateStock(id: number, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    product.stockQuantity = quantity;
    return await this.productRepository.save(product);
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}