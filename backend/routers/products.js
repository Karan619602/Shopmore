import { Router } from 'express';
const router = Router();

import  {getproducts,getsingleproduct,updateproduct,deleteproduct}  from '../controllers/getproducts.js'


router.get('/products', getproducts)
router.get('/product/:id',getsingleproduct)



router.put('/products/:id',updateproduct)
router.delete('/products/:id',deleteproduct)




export default router;