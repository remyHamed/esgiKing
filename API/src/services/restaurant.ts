import express, { Router } from 'express';
import {StatusCodes} from 'http-status-codes';
import {RestaurantController} from "../controller"
import {
    checkSpecificAuthor,
    ConflictException,
    ExpiredException,
    IncorrectArgumentException,
    UnauthorizedException
} from "../lib";

const restaurantRoute = Router();

restaurantRoute.route('/')
    .get(async (req,res) => {
        try {
            return res.status(StatusCodes.OK).json(await RestaurantController.getInstance().getRestaurants());
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    })
    .post(express.json(),async (req,res) => {
        const body = req.body;
        try {
            await checkSpecificAuthor(req.headers['authorization'], 'bigBoss');
            const restaurant = await RestaurantController.getInstance().createRestaurant({...body});
            return res.status(StatusCodes.CREATED).send(restaurant);
        } catch(err) {
            if(err instanceof IncorrectArgumentException) {
                return res.status(StatusCodes.BAD_REQUEST).send({error: err.toString()});
            } else if(err instanceof ConflictException) {
                return res.status(StatusCodes.CONFLICT).send({error: err.toString()});
            } else if (err instanceof ExpiredException) {
                return res.status(498).send({error: err.toString()});
            } else if (err instanceof UnauthorizedException) {
                return res.status(StatusCodes.UNAUTHORIZED).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    });


restaurantRoute.route('/:u_id')
    .get( async (req,res) => {
        try {
            const restaurant = await RestaurantController.getInstance().getById(req.params.u_id);
            return res.status(StatusCodes.OK).send(restaurant);
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    })
    .delete( async (req,res) => {
        try {
            await checkSpecificAuthor(req.headers['authorization'], 'bigBoss');
            await RestaurantController.getInstance().delete(req.params.u_id);
            return res.status(StatusCodes.OK).end();
        } catch(err) {
            if (err instanceof ExpiredException) {
                return res.status(498).send({error: err.toString()});
            } else if (err instanceof UnauthorizedException) {
                return res.status(StatusCodes.UNAUTHORIZED).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    });

export default restaurantRoute;