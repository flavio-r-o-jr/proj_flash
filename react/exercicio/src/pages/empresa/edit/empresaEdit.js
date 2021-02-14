import React, { Component } from "react";
import './empresaEdit.css';
import { Redirect } from "react-router-dom";
import { Modal, Card } from 'antd';
import api from '../../../services/services';
import InputMask from "react-input-mask";

class EditEmpresa extends Component {
    constructor() {
        super();

        this.state = {
            empresa: {
                nomefantasia: "",
                cnpj: 0,
                endereco: {
                    logradouro: "",
                    cidade: "",
                    estado: ""
                },
                beneficio: ""
            },
            sair: false,
        };
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/empresas/${id}`);
        this.setState({ empresa: response.data });
    }

    render() {
        if (this.stateSair() === true) {
            return (
                <Modal show title="Mensagem" visible={this.stateSair} onOk={this.modalOK} afterClose={this.modalOK} okText="OK">
                    <p>Empresa alterada com sucesso!!!</p>
                </Modal>
            );
        } else {
            return (
                <Card title="Editar Empresa">
                    <form onSubmit={this.handleSubmit}>
                        <div className="empresa-edit">
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
                                value={this.state.empresa.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="empresa-edit">
                            <label htmlFor="nomefantasia">Nome Fantasia </label>
                            <br />
                            <input
                                type="text"
                                id="nomefantasia"
                                name="nomefantasia"
                                placeholder="Nome Fantasia"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.empresa.nomefantasia}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="empresa-edit">
                            <label htmlFor="cnpj">CNPJ </label>
                            <br />
                            <InputMask
                                mask="99.999.999/9999-99"
                                type="text"
                                id="cnpj"
                                name="cnpj"
                                placeholder="cnpj"
                                required
                                value={this.state.empresa.cnpj}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="empresa-edit">
                            <label htmlFor="logradouro">Logradouro </label>
                            <br />
                            <input
                                type="text"
                                id="logradouro"
                                name="logradouro"
                                placeholder="Logradouro"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.empresa.endereco.logradouro}
                                onChange={this.handleInputChangeEndereco}
                            />
                        </div>
                        <div className="empresa-edit">
                            <label htmlFor="cidade">Cidade </label>
                            <br />
                            <input
                                type="text"
                                id="cidade"
                                name="cidade"
                                placeholder="Cidade"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.empresa.endereco.cidade}
                                onChange={this.handleInputChangeEndereco}
                            />
                        </div>
                        <div className="empresa-edit">
                            <label htmlFor="estado">Estado </label>
                            <br />
                            <input
                                type="text"
                                id="estado"
                                name="estado"
                                placeholder="Estado"
                                minLength="2"
                                maxLength="2"
                                required
                                value={this.state.empresa.endereco.estado}
                                onChange={this.handleInputChangeEndereco}
                            />
                        </div>
                        <div className="empresa-edit">
                            <label htmlFor="beneficio">Benefício </label>
                            <br />
                            <input
                                type="text"
                                id="beneficio"
                                name="beneficio"
                                placeholder="Benefício"
                                minLength="3"
                                required
                                value={this.state.empresa.beneficio}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Editar</button>
                    </form>
                </Card>
            );
        }
    }

    stateSair = () => {
        const sair = this.state.sair;
        return sair;
    }

    modalOK = () => {
        this.props.history.push('/empresas');
    };

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            empresa: { ...prevState.empresa, [name]: value }
        }));
    };

    handleInputChangeEndereco = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => {
            const empresa = { ...prevState.empresa };
            empresa.endereco[name] = value;
            return { empresa }
        })
    };


    handleSubmit = event => {
        const id = this.props.match.params.id;
        fetch("http://localhost:3005/sistema/empresas/" + id, {
            method: "put",
            body: JSON.stringify(this.state.empresa),
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

export default EditEmpresa;