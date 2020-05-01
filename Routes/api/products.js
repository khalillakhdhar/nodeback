const express = require('express');
const router = express.Router();

//product db
const Product = require('../../models/Product');

module.exports = router;//acces

//-------route-------------

//GET
router.get('/',(req,res) =>{
    Product.find()
        .then(product =>res.json(product))
});



//ADD
router.post('/',(req,res)=>{
    const newProduct = new Product(
        {
            name:req.body.name,
            price:req.body.price,
            quantity:req.body.quantity
        }
    );
    newProduct.save().then(product => res.json(product));
});



//DELETE

router.delete('/:id', (req, res) => {
  Product.findById(req.params.id)
  .then(product => product.remove().then(() => res.json({succes: true})))
  .catch(err => res.status(404).json({succes:false}));
}); 



//UPDATE
router.put('/:id', (req, res) => {
    const newProduct1={price: req.body.price,quantity: req.body.quantity};
    Product.findById(req.params.id)
    .then(product => product.update({ $set: newProduct1})
    .then(()=> res.json({succes:true})))
    .catch(err => res.status(404).json({succes:false}));
    //Product.updateOne(req.body.name);
  }); 


  
/*
app.post('/book/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    // Remove item from the books array
    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    res.send('Book is edited');
});*/