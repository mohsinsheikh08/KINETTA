import express from 'express';
import { tokenChecker } from '../middleware/auth.middleware';
import { addProductInWishlist, clearWishlist, getWishlist, removeProductInWishlist } from '../controllers/wishlist.controller';

const router = express.Router();

router.post('/add-product', tokenChecker, addProductInWishlist);

router.get('/get-wishlist', tokenChecker, getWishlist)

router.delete('/clear-wishlist', tokenChecker, clearWishlist);

router.delete('/remove-product', tokenChecker, removeProductInWishlist)

export default router