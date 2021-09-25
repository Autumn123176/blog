const mongoose = require('mongoose')


const schema = new mongoose.Schema({

  aids:[
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Article',
    }
  ],
  name:{
    type:String,
    required:true
  }
})
schema.set('toJSON', { getters: true })
module.exports = mongoose.model('Column',schema)