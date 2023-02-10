import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/entity/user.entity';
import { FilesService } from 'src/files/files.service';
import { MailService } from 'src/mail/mail.service';
import { CreateBloodType } from './dto/createBloodType';
import { CreateUserInfoDto } from './dto/createUserInfo.dto';
import { Login } from './dto/login.dto';
import { Registration } from './dto/registration.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
    readonly authService: AuthService,
    readonly mailerService: MailService,
    readonly fileService: FilesService
  ) { }

  //registration
  async registration(regist: Registration) {
    const user = await this.userRepository.findOne({ where: { phone_number: regist.phone_number } })
    if (user) {
      throw new HttpException('This phone number already registration', HttpStatus.BAD_REQUEST)
    }
    regist.password = await this.authService.hashedPassword(regist.password)
    let newUser = await this.userRepository.create(regist)
    newUser = newUser.dataValues
    const token = await this.authService.getTokens(newUser, 'USER')
    await this.userRepository.update({ token: token.refresh_token }, { where: { id: newUser.id } })
    return token
  }

  //login
  async login(login: Login) {
    const user = await this.userRepository.findOne({ where: { phone_number: login.phone_number } })
    if (!user) {
      throw new HttpException("Phone number or password invalid", HttpStatus.BAD_REQUEST)
    }

    const validPassword = await this.authService.compairPassword(login.password, user.password)
    if (!validPassword) {
      throw new HttpException("Phone number or password invalid", HttpStatus.BAD_REQUEST)
    }

    const token = await this.authService.getTokens(user, user.user_type == 1? 'USER' : 'SPEC')
    await this.userRepository.update({ token: token.refresh_token }, { where: { id: user.id } })
    return token
  }

  //logout
  async logout(id: number) {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return await this.userRepository.update({ is_active: false, token: null }, { where: { id } })
  }


  async refreshToken(id: number) {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    const token = await this.authService.getTokens(user, user.user_type == 1? 'USER' : 'SPEC')
    await this.userRepository.update({ token: token.refresh_token }, { where: { id } })
    return token
  }

  //forgotPassword
  // async forgotPassword(email: string) {
  //   const user = await this.userRepository.findOne({ where: { email } })
  //   if (!user) {
  //     throw new NotFoundException("User not found")
  //   }
  //   console.log(user)
  //   await this.mailerService.sendMail(email, "omadbek")
  // }

  //activate
  async activation(id: number) {
    return await this.userRepository.update({ is_active: true }, { where: { id } })
  }

  //deActivate
  async deActivation(id: number) {
    return await this.userRepository.update({ is_active: false }, { where: { id } })
  }

  //create avatar
  async createAvatar(id: number, photo: any) {
    const fileName = await this.fileService.createFile(photo, 'users')
    return await this.userRepository.update({ photo: fileName }, { where: { id } })
  }

  //update avatar
  async updateAvatar(id: number, photo: any) {
    const spec = await this.userRepository.findOne({ where: { id } })
    if (!spec) {
      throw new NotFoundException("Specialist not found")
    }
    await this.fileService.removeFile(spec.photo, 'users', 'photo')
    const fileName = await this.fileService.createFile(photo, 'users')
    return await this.userRepository.update({ photo: fileName }, { where: { id } })
  }

  //deleteAvatar
  async deleteAvatar(id: number) {
    const spec = await this.userRepository.findOne({ where: { id } })
    if (!spec) {
      throw new NotFoundException('Specialist not found')
    }
    return await this.fileService.removeFile(spec.photo, 'users', 'photo')
  }

  // create Blood type
  async createBloodType(id: number, bloodType: CreateBloodType) {
    return await this.userRepository.update(bloodType, { where: { id }, returning: true })
  }

  //create
  async create(id: number, createUserInfoDto: CreateUserInfoDto) {
    return await this.userRepository.update({ ...createUserInfoDto }, { where: { id }, returning: true })
  }

  //findAll
  async findAll() {
    return await this.userRepository.findAll()
  }

  //findOne
  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } })
  }

  //update Use
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ ...updateUserDto }, { where: { id } })
  }

  //removePermenantly
  async removePermanently(id: number) {
    return await this.userRepository.destroy({ where: { id } })
  }
}
