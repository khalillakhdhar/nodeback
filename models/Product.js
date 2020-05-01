const mongoos = require('mongoose');
const Schema = mongoos.Schema;

const productSchema = new Schema(
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

module.exports= Product = mongoos.model('product', productSchema);