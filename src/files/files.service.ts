import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import* as path from 'path'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
    async createFile(file: any, whoIs?: string): Promise <string> {
        try {
            let file_ex = String(file.originalname).split(".")
            const fileName = uuid.v4() + `.${file_ex[file_ex.length - 1]}`
            let filePath = ""
            filePath = path.resolve(__dirname, '..', `static/${whoIs}/${file.fieldname}`)
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch (error) {
            throw new HttpException (
                'Faylni yozishda xatolik',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async removeFile(fileName: string, whoIs: string, file: string) {
        try {
            let filePath = ""
                filePath = path.resolve(__dirname, '..', `static/${whoIs}/${file}`)

            fs.unlinkSync(path.join(filePath, fileName))

            return 0
        } catch (error) {
            throw new HttpException (
                "Faylni o'chirishda xatolik",
                HttpStatus.INTERNAL_SERVER_ERROR
            ) 
        }
    }
}