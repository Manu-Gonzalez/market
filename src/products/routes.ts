import ProductsController from './controller'
import  express  from 'express';
import {bodyValidator} from '../shared/middlewares/bodyJsonMiddleware'
import {paramsValidator} from '../shared/middlewares/paramsMiddleware'
import {queryValidator} from '../shared/middlewares/queryMiddleware'
import Schema from './productSchema';



const router = express.Router() ; 
const controller = new ProductsController ;

router.get('/', controller.getAll) ;

router.get('/:id', paramsValidator(Schema.productParams), controller.getById) ;

router.post('/', paramsValidator(Schema.productBody), controller.create) ;

router.put('/:id', paramsValidator(Schema.productParams), paramsValidator(Schema.productBody), controller.update) ;

router.delete('/:id', paramsValidator(Schema.productParams), controller.remove) ;

//router.use()

export default router ;