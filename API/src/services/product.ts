import express, {Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {Product} from "../controller/product";
import {
    checkSpecificAuthor,
    ExpiredException,
    IncorrectArgumentException,
    NotFoundException,
    UnauthorizedException
} from "../lib";

const productRoute = Router();
productRoute.route('/')
    .get(async (req, res) => {
        try {
            return res.status(StatusCodes.OK).send(await Product.getInstance().getProducts());
        } catch (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    })
    .post(express.json(), async (req, res) => {
        const productBody = req.body;
        try {
            await checkSpecificAuthor(req.headers['authorization'], 'admin');
            const product = await Product.getInstance().createProduct({...productBody});
            return res.status(StatusCodes.CREATED).send(product);
        } catch (err) {
            if (err instanceof IncorrectArgumentException) {
                return res.status(StatusCodes.BAD_REQUEST).send({error: err.toString()});
            }else if (err instanceof ExpiredException) {
                return res.status(498).send({error: err.toString()});
            } else if (err instanceof UnauthorizedException) {
                return res.status(StatusCodes.UNAUTHORIZED).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    })

productRoute.route('/:p_id')
    .delete(async (req, res) => {
        try {
            await checkSpecificAuthor(req.headers['authorization'], 'admin');
            await Product.getInstance().delete(req.params.p_id);
            return res.status(StatusCodes.OK).end();
        } catch (err) {
            if (err instanceof NotFoundException) {
                return res.status(StatusCodes.NOT_FOUND).send({error: err.toString()});
            }else if (err instanceof ExpiredException) {
                return res.status(498).send({error: err.toString()});
            } else if (err instanceof UnauthorizedException) {
                return res.status(StatusCodes.UNAUTHORIZED).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    })
    .get(async (req, res) => {
        try {
            const product = await Product.getInstance().getById(req.params.p_id);
            return res.status(StatusCodes.OK).send(product);
        } catch (err) {
            if (err instanceof NotFoundException) {
                return res.status(StatusCodes.NOT_FOUND).send({error: err.toString()});
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err});
        }
    });

export default productRoute;