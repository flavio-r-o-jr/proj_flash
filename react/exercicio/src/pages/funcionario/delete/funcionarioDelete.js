import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import api from '../../../services/services';
import { Modal } from 'antd';

class FuncionarioDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            funcionario: {},
            sair: false
        };
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/funcionarios/${id}`);
        this.setState({ funcionario: response.data });
    }

    render() {
        if (this.stateSair() === true) {
            return <Redirect to="/funcionarios" />;
        } else {
            return (
                <Modal show title="Mensagem" visible={!this.stateSair()} onCancel={this.handleCancel} onOk={this.modalOk} afterClose={this.hideModal} okText="OK">
                    <p>Deseja realmete excluir <strong>{this.state.funcionario.nome}</strong>?</p>
                </Modal>
            )
        }
    }

    stateSair = () => {
        const sair = this.state.sair;
        return sair;
    }

    handleCancel = () => {
        this.props.history.push('/funcionarios');
    };

    modalOk = () => {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3005/sistema/funcionarios/${id}`, {
            method: "delete"
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ sair: true });
                }
            })

        this.props.history.push('/funcionarios');
    };
}

export default FuncionarioDelete;