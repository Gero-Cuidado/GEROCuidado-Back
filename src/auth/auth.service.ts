import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string; refresh_token: string; user: User }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // Access Token (1h)
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }), // Refresh Token (7 dias)
      user: user, // Retorna o objeto user completo
    };
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken); // Verifica o refresh token
      const user = await this.usersService.findOne(payload.sub); // Busca o usuário pelo ID
      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }
      const newPayload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(newPayload), // Gera um novo access token
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}