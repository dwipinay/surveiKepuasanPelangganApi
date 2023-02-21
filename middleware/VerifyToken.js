import jsonWebToken from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send({
        status: false,
        message: 'Unauthorized'
    })

    jsonWebToken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        if (err){
            res.status(403).send({
                status: false,
                message: 'Forbidden'
            })
            return
        }
        req.user = result
        next()
    })
}