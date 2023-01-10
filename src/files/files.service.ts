import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import* as path from 'path'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
    async createFile(file: any, file_ex: string): Promise <string> {
        try {
            const fileName = uuid.v4() + `${file_ex}`
            let filePath = ""
            if (file_ex == '.jpg')
                filePath = path.resolve(__dirname, '..', 'static/images')
            else
                filePath = path.resolve(__dirname, '..', 'static/files')

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            // console.log(fileName)
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch (error) {
            throw new HttpException (
                'Faylni yozishda xatolik',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async removeFile(fileName: string, file_ex: string) {
        try {
            let filePath = ""
            if (file_ex == '.jpg')
                filePath = path.resolve(__dirname, '..', 'static/images')
            else 
                filePath = path.resolve(__dirname, '..', 'static/files')

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