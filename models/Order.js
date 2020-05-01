const mongoos = require('mongoose');
const Schema = mongoos.Schema;

const orederSchema = new Schema(
{
user_id: {
        type:String,
        required:true
            },
name: {
    type:String,
    required:true
      },
productName: {
        type:String,
        required:true
          },
quantity: {
        type:Number,
        required:true
            },
price: {
        type:Number,
        required:true
                    },
date:{
    type: Date,
    default: Date.now
     }
}
);

module.exports= Order = mongoos.model('order', orederSchema);