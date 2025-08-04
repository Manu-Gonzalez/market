"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const express_1 = __importDefault(require("express"));
const paramsMiddleware_1 = require("../shared/middlewares/paramsMiddleware");
const productSchema_1 = __importDefault(require("./productSchema"));
const router = express_1.default.Router();
const controller = new controller_1.default;
router.get('/', controller.getProducts);
router.get('/:id', (0, paramsMiddleware_1.paramsValidator)(productSchema_1.default.productParams), controller.getProductById);
router.post('/', (0, paramsMiddleware_1.paramsValidator)(productSchema_1.default.productBody), controller.createProduct);
router.put('/:id', (0, paramsMiddleware_1.paramsValidator)(productSchema_1.default.productParams), (0, paramsMiddleware_1.paramsValidator)(productSchema_1.default.productBody), controller.putProduct);
router.delete('/:id', (0, paramsMiddleware_1.paramsValidator)(productSchema_1.default.productParams), controller.deleteProduct);
// router.use()
exports.default = router;
