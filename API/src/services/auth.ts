import express, { Router } from 'express';
import {
    StatusCodes
} from 'http-status-codes';
import {ExpiredException, NotFoundException} from "../lib";
import {AuthController} from "../controller/auth";

const authRoute = Router();

authRoute.route('/')
    .post(express.json(),async (req,res) => {
        const body = req.body;
        try {
            const session = await AuthController.getInstance().logIn({...body});
            return res.status(StatusCodes.CREATED).send(session);
        } catch(err) {
            if(err instanceof NotFoundException) {
                return res.status(StatusCodes.NOT_FOUND).send({error: err.toString()});
            } else if(err instanceof ExpiredException) {
                return res.status(498).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    });

authRoute.route('/:token')
    .get(async (req,res) => {
        try {
            const session = await AuthController.getInstance().getAuthByToken(req.params.token);
            return res.status(StatusCodes.CREATED).send(session);
        } catch(err) {
            if(err instanceof NotFoundException) {
                return res.status(StatusCodes.NOT_FOUND).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    });

export default authRoute;