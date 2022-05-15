import express, { Router } from 'express';

import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';
import {RestaurantController} from "../controller"

const restaurantRoute = Router();

restaurantRoute.route('/')
    .get(async (req,res) => {
        try {
            return res.status(StatusCodes.OK).json(await RestaurantController.getInstance().getRestaurants());
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }
    })
    .post(express.json(),async (req,res) => {
        const restaurantBody = req.body;
        if(
            !restaurantBody.zipCode ||
            !restaurantBody.num ||
            !restaurantBody.address ||
            !restaurantBody.longitude ||
            !restaurantBody.latitude ||
            !restaurantBody.name ||
            !restaurantBody.commandList ||
            !restaurantBody.menuList
        ) {

            return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST).end();
        }
        try {
            const restaurant = await RestaurantController.getInstance().createRestaurant({...restaurantBody});
            return res.status(StatusCodes.CREATED).json(restaurant);
        } catch(err) {
            if(
                err === "Incorrect longitude" ||
                err === "Incorrect latitude" ||
                err === "Incorrect address too long" ||
                err === "Incorrect name too long" ||
                err === "Incorrect name too long"
            ) {

                return res.status(StatusCodes.BAD_REQUEST).send({error: err}).end();

            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }
    });


restaurantRoute.route('/:u_id')
    .get( async (req,res) => {
        try {
            const r = await RestaurantController.getInstance().getById(req.params.u_id);
            if (r != null) {
                return res.status(StatusCodes.OK).json(r);
            }else {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: "not found"}).end();
            }
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }
    });

export default restaurantRoute;