import express from 'express'
import jwt from 'jsonwebtoken';
import usuariosRouters from './users/userRouter';

const PrivateRoutes = express.Router();

PrivateRoutes.use(function (request, response, next) {
    const token: string = <string>request.headers.authorization;

    if (!token) {
        return response.status(401).json({ message: 'Token de autenticação não fornecido' });
    }
    try {
        jwt.verify(token.split(' ')[1], 'sis-iw-0928eji0ici43083-90k494830-94398');
        next();
    } catch (e) {
        return response.status(403).json({ message: 'Falha na autenticação do token' });
    }
});

PrivateRoutes.use(usuariosRouters);

export default PrivateRoutes;