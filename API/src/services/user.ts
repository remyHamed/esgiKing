import express, { Router } from 'express';
import {UserController} from "../controller";
import {
    StatusCodes
} from 'http-status-codes';
import {ConflictException, IncorrectArgumentException, NotFoundException} from "../lib";

const userRoute = Router();

userRoute.route('/')
    .get(async (req,res) => {
        try {
            return res.status(StatusCodes.OK).send(await UserController.getInstance().getUsers());
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    })
    .post(express.json(),async (req,res) => {
        const body = req.body;
        try {
            const user = await UserController.getInstance().createUser({...body});
            return res.status(StatusCodes.CREATED).send(user);
        } catch(err) {
            if(err instanceof IncorrectArgumentException || err instanceof ConflictException) {
                return res.status(StatusCodes.BAD_REQUEST).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    });

userRoute.route('/:userId')
    .get(async (req,res) => {
        try{
            const user = await UserController.getInstance().getById(req.params.userId);
            return res.status(StatusCodes.OK).send(user);
        } catch(err) {
            if(err instanceof NotFoundException) {
                return res.status(StatusCodes.NOT_FOUND).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    })
    .delete(async(req,res) => {
        try{
            const user = await UserController.getInstance().delete(req.params.userId);
            return res.status(StatusCodes.NO_CONTENT).end();
        } catch(err) {
            if(err instanceof NotFoundException) {
                return res.status(StatusCodes.NOT_FOUND).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    });

userRoute.route('/track/')
    .get(async (req, res)=> {
        try {
            const location = await UserController.getLocation();
            return res.status(StatusCodes.OK).send(location);
        } catch (err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    })

export default userRoute;