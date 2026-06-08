import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: Partial<User>; token: string }> {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
      role: 'customer', // Default role
    });

    await this.userRepository.save(user);
    
    const token = this.generateToken(user);
    
    const { password, ...result } = user;
    console.log('User registered:', result); // Debug log
    return { user: result, token };
  }

  async login(loginDto: LoginDto): Promise<{ user: Partial<User>; token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    console.log('Login attempt for:', loginDto.email); // Debug log
    console.log('User found:', user ? 'Yes' : 'No'); // Debug log

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);
    
    const { password, ...result } = user;
    console.log('User logged in:', result); // Debug log
    console.log('User role:', result.role); // Debug log
    return { user: result, token };
  }

  private generateToken(user: User): string {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };
    console.log('Generating token for role:', user.role); // Debug log
    return this.jwtService.sign(payload);
  }
}