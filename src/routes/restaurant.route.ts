import express, { Router } from 'express';
import {UserService} from "../services";
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';
import {RestaurantService} from "../services/restaurant.service";

const restaurantRoute = Router();

restaurantRoute.route('/')

    .get(async (req,res) => {
        try {
            return res.status(StatusCodes.OK).json(await RestaurantService.getInstance().getRestaurants());
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

            const restaurant = await RestaurantService.getInstance().createRestaurant({...restaurantBody});

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

        const r = await RestaurantService.getInstance().getById(req.params.u_id);

        if (r != null) {
            return res.status(StatusCodes.OK).json(r);
        }else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: "not found"}).end();
        }


    });

restaurantRoute.route('/:user_id/:user_id_delete')
    .delete( async (req,res) => {
        try {
            //   return res.status(StatusCodes.OK).json(await UserService.getInstance().getUsers());
            const result = await UserService.getInstance().delete(req.params.user_id, req.params.user_id_delete);

            return res.status(StatusCodes.OK).json(result);

        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }
    });

restaurantRoute.route('/auth')
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

export default restaurantRoute;