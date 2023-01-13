import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
// import { JwtPayload, Tokens } from 'src/admin/types';
// import { CreateCustomerDto } from 'src/customers/dto';
// import { Customer } from 'src/customers/entities/customer.entity';
export type Tokens = {
  access_token: string
  refresh_token: string
}

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel(Customer) private customerReposotory: typeof Customer,
    private readonly jwtService: JwtService,
  ) { }

  //   async registration(customerDto: CreateCustomerDto, res: Response) {
  //     const condidate = await this.customerReposotory.findOne({
  //       where: { email: customerDto.email },
  //     });
  //     if (condidate) {
  //       throw new HttpException('This email has already', HttpStatus.BAD_REQUEST);
  //     }

  //     const hashpassword = bcryptjs.hash(customerDto.hashed_password, 7);
  //     let customer = await this.customerReposotory.create({
  //       hashed_password: hashpassword,
  //       ...customerDto,
  //     });

  //     let token = await this.getTokens(customer);
  //     console.log(token)
  //     token.refresh_token = bcryptjs.hashSync(token.refresh_token, 7)
  //     await this.customerReposotory.update(
  //       { hashed_refresh_token: token.refresh_token },
  //       { where: { id: customer.id } },
  //     );

  //     res.cookie('refTokenCustomer', token, {
  //       maxAge: 7 * 24 * 60 * 60 * 1000,
  //       httpOnly: true,
  //     });
  //     return token;
  //   }

  //   async login(email: string, password: string, res: Response) {
  //     const customer = await this.customerReposotory.findOne({where: {email}})
  //     if (!customer) {
  //         throw new UnauthorizedException("Invalid Email or Password")
  //     }
  //     const validPassword = await bcryptjs.compare(password, customer.hashed_password)
  //     if (customer && validPassword) {
  //         let token = await this.getTokens(customer);
  //         console.log(token)
  //         token.refresh_token = bcryptjs.hashSync(token.refresh_token, 7)
  //         await this.customerReposotory.update(
  //         { hashed_refresh_token: token.refresh_token },
  //         { where: { id: customer.id } },
  //         );

  //         res.clearCookie('refTokenCustomer')
  //         res.cookie('refTokenCustomer', token, {
  //         maxAge: 7 * 24 * 60 * 60 * 1000,
  //         httpOnly: true,
  //         });
  //         return token;
  //     }
  //     throw new UnauthorizedException("Invalid Email or Password")
  //   }



  async hashedPassword(password: string) {
    return await bcryptjs.hash(password, 7);
  }

  async compairPassword(password: string, oldPassword: string) {
    return await bcryptjs.compare(password, oldPassword)
  }

  //getToken
  async getTokens(user: any): Promise<Tokens> {
    const jwtPayload = { id: user.id, phone_number: user.phone_number, email: user?.email }
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