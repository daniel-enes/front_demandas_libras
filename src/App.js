import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'

import Header from './components/layot/Header'
import Main from './components/layot/Main'
import Footer from './components/layot/Footer'

import Formulario from './components/pages/Formulario';
import EventosIndex from './components/pages/EventosIndex';
import EventoShow from './components/pages/EventoShow';
import FormularioInterprete from './components/pages/FormularioInterprete ';
import InterpretesIndex from './components/pages/InterpretesIndex';
import EscalarInterprete from './components/pages/EscalarInterprete';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Main>
          <Routes>
            <Route path='/solicitar' element={<Formulario />} />
            <Route path='/solicitar/evento/:e' element={<Formulario />} />
            <Route path='/eventos' element={<EventosIndex />}/>
            <Route path='/eventos/:id' element={<EventoShow/>}/>
            <Route path='/cadastrar_interprete' element={<FormularioInterprete />}/>
            <Route path='/interpretes' element={<InterpretesIndex />}/>
            <Route path='/editar_escala_interprete/:horarioId' element={<EscalarInterprete />}/>
          </Routes>
        </Main>
        <Footer />
      </Router>
    </>
  );

}

export default App;
