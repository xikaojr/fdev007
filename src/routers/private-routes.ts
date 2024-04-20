import express from 'express'
import jwt from 'jsonwebtoken';
import usuariosRouters from './usuarios-router';

const PrivateRoutes = express.Router();

PrivateRoutes.use(function (request, response, next) {
    let logged = false
    const token: string = <string>request.headers.token;
    if (token) {
        try {
            const tokenDecifrado = jwt.verify(token, 'sis-iw-0928eji0ici43083-90k494830-94398');
            if (tokenDecifrado) {
                logged = true;
            }
        } catch (e) {
            return response.json(e);
        }
    }

    if (logged === false) {
        return response.json({ 'message': 'Token inválido ou não enviado!' })
    }
    next();
});

PrivateRoutes.use(usuariosRouters);

export default PrivateRoutes;