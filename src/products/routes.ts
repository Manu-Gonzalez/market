import ProductController from './controller'
import  express  from 'express';

const router = express.Router() ; 
const controller = new ProductController ;

router.get('/', controller.getProducts) ;

router.get('/:id', controller.getProductById) ;

export default router ;