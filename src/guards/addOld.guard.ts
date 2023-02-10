// import {
//     CanActivate,
//     ExecutionContext,
//     HttpException,
//     HttpStatus,
//     Injectable,
//     UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { AdminService } from 'src/admin/admin.service';
// import { AdminPermissionService } from 'src/admin_permission/admin_permission.service';
// import { HospitalWardSpecService } from 'src/hospital-ward-spec/hospital-ward-spec.service';
// import { SpecPermissionService } from 'src/spec_permission/spec_permission.service';
// import { UserPermissionService } from 'src/user_permission/user_permission.service';

// @Injectable()
// export class AddOld implements CanActivate {
//     constructor(private readonly jwtService: JwtService, private adminPermission: AdminPermissionService, private userPermission: UserPermissionService, private specPermission: SpecPermissionService, private adminService: AdminService, private hospitalSpec: HospitalWardSpecService) { }
//     async canActivate(
//         context: ExecutionContext,
//     ) {
//         try {
//             const req = context.switchToHttp().getRequest();
//             const authHeader = req.headers.authorization;
//             if (!authHeader) {
//                 throw new UnauthorizedException({ message: "The user is not authorized" })
//             }

//             const bearer = authHeader.split(' ')[0];
//             const token = authHeader.split(' ')[1];

//             if (bearer !== 'Bearer' || !token) {
//                 throw new UnauthorizedException({
//                     message: "The user is not authorized",
//                 });
//             }

//             // console.log(token)
//             const date = await this.jwtService.verify(token, { publicKey: process.env.ACCESS_TOKEN_KEY });
//             let permission = []
//             const body = req.body
//             console.log(req.method)

//             switch (date.who) {
//                 case 'ADMIN':
//                     const adminPer = await this.adminPermission.findByAdminId(date.id)
//                     for (let i of adminPer) {
//                         permission.push(i.dataValues.permission.dataValues.name)
//                     }
//                     if (permission.includes('super-admin') || permission.includes('creator')) {
//                         switch (req.url) {
//                             case '/lobaratory-diagnosis':
//                             case '/user-date':
//                             case '/treatment':
//                             case '/diagnosis':
//                             case '/users':
//                             case '/specialist':
//                             case '/recipe': throw new UnauthorizedException({
//                                 message: "The user is not authorized",
//                             });
//                         }
//                         return true
//                     }

//                     if (permission.includes('add')) {
//                         const admin = await this.adminService.findOne(date.id)
//                         if (admin) {
//                             if (admin.hospital_id && body[`hospital_id`] == admin.hospital_id)
//                                 switch (req.url) {
//                                     case '/hospital_ward':
//                                     case '/hospital-ward-spec':
//                                     case '/lobaratory-diagnosis': return true
//                                 }
//                         }
//                     }
//                     throw new UnauthorizedException({
//                         message: "The admin is not authorized",
//                     });

//                 case 'USER':
//                     // const user = await this.userPermission.findByUserId(date.id)
//                     // for (let i of user) {
//                     //     permission.push(i.dataValues.permission.dataValues.name)
//                     // }
//                     // if (permission.includes('add')) {
//                         switch (req.url) {
//                             case '/user-date':
//                             // case 
//                                 switch (body['user_id']) {
//                                     case date.id: return true
//                                 }
//                                 break
//                             case '/users':
//                                 switch (req.params.id) {
//                                     case date.id: return true
//                                 }
//                                 break
//                         }
//                     // }
//                     throw new UnauthorizedException({
//                         message: "The user is not authorized",
//                     });

//                 case 'SPEC':
//                     const spec = await this.specPermission.findBySpecId(date.id)
//                     for (let i of spec) {
//                         permission.push(i.dataValues.permission.dataValues.name)
//                     }
//                     if (permission.includes('add')) {
//                         switch (req.url) {
//                             case '/treatment':
//                                 switch (body['user_id']) {
//                                     case date.id:
//                                         const specHospital = await this.hospitalSpec.findBySpecId(date.id, body['ward_id'])
//                                         if (!specHospital) {
//                                             throw new UnauthorizedException({
//                                                 message: "The spec is not authorized",
//                                             });
//                                         }
//                                         if (specHospital.is_active) return true
//                                         throw new UnauthorizedException({
//                                             message: "The spec is not authorized",
//                                         });
//                                 }
//                                 break
//                             case '/diagnosis':
//                                 switch (body['user_id']) {
//                                     case date.id: return true
//                                 }
//                         }
//                     }
//                     throw new UnauthorizedException({
//                         message: "The spec is not authorized",
//                     });
//             }

//             throw new UnauthorizedException({
//                 message: "The user is not authorized",
//             });

//         } catch (error) {
//             // console.log(error)
//             throw new HttpException(
//                 'Ruxsat etilmagan foydalanuvchi',
//                 HttpStatus.FORBIDDEN
//             );
//         }
//     }
// }
