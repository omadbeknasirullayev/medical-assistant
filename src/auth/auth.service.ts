import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
export type Tokens = {
  access_token: string
  refresh_token: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async hashedPassword(password: string) {
    return bcryptjs.hashSync(password, 7);
  }

  async compairPassword(password: string, oldPassword: string) {
    console.log(password)
    return bcryptjs.compareSync(password, oldPassword)
  }

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token)
  } 

  //getToken

  async getTokens(user: any, who?: string): Promise<Tokens> {
    
    const jwtPayload = { id: user.id, phone_number: user?.phone_number, email: user?.email, who: 'ADMIN' }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    
    
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}