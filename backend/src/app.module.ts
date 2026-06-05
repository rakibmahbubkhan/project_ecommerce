import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CartModule } from './modules/cart/cart.module';
import { User } from './modules/auth/entities/user.entity';
import { Product } from './modules/products/entities/product.entity';
import { Category } from './modules/categories/entities/category.entity';
import { Order } from './modules/orders/entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = {
          type: 'mysql' as const,
          host: configService.get('DB_HOST', 'localhost'),
          port: parseInt(configService.get('DB_PORT', '3306')),
          username: configService.get('DB_USERNAME', 'root'),
          password: configService.get('DB_PASSWORD', '123'),
          database: configService.get('DB_DATABASE', 'project_ecommerce'),
          entities: [User, Product, Category, Order],
          synchronize: false,
          logging: true,
          connectTimeout: 60000,
          acquireTimeout: 60000,
        };
        
        console.log('Attempting database connection to:', {
          host: dbConfig.host,
          port: dbConfig.port,
          database: dbConfig.database,
          user: dbConfig.username
        });
        
        return dbConfig;
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    CartModule,
  ],
})
export class AppModule {}