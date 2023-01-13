// import * as crypto from 'crypto'
// import {createCipheriv, scrypt} from 'crypto'
// import * as dotenv from 'dotenv'
// import { promisify } from 'util'
// dotenv.config({path: `.${process.env.NODE_ENV}.env`})
// var password = process.env.CRYPTO_PASSWORD 
// var iv = Buffer.from(process.env.IV); // Initialization vector. 
// var ivstring = iv.toString("hex"); 

// function sha256(input: any) { 
//   return crypto.createHash("sha256").update(input).digest(); 
// } 

// function password_derive_bytes(password: string, salt: string, iterations: number, len: number) { 
//   var key = Buffer.from(password + salt); 
//   for (var i = 0; i < iterations; i++) { 
//     key = sha256(key); 
//   } 
//   if (key.length < len) { 
//     var hx = password_derive_bytes(password, salt, iterations - 1, 20); 
//     for (var counter = 1; key.length < len; ++counter) { 
//       key = Buffer.concat([ 
//         key,
//         sha256(Buffer.concat([Buffer.from(counter.toString()), hx])), 
//       ]);
//     } 
//   } 
//   return Buffer.alloc(len, key); 
// }

// export async function encode(enc: string) { 
//   // let key = password_derive_bytes(password, "", 100, 32); 
//   // // let cipher = crypto.createCipheriv("aes-256-cbc", key, ivstring);
//   // let cipher = createCipheriv("aes-256-ctr", key, ivstring)
//   // let part1 = cipher.update(enc, "utf8");
//   // let part2 = cipher.final();
//   // const encrypted = Buffer.concat([part1, part2]).toString("base64");
//   // return encrypted; 
//   const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
// const cipher = createCipheriv('aes-256-ctr', key, iv);

// const textToEncrypt = enc;
// const encryptedText = Buffer.concat([
//   cipher.update(textToEncrypt),
//   cipher.final(),
// ]);
//   return encryptedText
// } 
 
// export async function decode(dec: string) { 
//   let key = password_derive_bytes(password, "", 100, 32); 
//   let decipher = crypto.createDecipheriv("aes-256-cbc", key, ivstring); 
//   let decrypted = decipher.update(dec, "base64", "utf8"); 
//   decrypted += decipher.final(); 
//   return decrypted; 
// } 
 
// module.exports = { encode, decode };