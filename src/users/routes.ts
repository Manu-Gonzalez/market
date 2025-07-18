import UserController from './controller'
import  express  from 'express';
import {bodyValidator} from '../shared/middlewares/bodyJsonMiddleware'
import {paramsValidator} from '../shared/middlewares/paramsMiddleware'
import {queryValidator} from '../shared/middlewares/queryMiddleware'
import Schema from './userSchemas';



const userRoutes = express.Router() ; 
const controller = new UserController ;

userRoutes.post('/register', controller.register) ;

userRoutes.post('/login', controller.login) ;

export default userRoutes ;