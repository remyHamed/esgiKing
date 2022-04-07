import express, {Router, Request, Response} from "express";
import {UserService} from "../services";


export class UserController {

    async createUser(req: Request, res: Response) {
        const userBody = req.body;
        if(!userBody.firstName || !userBody.lastName || !userBody.mail || !userBody.password) {
            res.status(400).end(); // 400 -> bad request
            return;
        }
        try {
            const user = await UserService.getInstance().createUser({
                firstName: userBody.firstName,
                lastName: userBody.lastName,
                mail: userBody.mail,
                password: userBody.password
            });
            res.json(user);
        } catch(err) {
            res.status(400).end(); // erreur des données utilisateurs
            return;
        }
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.post('/', express.json(), this.createUser.bind(this)); // permet de forcer le this lors de l'appel de la fonction sayHello
        return router;
    }
}
