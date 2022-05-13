import express, { Router } from 'express';

import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';
import {RestaurantService, UserService} from "../services"
import {ProductService} from "../services/product.service";

const productRoute = Router();

productRoute.route('/')

    // get all restaurant
    .get(async (req,res) => {

        try {

            return res.status(StatusCodes.OK).json(await ProductService.getInstance().getPorduccts());

        } catch(err) {

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();

        }
    })

    //creat at product
    .post(express.json(),async (req,res) => {

        const productBody = req.body.product;

        const userBody = req.body.user;

        const u = await UserService.getInstance().getById(userBody.u_id);

        if (u != null) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: "not found"}).end();
        }

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
                err === "Incorrect name" ||
                err === "Incorrect price"
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


productRoute.route('/:p_id')

    // get one product
    .get( async (req,res) => {
        try {
            const p = await ProductService.getInstance().getById(req.params.p_id);

            if (p != null) {

                return res.status(StatusCodes.OK).json(p);

            }else {

                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: "not found"}).end();

            }
        } catch(err) {

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();

        }

    });

productRoute.route('/:user_id/:product_id_delete')

    //delete one restaurant
    .delete( async (req,res) => {

        try {

            const result = await ProductService.getInstance().delete(req.params.user_id, req.params.product_id_delete);

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



export default productRoute;