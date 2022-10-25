import { NextFunction,Response } from 'express'
import jwt from 'jsonwebtoken'

const verifyToken = (req: any, res: Response, next: NextFunction) =>{
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('Access Denied!')
    try {
        const verified = jwt.verify(token, `${process.env.TOKEN_SECRET}`)
        req.user = verified
        next()
    } catch(err) {
        res.status(400).send('Invalid Token!')
    }
}

export default verifyToken