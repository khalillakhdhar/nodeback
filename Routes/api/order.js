const express = require('express');
const router = express.Router();

//product db
const Order = require('../../models/Order');

module.exports = router;//acces

//-------route-------------

//GET
router.get('/',(req,res) =>{
    Order.find()
        .then(Order =>res.json(Order))
});



//ADD
router.post('/',(req,res)=>{
    const newOrder = new Order(
        {   user_id:req.body.user_id,
            name:req.body.name,
            productName:req.body.product,
            quantity:req.body.quantity,
            price:req.body.price
            
            
        }
    );
    newOrder.save().then(order => res.json(order));
});



//DELETE

router.delete('/:id', (req, res) => {
    Order.findById(req.params.id)
  .then(order => order.remove().then(() => res.json({succes: true})))
  .catch(err => res.status(404).json({succes:false}));
}); 



//UPDATE
router.put('/:id', (req, res) => {
    const newOrder1={productName:req.body.product, 
                       price: req.body.price,
                         quantity: req.body.quantity};
    Order.findById(req.params.id)
    .then(order => order.update({ $set: newOrder1})
    .then(()=> res.json({succes:true})))
    .catch(err => res.status(404).json({succes:false}));
    //Product.updateOne(req.body.name);
  }); 


