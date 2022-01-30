import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'

import {Link} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService'
// import { mensagemErro } from '../components/toastr'
import * as messages from '../components/toastr'

class Login extends React.Component{

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super()
        this.service = new UsuarioService()
    }

    entrar = () => {
        const history = createBrowserHistory()

        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            LocalStorageService.adicionarItem('_usuario_logado', response.data)
            history.push('/home')
            setTimeout(function(){
                window.location.reload()
            }, 3000);
            messages.mensagemSucesso('Login efetuado!');
        }).catch(erro => {
            messages.mensagemErro(erro.response.data);
        })
    }


    
    render() {
        return(
            
            <div className="row">
                <div className="col-md-6" style={ {position: 'relative', left: '300px'}}>
                    <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="E-mail: *" htmlFor="exampleInputEmail1">
                                            <input type="email" 
                                                value={this.state.email}
                                                onChange={e => this.setState({email: e.target.value})}
                                                className="form-control" 
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                placeholder="Digite o Email" />
                                        </FormGroup>

                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password" 
                                                value={this.state.senha}
                                                onChange={e => this.setState({senha: e.target.value})}
                                                className="form-control" 
                                                id="exampleInputPassword1"
                                                placeholder="Password" />
                                        </FormGroup>
                                        <button onClick={this.entrar} className="btn btn-success btn-sm">Entrar</button>                                            
                                        <Link to="/cadastro-usuarios">
                                            <button className="btn btn-danger btn-sm">Cadastrar</button>
                                        </Link>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Login