import React, { Component } from "react";
import './funcionarioEdit.css';
import { Redirect } from "react-router-dom";
import { Card, Modal, Select } from 'antd';
import api from '../../../services/services';
import InputMask from "react-input-mask";

class FuncionarioEdit extends Component {
    constructor() {
        super();

        this.state = {
            funcionario: {
            },
            sair: false,
            empresa: []
        };
    }

    async componentDidMount() {
        this.caregarFuncionarios();
        this.caregarEmpresa();
    }

    render() {
        if (this.stateSair() === true) {
            return (
                <Modal show title="Mensagem" visible={this.stateSair} onOk={this.modalOk} okText="OK">
                    <p>Funcionário criado com sucesso!!!</p>
                </Modal>
            );
        } else {
            return (
                <div >
                    <Card className="formulario" title="Editar Funcionário" >
                        <form onSubmit={this.handleSubmit}>
                            <div className="funcionario-edit">
                                <label htmlFor="nome">Nome </label>
                                <br />
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    placeholder="Nome"
                                    minLength="3"
                                    maxLength="100"
                                    required
                                    value={this.state.funcionario.nome}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="funcionario-edit">
                                <label htmlFor="sobrenome">Sobrenome </label>
                                <br />
                                <input
                                    type="text"
                                    id="sobrenome"
                                    name="sobrenome"
                                    placeholder="Sobrenome"
                                    minLength="3"
                                    maxLength="100"
                                    required
                                    value={this.state.funcionario.sobrenome}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="funcionario-edit">
                                <label htmlFor="cpf">CPF </label>
                                <br />
                                <InputMask
                                    mask="999.999.999-99"
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    placeholder="cpf"
                                    required
                                    value={this.state.funcionario.cpf}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="funcionario-edit">
                                <label htmlFor="email">E-mail </label>
                                <br />
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="email"
                                    minLength="3"
                                    required
                                    value={this.state.funcionario.email}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="funcionario-edit">
                                <label >Empresa </label>
                                <br />
                                <Select
                                    name="empresa"
                                    onChange={this.handleInputChangeEmpresa}
                                    value={this.state.funcionario.empresa}>
                                    {this.state.empresa.map(empr => (
                                        <Select.Option
                                            name="empresa" value={empr._id}>
                                            {empr.nome}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Salvar
                                </button>
                        </form>
                    </Card>
                </div>
            );
        }
    }

    caregarEmpresa = async () => {
        const response = await api.get(`/empresas`);
        const { docs, ...funcionariosinfo } = response.data;
        this.setState({ empresa: docs });
    };

    caregarFuncionarios = async () => {
        const { id } = this.props.match.params;
        const response2 = await api.get(`/funcionarios/${id}`);
        const { docs, ...funcionariosinfo } = response2.data;
        this.setState({ funcionario: response2.data });
    };

    stateSair = () => {
        const sair = this.state.sair;
        return sair;
    }

    modalOk = () => {
        this.props.history.push('/funcionarios');
    };

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            funcionario: { ...prevState.funcionario, [name]: value }
        }));
    };

    handleInputChangeEmpresa = event => {
        this.setState(prevState => ({
            funcionario: { ...prevState.funcionario, "empresa": event }
        }));
    };

    handleInputChangeEndereco = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => {
            const funcionario = { ...prevState.funcionario };
            funcionario.endereco[name] = value;
            return { funcionario }
        })
    };

    handleSubmit = event => {
        const id = this.props.match.params.id;
        fetch("http://localhost:3005/sistema/funcionarios/" + id, {
            method: "put",
            body: JSON.stringify(this.state.funcionario),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ sair: true });
                }
            })

        event.preventDefault();
    };
}

export default FuncionarioEdit;

