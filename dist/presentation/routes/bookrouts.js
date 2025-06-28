"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authentication_1 = require("../middleware/Authentication");
const book_di_1 = require("../../di/book.di");
const router = express_1.default.Router();
router.post('/', Authentication_1.Authentication, (req, res, next) => {
    book_di_1.bookcontroller.create(req, res, next);
});
router.put('/:id', Authentication_1.Authentication, (req, res, next) => {
    book_di_1.bookcontroller.update(req, res, next);
});
router.delete('/:id/:isActive', Authentication_1.Authentication, (req, res, next) => {
    book_di_1.bookcontroller.delete(req, res, next);
});
router.get('/authorId/:authorId', Authentication_1.Authentication, (req, res, next) => {
    book_di_1.bookcontroller.getbooksbyAuthorId(req, res, next);
});
router.get('/all', Authentication_1.Authentication, (req, res, next) => {
    book_di_1.bookcontroller.getallBooks(req, res, next);
});
router.get('/:id', Authentication_1.Authentication, (req, res, next) => {
    book_di_1.bookcontroller.getbookbyid(req, res, next);
});
exports.default = router;
