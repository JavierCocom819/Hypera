import React, { Fragment } from 'react';
import Header from '../src/componentes/layout/Header';
import Navigation from './componentes/layout/Navigation';

import Clientes from './componentes/cliente/Clientes';
import NuevoClientes from './componentes/cliente/NuevoClientes';
import EditarCliente from './componentes/cliente/EditarClientes';

import Login from './componentes/login/login';

import Usuarios from './componentes/usuario/Usuarios';
import NuevoUsuarios from './componentes/usuario/NuevoUsuarios';
import EditarUsuario from './componentes/usuario/EditarUsuarios';

import Inicio1 from './componentes/inicio/inicio';

import { BrowserRouter  as Router,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Fragment>
    <Router>
      <Routes>
      

      </Routes>
      
        
          

          
            <Routes>
             <Route path="/" element={<Login/>} />
             <Route path="/inicio" element={<Inicio1/>}/>
              <Route path="/cliente" element={<><Header/><Navigation/><Clientes/></>} />
              <Route path='/nuevo-cliente' element={<><Header/><Navigation/><NuevoClientes/></>} />
              <Route path='/editar-cliente/:IdCliente'  element={<><Header/><Navigation/><EditarCliente/></>} />
              <Route path="/usuario" element={<><Header/><Navigation/><Usuarios/></>} />
              <Route path='/nuevo-usuario' element={<><Header/><Navigation/><NuevoUsuarios/></>} />
              <Route path='/editar-usuario/:IdUsuario'  element={<><Header/><Navigation/><EditarUsuario/></>} />
            </Routes>
          
        
      
    </Router>
    </Fragment>
    
  );
}

export default App;
 
