import React, { Component } from 'react';
import api from '../../services/services';
import { Table, Tag, Space, Card, Select } from 'antd';

const { Column } = Table;

export default class FunEmpresas extends Component {
    state = {
        funcionariosinfo: {},
        page: 1,
        empresa: [],
        empresaSelecionada: "",
        funcionarios: []
    };

    componentDidMount() {
        //this.loadFuncionarios();
        this.caregarEmpresa();
    }

    prevPage = () => {
        const { page } = this.state;
        if (page === 1) {
            return;
        }

        const numberPage = page - 1;
        this.loadFuncionarios(numberPage);
    }

    nextPage = () => {
        const { page, funcionariosinfo } = this.state;
        if (page === funcionariosinfo.pages) {
            return;
        }

        const numberPage = page + 1;
        this.loadFuncionarios(numberPage);
    }

    loadFuncionarios = async (page = 1) => {
        const response = await api.get(`/funcionarios?page=${page}`);
        const { docs, ...funcionariosinfo } = response.data;
        this.setState({ funcionarios: docs, funcionariosinfo: funcionariosinfo, page });
    }

    caregarEmpresa = async () => {
        const response = await api.get(`/empresas`);
        const { docs, ...funcionariosinfo } = response.data;
        this.setState({ empresa: docs });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const id = this.state.empresaSelecionada;
        const response = await api.get(`/relatorio/${id}`);
        this.setState({ funcionarios: response.data });
    };

    handleDataSource = (funcionarios) => {
        return funcionarios.map((funcionario) => {
            const aux = funcionario.empresa.map((emp) => {
                return emp.nome;
            });
            return {
                _id: funcionario._id,
                nome: funcionario.nome,
                sobrenome: funcionario.sobrenome,
                cpf: funcionario.cpf,
                empresa: aux,
                email: funcionario.email
            }
        })
    };

    handleInputChangeEmpresa = event => {
        this.setState({ empresaSelecionada: event });
    };

    render() {
        const { funcionarios, funcionariosinfo, page } = this.state;
        return (
            <div>
                <Card className="formulario" title="Relatório de funcionários por empresa" >
                    <form onSubmit={this.loadFuncionarios}>
                        <div className="funcionario-edit">
                            <label >Empresa </label>
                            <br />
                            <Select
                                name="empresa"
                                onChange={this.handleInputChangeEmpresa}
                                value={this.state.empresaSelecionada}>
                                {this.state.empresa.map(empr => (
                                    <Select.Option name="empresa" value={empr._id}>
                                        {empr.nome}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Buscar</button>
                    </form>
                </Card>
                <Card title="Funcionários" extra={<a href="/funcionarios/adicionar">Adicionar</a>}>
                    <div className='funcionario-tab'>
                        <Table dataSource={this.handleDataSource(funcionarios)}>
                            <Column hide title="ID" dataIndex="_id" key="id" hide />
                            <Column title="Nome" dataIndex="nome" key="nome" />
                            <Column title="Sobrenome" dataIndex="sobrenome" key="sobrenome" />
                            <Column title="CPF" dataIndex="cpf" key="cpf" />
                            <Column title="Empresa" dataIndex="empresa" key="empresa" />
                            <Column title="E-mail" dataIndex="email" key="email" />
                        </Table>
                        <div className="actions">
                            <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                            <button disabled="true">{this.state.page}</button>
                            <button disabled={page === funcionariosinfo.pages} onClick={this.nextPage}>Próxima</button>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}