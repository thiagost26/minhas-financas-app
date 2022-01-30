import React from 'react';

import Rotas from './rotas';
import Navbar from '../components/navbar';

import 'toastr/build/toastr.min.js';

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  



class App extends React.Component {
  render() {
    return(
      <>
        <Navbar/>
          <div className="container">
            <Rotas></Rotas>

          </div>
      </>
    )
  }
}

export default App;
