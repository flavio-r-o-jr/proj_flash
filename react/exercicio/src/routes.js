import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EmpresaSelect from './pages/empresa/select/empresaSelect';
import EmpresaInsert from './pages/empresa/insert/empresaInsert';
import EmpresaEdit from './pages/empresa/edit/empresaEdit';
import EmpresaDelete from './pages/empresa/delete/empresaDelete';
import Index from './pages/index/index';

import FuncionariosSelect from './pages/funcionario/select/funcionariosSelect';
import FuncionarioInsert from './pages/funcionario/insert/funcionarioInsert';
import FuncionarioEdit from './pages/funcionario/edit/funcionarioEdit';
import FuncionarioDelete from './pages/funcionario/delete/funcionarioDelete';
import FunEmpresas from './pages/funEmpresas/funEmpresas';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/empresas" component={EmpresaSelect} />
                <Route path="/empresas/adicionar" component={EmpresaInsert} />
                <Route path="/empresas/editar/:id" component={EmpresaEdit} />
                <Route path="/empresas/excluir/:id" component={EmpresaDelete} />
                
                <Route exact path="/funcionarios" component={FuncionariosSelect} />
                <Route  path="/funcionarios/adicionar" component={FuncionarioInsert} />
                <Route  path="/funcionarios/editar/:id" component={FuncionarioEdit} />
                <Route  path="/funcionarios/excluir/:id" component={FuncionarioDelete} />
                <Route  exact path="/relatorio" component={FunEmpresas} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;