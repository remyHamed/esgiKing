import express, { Router } from 'express';
import {UserController} from "../controller";
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';

const userRoute = Router();

userRoute.route('/')

    .get(async (req,res) => {
        try {

            return res.status(StatusCodes.OK).json(await UserController.getInstance().getUsers());

        } catch(err) {

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();

        }
    })

    .post(express.json(),async (req,res) => {

        const userBody = req.body;

        if(!userBody.firstName || !userBody.lastName || !userBody.mail || !userBody.password) {

            return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST).end();
        }

        try {

            const user = await UserController.getInstance().createUser({...userBody});

            return res.status(StatusCodes.CREATED).json(user);

        } catch(err) {
            if(
                err === "Incorrect email format" ||
                err === "Incorrect password format" ||
                err === "Incorrect first name format" ||
                err === "Incorrect last name format"
            ) {
                return res.status(StatusCodes.BAD_REQUEST).send({error: err}).end();
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }
    });

userRoute.route('/:u_id')
    .get( async (req,res) => {
        try{
            const u = await UserController.getInstance().getById(req.params.u_id);

            if (u != null) {
                return res.status(StatusCodes.OK).json(u);
            }else {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: "not found"}).end();
            }
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }

    });

userRoute.route('/:user_id/:user_id_delete')
    .delete( async (req,res) => {
    try {
        //   return res.status(StatusCodes.OK).json(await UserController.getInstance().getUsers());
        const result = await UserController.getInstance().delete(req.params.user_id, req.params.user_id_delete);

        return res.status(StatusCodes.OK).json(result);

    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
    }
});

userRoute.route('/auth')
    .post(express.json(),async (req,res) => {
        const userBody = req.body;
        if(!userBody.mail || !userBody.password) {
            return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST).end();
        }

        try {

            const user = await UserController.getInstance().logIn({...userBody});

            return res.json(user);

        } catch(err) {

            if(err === "Incorrect mail or password") {

                return res.status(StatusCodes.BAD_REQUEST).send({error: err}).end();

            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();

        }
    });

userRoute.route('/logInTerminal')
    .post( express.json(),async (req,res) => {

        const userBody = req.body;

        console.log(userBody);

        if(!userBody.mail || !userBody.password) {
            return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST).end();
        }

        try {

            const mail = req.body.mail;

            const pwd =  req.body.password;

            const result = await UserController.getInstance().logInTerminal({mail: mail, password: pwd})

            return res.status(StatusCodes.OK).json(result);

        } catch(err) {

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();

        }
    });


export default userRoute;