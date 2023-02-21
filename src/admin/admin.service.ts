import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import * as otpGenerator from 'otp-generator'
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from '../entity/admin.entity';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/loginDto';
import { ForgotPasswordDto } from './dto/forgotPassDto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepository: typeof Admin, private authService: AuthService, private mailService: MailService) { }

  // registration for admin
  async registration(createAdminDto: CreateAdminDto) {
    let admin = await this.adminRepository.findOne({ where: { email: createAdminDto.email } })
    if (admin) {
      throw new HttpException("This email already reagistrate", HttpStatus.BAD_REQUEST)
    }
    admin = await this.adminRepository.findOne({ where: { phone_number: createAdminDto.phone_number } })
    if (admin) {
      throw new HttpException("This phone number already registrate", HttpStatus.BAD_REQUEST)
    }
    const password = await this.authService.hashedPassword(createAdminDto.password)
    console.log(1)
    admin = await this.adminRepository.create({ ...createAdminDto, password: password })
    const token = await this.authService.getTokens(admin)
    return await this.adminRepository.update({ token: token.refresh_token }, { where: { id: admin.id }, returning: true })
  }

  // login for admin
  async login(loginDto: LoginDto) {
    
    if (loginDto.phone_number) {
      const admin = await this.adminRepository.findOne({ where: { phone_number: loginDto.phone_number } })
      if (!admin) {
        throw new NotFoundException("Phone number or password invalid")
      }
      const pass = await this.authService.compairPassword(loginDto.password, admin.password)
      if (!pass) {
        throw new NotFoundException("Phone number or password invalid")
      }
      const token = await this.authService.getTokens(admin)
      await this.adminRepository.update({ token: token.refresh_token }, { where: { id: admin.id } })
      return token
    } else {
      const admin = await this.adminRepository.findOne({ where: { email: loginDto.email } })
      if (!admin) {
        throw new NotFoundException("Email or password invalid")
      }
      const pass = await this.authService.compairPassword(loginDto.password, admin.password)
      console.log(pass)
      if (!pass) {
        throw new NotFoundException("Email or password invalid")
      }

      const token = await this.authService.getTokens(admin)
      await this.adminRepository.update({ token: token.refresh_token }, { where: { id: admin.id } })
      return token
    }
  }

  // forgot password for admin
  async forgotPassword(forgotPass: ForgotPasswordDto) {
    if (forgotPass.phone_number) {
      const admin = await this.adminRepository.findOne({ where: { phone_number: forgotPass.phone_number } })

      if (!admin) {
        throw new NotFoundException("Phone number not found")
      }
      const code = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false, 
      })
      const hashedPass = await this.authService.hashedPassword(code)
      await this.adminRepository.update({password: hashedPass}, {where: {id: admin.id}})
      return code
    } else {
      const admin = await this.adminRepository.findOne({ where: { email: forgotPass.email } })
      if (!admin) {
        throw new NotFoundException("Email not found")
      }
      const code = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
      })
      const hashedPass = await this.authService.hashedPassword(code)
      await this.adminRepository.update({ password: hashedPass }, { where: { id: admin.id } })
      let html = `<h1> Your password changed </h1> <b> ${code} </b>`
      await this.mailService.sendMail(admin.email, html)
      return code
    }
  }

  async findAll() {
    return await this.adminRepository.findAll({ include: {all: true}})
  }

  async findOne(id: number) {
    return await this.adminRepository.findOne({ where: { id }, include: { all: true} })
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.adminRepository.update(updateAdminDto, { where: { id } })
  }

  async remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
