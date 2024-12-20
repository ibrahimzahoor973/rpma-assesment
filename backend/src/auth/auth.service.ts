import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  // Mock user authentication - in production, implement proper user authentication
  // async validateUser(username: string, password: string): Promise<any> {
  //   if (username === 'admin' && password === 'admin') {
  //     return { id: 1, username: 'admin' };
  //   }
  //   return null;
  // }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}