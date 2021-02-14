import React, { Component } from 'react';
import api from '../../../services/services';
import { Link } from 'react-router-dom';
import './empresaSelect.css';
import { Table, Tag, Space, Card } from 'antd';

const { Column } = Table;

export default class EmpresaSelect extends Component {
    state = {
        empresas: [],
        empresasinfo: {},
        page: 1
    };

    componentDidMount() {
        this.loadEmpresas();
    }

    prevPage = () => {
        const { page } = this.state;
        if (page === 1) {
            return;
        }

        const numberPage = page - 1;
        this.loadEmpresas(numberPage);
    }

    nextPage = () => {
        const { page, empresasinfo } = this.state;
        if (page === empresasinfo.pages) {
            return;
        }

        const numberPage = page + 1;
        this.loadEmpresas(numberPage);
    }

    loadEmpresas = async (page = 1) => {
        const response = await api.get(`/empresas?page=${page}`);
        const { docs, ...empresasinfo } = response.data;
        this.setState({ empresas: docs, empresasinfo: empresasinfo, page });
    }

    render() {
        const { empresas, empresasinfo, page } = this.state;
        return (
            <Card title="Empresas" extra={<a href="/empresas/adicionar">Adicionar</a>}>
                <div className='empresa-tab'>
                    <Table dataSource={empresas}>
                        <Column hide title="ID" dataIndex="_id" key="id" hide />
                        <Column title="Nome" dataIndex="nome" key="nome" />
                        <Column title="Nome Fantasia" dataIndex="nomefantasia" key="nomefantasia" />
                        <Column title="CNPJ" dataIndex="cnpj" key="cnpj" />
                        <Column title="Benefício" dataIndex="beneficio" key="beneficio" />
                        <Column dataIndex="_id"
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                    <Link to={`/empresas/editar/${record._id}`} >Editar</Link>
                                    <Link to={`/empresas/excluir/${record._id}`} >Excluir</Link>
                                </Space>
                            )}
                        />
                    </Table>
                    <div className="actions">
                        <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                        <button disabled="true">{this.state.page}</button>
                        <button disabled={page === empresasinfo.pages} onClick={this.nextPage}>Próxima</button>
                    </div>
                </div>
            </Card>
        )
    }
}