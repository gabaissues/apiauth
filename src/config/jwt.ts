import jwt from 'jsonwebtoken'

const secret = 'dhnSAdDSAJdnASDJNMwsKMJIFkd125'

export const sign = (options: object) => jwt.sign(options, secret, { expiresIn: 360000 })
export const verify = (token: string) => jwt.verify(token, secret)