import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'

import Header from './components/layot/Header'
import Main from './components/layot/Main'
import Footer from './components/layot/Footer'

import Formulario from './components/pages/Formulario';
import EventosIndex from './components/pages/EventosIndex';
import EventoShow from './components/pages/EventoShow';

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
          </Routes>
        </Main>
        <Footer />
      </Router>
    </>
  );

}

export default App;
