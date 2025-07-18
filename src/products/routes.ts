import ProductController from './controller'
import  express  from 'express';
import {bodyValidator} from '../shared/middlewares/bodyJsonMiddleware'
import {paramsValidator} from '../shared/middlewares/paramsMiddleware'
import {queryValidator} from '../shared/middlewares/queryMiddleware'
import Schema from './productSchema';



const router = express.Router() ; 
const controller = new ProductController ;

router.get('/', controller.getProducts) ;

router.get('/:id', paramsValidator(Schema.productParams), controller.getProductById) ;

router.post('/', paramsValidator(Schema.productBody), controller.createProduct) ;

router.put('/:id', paramsValidator(Schema.productParams), paramsValidator(Schema.productBody), controller.putProduct) ;

router.delete('/:id', paramsValidator(Schema.productParams), controller.deleteProduct) ;

// router.use()

export default router ;