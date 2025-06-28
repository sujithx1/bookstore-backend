"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_di_1 = require("../../di/user.di");
const Authentication_1 = require("../middleware/Authentication");
const jwt_1 = require("../../config/jwt");
const author_di_1 = require("../../di/author.di");
const router = express_1.default.Router();
router.post('/refresh/:role', (req, res) => { (0, jwt_1.generatenewAccessToken)(req, res); });
router.post('/login', (req, res, next) => {
    user_di_1.usercontroller.login(req, res, next);
});
router.post('/signup', (req, res, next) => {
    user_di_1.usercontroller.Signup(req, res, next);
});
router.post('/logout/:id', (req, res, next) => {
    user_di_1.usercontroller.logout(req, res, next);
});
router.put('/user/:id', Authentication_1.Authentication, (req, res, next) => {
    user_di_1.usercontroller.update(req, res, next);
});
router.get('/user/:id', Authentication_1.Authentication, (req, res, next) => {
    user_di_1.usercontroller.getuser(req, res, next);
});
router.get('/user/orders/:userId', Authentication_1.Authentication, (req, res, next) => {
    user_di_1.usercontroller.getordersbyuserId(req, res, next);
});
router.post('/address/:userId', Authentication_1.Authentication, (req, res, next) => {
    user_di_1.usercontroller.Addaddress(req, res, next);
});
router.get('/address/:userId/:addressId', Authentication_1.Authentication, (req, res, next) => {
    user_di_1.usercontroller.getaddressbyaddressid(req, res, next);
});
router.get('/user/address/:userId', Authentication_1.Authentication, (req, res, next) => {
    user_di_1.usercontroller.getaddressesbyuserId(req, res, next);
});
router.delete('/user/address/:userId/:addressId', Authentication_1.Authentication, (req, res, next) => {
    user_di_1.usercontroller.deleteuseraddress(req, res, next);
});
router.get('/author/summery/:authorId', Authentication_1.Authentication, (req, res, next) => {
    author_di_1.authorcontroller.getAuthStats(req, res, next);
});
router.get('/author/:authorId/recent-sales', Authentication_1.Authentication, (req, res, next) => {
    author_di_1.authorcontroller.getRecentSalesController(req, res, next);
});
router.get('/author/:authorId/sales-history', Authentication_1.Authentication, (req, res, next) => {
    author_di_1.authorcontroller.getSalesHistory(req, res, next);
});
exports.default = router;
