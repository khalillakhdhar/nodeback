const express = require('express');
const router = express.Router();

//MENU db
const Menu = require('../../models/Menu_day');


module.exports = router;  //acces



//-------route-------------

//GET
router.get('/',(req,res) =>{
    Menu.find()
        .then(menu_day =>res.json(menu_day))
});



//ADD
router.post('/',(req,res)=>{
    const newMenu = new Menu(
        {
            name:req.body.name,
            price:req.body.price,
            quantity:req.body.quantity
        }
    );
    newMenu.save().then(menu_day => res.json(menu_day));
});



//DELETE

router.delete('/:id', (req, res) => {
  Menu.findById(req.params.id)
  .then(menu_day => menu_day.remove().then(() => res.json({succes: true})))
  .catch(err => res.status(404).json({succes:false}));
}); 



//UPDATE
router.put('/:id', (req, res) => {
    const newMenu1={price: req.body.price,quantity: req.body.quantity};
    Menu.findById(req.params.id)
    .then(menu_day => menu_day.update({ $set: newMenu1})
    .then(()=> res.json({succes:true})))
    .catch(err => res.status(404).json({succes:false}));
    //Product.updateOne(req.body.name);
  }); 


  
