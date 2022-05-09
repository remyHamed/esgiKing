import express, { Router } from 'express';
import {UserService} from "../services";
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';

const userRoute = Router();

userRoute.route('/')

    .get(async (req,res) => {
        try {
            return res.status(StatusCodes.OK).json(await UserService.getInstance().getUsers());
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

            const user = await UserService.getInstance().createUser({...userBody});

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


            const u = await UserService.getInstance().getById(req.params.u_id);

            if (u != null) {
                return res.status(StatusCodes.OK).json(u);
            }else {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: "not found"}).end();
            }


    });

userRoute.route('/:user_id/:user_id_delete')
    .delete( async (req,res) => {
    try {
        //   return res.status(StatusCodes.OK).json(await UserService.getInstance().getUsers());
        const result = await UserService.getInstance().delete(req.params.user_id, req.params.user_id_delete);

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

            const user = await UserService.getInstance().logIn({...userBody});

            return res.json(user);

        } catch(err) {

            if(err === "Incorrect mail or password") {

                return res.status(StatusCodes.BAD_REQUEST).send({error: err}).end();

            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();

        }
    });

export default userRoute;