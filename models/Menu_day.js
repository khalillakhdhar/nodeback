const mongoos = require('mongoose');
const Schema = mongoos.Schema;

const menuSchema = new Schema(
{
name: {
    type:String,
    required:true
      },
price: {
        type:Number,
        required:true
          },
quantity: {
        type:Number,
        required:true
            },
date:{
    type: Date,
    default: Date.now
     }
}
);

module.exports= Menu = mongoos.model('menu', menuSchema);