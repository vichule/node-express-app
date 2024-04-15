import jwtoken, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const PRIVATE_TOKEN: Secret = process.env.TOKEN_SECRET || ''

export const generateAccessToken = (username: string) => {
    return jwtoken.sign({ username }, PRIVATE_TOKEN, { expiresIn: '1800d' });
}