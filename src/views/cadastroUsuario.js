import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

import {Link} from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import { createBrowserHistory } from 'history'

import { mensagemSucesso, mensagemErro } from '../components/toastr'


class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    validar() {
        const msgs = []

        if(!this.state.nome) {
            msgs.push('O campo Nome é obrigatório.')
        }

        if(!this.state.email) {
            msgs.push('O campo E-mail é obrigatório.')
        }else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ) {
            msgs.push('Informe um E-mail válido.')
        }

        if(!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push('Digite a senha duas vezes.')
        }else if(this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('As senhas não conferem.')
        }

        return msgs;
    }

    salvar = () => {
        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }


        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }
        
        const history = createBrowserHistory()
        
        
        this.service.salvar(usuario)
            .then( response => {
                mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
                history.push('/login')
                setTimeout(function(){
                    window.location.reload()
                }, 3000);
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }


    render() {
        return(
            
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text"
                                        className="form-control"
                                        id="inputNome"
                                        name="nome"
                                        onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>
                            
                            <FormGroup label="E-mail: *" htmlFor="inputEmail">
                                <input type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        name="email"
                                        onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup>
                            
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                        className="form-control"
                                        id="inputSenha"
                                        name="senha"
                                        onChange={e => this.setState({senha: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"
                                        className="form-control"
                                        id="inputRepitaSenha"
                                        name="senhaRepeticao"
                                        onChange={e => this.setState({senhaRepeticao: e.target.value})} />
                            </FormGroup>
                            <button onClick={this.salvar} type="button" className="btn btn-success btn-sm">Salvar</button>
                            <Link to="/home">
                                <button type="button" className="btn btn-warning btn-sm">Cancelar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default CadastroUsuario