const mongoose = require('mongoose');
const Funcionario = mongoose.model('Funcionario');

module.exports = {
    async insert (req, res){
        const funcionarios = await Funcionario.create(req.body);
        return res.json(funcionarios);
    },
    async selectAll (req, res){
        const { page } = req.query;
        const funcionarios = await Funcionario.paginate({}, {page, limit: 5, populate: "empresa"});

        return res.json(funcionarios);
    },
    async select (req, res){
        const funcionarios = await Funcionario.findById(req.params.id);

        return res.json(funcionarios);
    },
    async update (req, res){
        const funcionarios = await Funcionario.findByIdAndUpdate(req.params.id, req.body, {new: true});
        
        return res.json(funcionarios);
    },
    async delete (req, res){
        await Funcionario.findByIdAndRemove(req.params.id);
        
        return res.send();
    },
    async funEmpresa (req, res){
        const funcionarios = await Funcionario.find({"empresa": req.params.id}).populate("empresa");
        
        return res.json(funcionarios);
    }

}