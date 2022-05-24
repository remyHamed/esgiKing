import express, {Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {Command} from "../controller";
import * as path from "path";
import {checkSpecificAuthor, ExpiredException, UnauthorizedException} from "../lib";

const commandRoute = Router();
commandRoute.route('/')
    .get(async (req, res) => {
        try {
            await checkSpecificAuthor(req.headers['authorization'], 'admin')
            return res.status(StatusCodes.OK).send(await Command.getInstance().getCommands());
        } catch (err) {
            if (err instanceof ExpiredException) {
                return res.status(498).send({error: err.toString()});
            } else if (err instanceof UnauthorizedException) {
                return res.status(StatusCodes.UNAUTHORIZED).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    })
    .post(express.json(), async (req, res) => {
        const body = req.body;
        try {
            await checkSpecificAuthor(req.headers['authorization'], 'client');
            const command = await Command.getInstance().createCommand({...body});
            return res.status(StatusCodes.CREATED).send(command);
        } catch (err) {
            if (err instanceof ExpiredException) {
                return res.status(498).send({error: err.toString()});
            } else if (err instanceof UnauthorizedException) {
                return res.status(StatusCodes.UNAUTHORIZED).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }
    });

commandRoute.route('/:c_id')
    .get(async (req,res) => {
        try {
            await checkSpecificAuthor(req.headers['authorization'], 'delivery');
            const command = await Command.getInstance().getById(req.params.c_id);
            return res.status(StatusCodes.OK).send(command);
        } catch (err) {
            if (err instanceof ExpiredException) {
                return res.status(498).send({error: err.toString()});
            } else if (err instanceof UnauthorizedException) {
                return res.status(StatusCodes.UNAUTHORIZED).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    });

commandRoute.route('/acceptDelivery/:c_id')
    .get(async (req, res) => {
       try{
           await checkSpecificAuthor(req.headers['authorization'], 'admin');
           const command = await Command.getInstance().acceptDelivery(req.params.c_id);
           return res.status(StatusCodes.OK).send(command);
       } catch (err){
           if (err instanceof ExpiredException) {
               return res.status(498).send({error: err.toString()});
           } else if (err instanceof UnauthorizedException) {
               return res.status(StatusCodes.UNAUTHORIZED).send({error: err.toString()});
           }
           return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});

       }
    });

export default commandRoute;