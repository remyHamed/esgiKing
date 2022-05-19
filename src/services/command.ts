import express, {Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {Command} from "../controller";

const commandRoute = Router();
commandRoute.route('/')
    .get(async (req, res) => {
        try {
            return res.status(StatusCodes.OK).json(await Command.getInstance().getCommands());
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }
    })
    .post(express.json(), async (req, res) => {
        const commandBody = req.body;
        try {
            const command = await Command.getInstance().createCommand({...commandBody});
            return res.status(StatusCodes.CREATED).json(command);
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }
    });

commandRoute.route('/:c_id')
    .get(async (req,res) => {
        try {
            const c = await Command.getInstance().getById(req.params.c_id);
            if (c != null) {
                return res.status(StatusCodes.OK).json(c);
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: "not found"}).end();
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }
    })

export default commandRoute;