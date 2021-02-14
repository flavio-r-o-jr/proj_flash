const mongoose = require('mongoose');
const mongoosePaginete = require('mongoose-paginate');

const empresaSchema = new mongoose.Schema({
    nome: {
        type: String, 
        required: true, 
        uppercase: true,  
        minlength: 3,  
        maxlength: 100 
    },
    nomefantasia: {
        type: String, 
        required: true, 
        uppercase: true,  
        minlength: 3,  
        maxlength: 100 
    },
    cnpj: {
        type: String, 
        required: true, 
        uppercase: true,  
        unique: true 
    },
    endereco: {
        logradouro: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100
        },
        cidade: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100
        },
        estado: {
            type: String,
            required: true,
            minlength: 2,
            maxlength:2
        }
    },
    beneficio: {
        type: String, 
        required: true, 
        uppercase: true,  
        minlength: 3,  
        maxlength: 100 
    },
    registro: {
        type: Date,
        default: Date.now
    }    
});

empresaSchema.plugin(mongoosePaginete);

mongoose.model('Empresa', empresaSchema);
