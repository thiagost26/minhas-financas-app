import React from 'react'
import {Link} from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService'

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor() {
        super()
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        this.usuarioService
            .obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({saldo: response.data})
            }).catch(error => {
                console.log(error.response)
            });
    }
    
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de finanças.</p>
                    <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                    <hr className="my-4" />
                    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <Link to="/cadastro-usuarios">
                            <a className="btn btn-primary btn-lg" 
                            href="https://bootswatch.com/flatly/#" 
                            role="button"><i className="fa fa-users"></i>
                            Cadastrar Usuário
                            </a>
                        </Link>
                        <Link id="RouterNavLink" to="/cadastro-lancamentos">
                            <a className="btn btn-danger btn-lg" 
                            href="https://bootswatch.com/flatly/#" 
                            role="button"><i className="fa fa-users"></i>
                            Cadastrar Lançamento
                            </a>
                        </Link>

                        <Link id="RouterNavLink" to="/formulario">
                            <a className="btn btn-success btn-sm" 
                            href="https://bootswatch.com/flatly/#" 
                            role="button"><i className="fa fa-users"></i>
                            Formulario
                            </a>
                        </Link>
                    </p>
            </div>
        )
    }
}

export default Home