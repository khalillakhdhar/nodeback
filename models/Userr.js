const mongoos = require('mongoose');
const Schema = mongoos.Schema;

const UserrOptions = {
    discriminatorKey: 'usertype', // our discriminator key, could be anything
    collection: 'userr', // the name of our collection
  };

const userrSchema = new Schema(
{
user_type:{
  type:String,
  required:false

},
name: {
    type:String,
    required:true
      },
email:{
    type:String,
    require:true
},
password:{
    type:String,
    require:true
},
register_date:{
    type:Date,
    default:Date.now
}
},
UserrOptions,
);

module.exports = Userr = mongoos.model('userr', userrSchema,'userr');


/*
  
// Our Base schema: these properties will be shared with our "real" schemas
 const Base = mongoose.model('Base', new mongoose.Schema({
        title: { type: String, required: true },
        date_added: { type: Date, required: true },
        redo: { type: Boolean, required: false },
      }, baseOptions,
    ),
  );
  
  module.exports = mongoose.model('Base');*/