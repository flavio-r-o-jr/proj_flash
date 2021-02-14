import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import api from '../../../services/services';
import {Modal} from 'antd';

class EmpresaDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            empresa: {},
            sair: false
        };
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/empresas/${id}`);
        this.setState({ empresa: response.data });
    }

    render() {
        if (this.stateSair() === true) {
            return <Redirect to="/empresas" />;
        } else {
            return (
                <Modal show title="Mensagem" visible={!this.stateSair()} onCancel={this.handleCancel} onOk={this.modalOk} afterClose={this.hideModal} okText="OK">
                    <p>Tem certeza que deseja excluir a empresa  <strong>{this.state.empresa.nome}</strong>?</p>
                </Modal>
            )
        }
    }

    stateSair = () => {
        const sair = this.state.sair;
        return sair;
    }

    handleCancel = () => {
        this.props.history.push('/empresas');
    };

    modalOk = () => {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3005/sistema/empresas/${id}`, {
            method: "delete"
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ sair: true });
                }
            })
        this.props.history.push('/empresas');
    };
}

export default EmpresaDelete;