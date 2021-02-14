const mongoose = require('mongoose');
const Empresa = mongoose.model('Empresa');

module.exports = {
    async insert (req, res){
        const empresas = await Empresa.create(req.body);
        return res.json(empresas);
    },
    async selectAll (req, res){
        const { page } = req.query;
        const empresas = await Empresa.paginate({}, {page, limit: 5});

        return res.json(empresas);
    },
    async select (req, res){
        const empresas = await Empresa.findById(req.params.id);

        return res.json(empresas);
    },
    async update (req, res){
        const empresas = await Empresa.findByIdAndUpdate(req.params.id, req.body, {new: true});
        
        return res.json(empresas);
    },
    async delete (req, res){
        await Empresa.findByIdAndRemove(req.params.id);
        
        return res.send();
    }

}