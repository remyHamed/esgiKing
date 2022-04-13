import express, { Router } from 'express';
import {UserService} from "../services";

const userRoute = Router();

userRoute.route('/')
    .get(async (req,res) => {
        try {
            return res.json(await UserService.getInstance().getUsers());
        } catch(err) {
            return res.status(400).send(err).end();
        }
    })
    .post(express.json(),async (req,res) => {
        const userBody = req.body;
        if(!userBody.firstName || !userBody.lastName || !userBody.mail || !userBody.password) {
            return res.status(400).send('Missing data').end();
        }
        try {
            const user = await UserService.getInstance().createUser({...userBody});
            return res.json(user);
        } catch(err) {
            return res.status(400).send(err).end();
        }
    });

userRoute.route('/auth')
    .post(express.json(),async (req,res) => {
        const userBody = req.body;

        if(!userBody.mail || !userBody.password) {
            return res.status(400).send('Missing data').end();
        }
        try {
            const user = await UserService.getInstance().logIn({...userBody});
            return res.json(user);
        } catch(err) {
            return res.status(400).send(err).end();
        }
    });

export default userRoute;