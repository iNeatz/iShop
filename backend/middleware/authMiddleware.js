import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
    let token
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            req.user = await User.findById(decoded.id).select('-password')

            // next() --> causing headers to set after sending data to client
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized. Token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized. No Token')
    }

	next()
}
)
export { protect }
