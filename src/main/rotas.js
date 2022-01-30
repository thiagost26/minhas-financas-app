import React from 'react'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'
import Formulario from '../views/lancamentos/formulario'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="formulario" element={<Formulario />} />
                <Route path="login" element={<Login />} />
                <Route path="cadastro-usuarios" element={<CadastroUsuario />} />
                <Route path="consulta-lancamentos" element={<ConsultaLancamentos />} />
                <Route path="cadastro-lancamentos" element={<CadastroLancamentos />} />
                <Route path="cadastro-lancamentos/:id" element={<CadastroLancamentos />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas