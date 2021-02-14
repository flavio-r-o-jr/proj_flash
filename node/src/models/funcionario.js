const mongoose = require('mongoose');
const mongoosePaginete = require('mongoose-paginate');
const Schema = mongoose.Schema;

const funcionarioSchema = new mongoose.Schema({
    empresa:[
        {type: Schema.Types.ObjectId, ref: 'Empresa'}
      ],
    nome: {
        type: String, 
        required: true, 
        uppercase: true,  
        minlength: 3,  
        maxlength: 100 
    },
    sobrenome: {
        type: String, 
        required: true, 
        uppercase: true,  
        minlength: 3,  
        maxlength: 100 
    },
    cpf: {
        type: String, 
        required: true, 
        uppercase: true, 
        unique: true 
    },
    email: {
        type: String, 
        required: true, 
        minlength: 3,  
        maxlength: 100 
    },    
    registro: {
        type: Date,
        default: Date.now
    }    
});

funcionarioSchema.plugin(mongoosePaginete);

mongoose.model('Funcionario', funcionarioSchema);
