"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookEntity = void 0;
class BookEntity {
    constructor(id, bookId, title, description, author, authorname, isActive, price, picture, sellCount, createdAt, updatedAt) {
        this.id = id;
        this.bookId = bookId;
        this.title = title;
        this.description = description;
        this.author = author;
        this.authorname = authorname;
        this.isActive = isActive;
        this.price = price;
        this.picture = picture;
        this.sellCount = sellCount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.BookEntity = BookEntity;
