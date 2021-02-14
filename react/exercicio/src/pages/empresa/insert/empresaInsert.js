import React, { Component } from "react";
import './empresaInsert.css';
import { Redirect } from "react-router-dom";
import { Card, Modal } from 'antd';
import InputMask from "react-input-mask";

class CriarEmpresa extends Component {
    constructor() {
        super();

        this.state = {
            empresa: {
                nome: "",
                nomefantasia: "",
                cnpj: "",
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

    render() {
        if (this.stateSair() === true) {
            return (
                <Modal show title="Mensagem" visible={this.stateSair} onOk={this.modalOk} afterClose={this.modalOk} okText="OK">
                    <p>Empresa editada com sucesso!!!</p>
                </Modal>
            );
        } else {
            return (
                <div >
                    <Card className="formulario" title="Adicionar Empresa" >
                        <form onSubmit={this.handleSubmit}>
                            <div className="empresa-insert">
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
                            <div className="empresa-insert">
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
                            <div className="empresa-insert">
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
                            <div className="empresa-insert">
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
                            <div className="empresa-insert">
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
                            <div className="empresa-insert">
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
                            <div className="empresa-insert">
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
                            <button type="submit" className="btn btn-primary">
                                Cadastrar
                            </button>
                        </form>
                    </Card>
                </div>
            );
        }
    }

    stateSair = () => {
        const sair = this.state.sair;
        return sair;
    }

    modalOk = () => {
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
        fetch("http://localhost:3005/sistema/empresas", {
            method: "post",
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

export default CriarEmpresa;