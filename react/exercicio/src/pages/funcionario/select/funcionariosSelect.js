import React, { Component } from 'react';
import api from '../../../services/services';
import { Link } from 'react-router-dom';
import './funcionariosSelect.css';
import { Table, Space, Card } from 'antd';

const { Column } = Table;

export default class FuncionariosSelect extends Component {
    state = {
        funcionarios: [],
        funcionariosinfo: {},
        page: 1
    };

    componentDidMount() {
        this.loadFuncionarios();
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

    render() {
        const { funcionarios, funcionariosinfo, page } = this.state;
        return (
            <Card title="Funcionários" extra={<a href="/funcionarios/adicionar">Adicionar</a>}>
                <div className='funcionario-tab'>
                    <Table dataSource={this.handleDataSource(funcionarios)}>
                        <Column hide title="ID" dataIndex="_id" key="id" hide />
                        <Column title="Nome" dataIndex="nome" key="nome" />
                        <Column title="Sobrenome" dataIndex="sobrenome" key="sobrenome" />
                        <Column title="CPF" dataIndex="cpf" key="cpf" />
                        <Column title="Empresa" dataIndex="empresa" key="empresa" />
                        <Column title="E-mail" dataIndex="email" key="email" />
                        <Column dataIndex="_id"
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                    <Link to={`/funcionarios/editar/${record._id}`} >Editar</Link>
                                    <Link to={`/funcionarios/excluir/${record._id}`} >Excluir</Link>
                                </Space>
                            )}
                        />
                    </Table>
                    <div className="actions">
                        <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                        <button disabled="true">{this.state.page}</button>
                        <button disabled={page === funcionariosinfo.pages} onClick={this.nextPage}>Próxima</button>
                    </div>
                </div>
            </Card>
        )
    }
    
    handleDataSource = (funcionarios) => {
        return funcionarios.map((funcionario) =>{
            const aux = funcionario.empresa.map((emp) =>{
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
}
