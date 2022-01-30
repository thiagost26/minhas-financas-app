/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";
import { createBrowserHistory } from "history";

import { Link } from "react-router-dom";
import * as messages from '../../components/toastr';
import LocalStorageService from "../../app/service/localstorageService";



class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: ''
    }


    constructor() {
        super();
        this.service = new LancamentoService()
    }


    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };
        
        const history = createBrowserHistory()

        this.service
            .salvar(lancamento)
            .then(response => {
                history.push('/consulta-lancamentos')
                setTimeout(function(){
                    window.location.reload()
                }, 3000);
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!');
            }).catch(error => {
                messages.mensagemErro(error.response.data);
        })
    }


    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        useState({ [name]: value })
    }



    
    
    render() {

        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();

        return (
            <Card title="Cadastro de Lançamentos">
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao"
                                    type="text" 
                                    name="descricao"                                   
                                    value={this.state.descricao}
                                    onChange={this.handleChange}
                                    className="form-control" />
                                    
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" 
                                    type="text"
                                    name="ano"
                                    value={this.state.ano}
                                    onChange={this.handleChange}
                                    className="form-control" />
                                    
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" 
                                        lista={meses}
                                        value={this.state.mes}
                                        onChange={this.handleChange}
                                        name="mes"
                                        className="form-control" />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor"
                                    type="text" 
                                    name="valor"
                                    value={this.state.valor}
                                    onChange={this.handleChange}
                                    className="form-control" />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo"
                                        lista={tipos}
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                                        className="form-control"/>
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <input type="text"
                                    className="form-control"
                                    name="status"
                                    value={this.state.status}
                                    disabled />
                        </FormGroup>
                    </div>
                </div>

                <br />
                <div className="row">
                    <div className="col-md-6">
                        <button onClick={this.submit} className="btn btn-success btn-sm">Salvar</button>
                        <Link to='/consulta-lancamentos'>
                            <button className="btn btn-warning btn-sm">Consultar</button>
                        </Link>
                    </div>
                </div>
            </Card>
        )
    }   
    
}


export default CadastroLancamentos;