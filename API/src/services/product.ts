import express, {Router} from 'express';
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes';
import {Product} from "../controller/product";

const productRoute = Router();
productRoute.route('/')
    .get(async (req, res) => {
        try {
            return res.status(StatusCodes.OK).json(await Product.getInstance().getProducts());
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }
    })
    .post(express.json(), async (req, res) => {
        const productBody = req.body;
        try {
            const product = await Product.getInstance().createProduct({...productBody});
            return res.status(StatusCodes.CREATED).json(product);
        } catch (err) {
            if (err === "Incorrect name" || err === "Incorrect price") {
                return res.status(StatusCodes.BAD_REQUEST).send({error: err}).end();
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }
    })

productRoute.route('/:p_id')
    .get(async (req, res) => {
        try {
            const p = await Product.getInstance().getById(req.params.p_id);
            if (p != null) {
                return res.status(StatusCodes.OK).json(p);
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: "not found"}).end();
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err}).end();
        }
    });

export default productRoute;