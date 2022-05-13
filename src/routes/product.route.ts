import express, { Router } from 'express';

import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';
import {RestaurantService} from "../services"
import {ProductService} from "../services/product.service";

const restaurantRoute = Router();

restaurantRoute.route('/')

    // get all restaurant
    .get(async (req,res) => {

        try {

            return res.status(StatusCodes.OK).json(await ProductService.getInstance().getPorduccts();

        } catch(err) {

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();

        }
    })

    //creat at restaurant
    .post(express.json(),async (req,res) => {

        const productBody = req.body;

        if(
            !productBody.name ||
            !productBody.price
        ) {

            return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST).end();
        }

        try {

            const product = await ProductService.getInstance().createProduct({...productBody});

            return res.status(StatusCodes.CREATED).json(product);

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
    })

    .put(express.json(), async (req, res) => {

        const productBody = req.body;

        if(!productBody._id) {

            return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST).end();

        }

        try {

            const result = await ProductService.getInstance().update({...productBody});

            return res.status(StatusCodes.OK).json(result);

        } catch(err) {

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();

        }

    });


restaurantRoute.route('/:u_id')

    // get one restaurant
    .get( async (req,res) => {
        try {
            const r = await RestaurantService.getInstance().getById(req.params.u_id);

            if (r != null) {
                return res.status(StatusCodes.OK).json(r);
            }else {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: "not found"}).end();
            }
        } catch(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }

    });

restaurantRoute.route('/:user_id/:restaurant_id_delete')

    //delete one restaurant
    .delete( async (req,res) => {

        try {

            const result = await RestaurantService.getInstance().delete(req.params.user_id, req.params.restaurant_id_delete);

            return res.status(StatusCodes.OK).json(result);

        } catch(err) {

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();

        }
    });

/*restaurantRoute.route('/command')

    //delete one restaurant
    .post( async (req,res) => {

        const command = req.body;

        try {

            const result = await RestaurantService.getInstance().delete(req.params.user_id, req.params.restaurant_id_delete);

            return res.status(StatusCodes.OK).json(result);

        } catch(err) {

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();

        }
    });*/



export default restaurantRoute;