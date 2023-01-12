import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'

import Header from './components/layot/Header'
import Main from './components/layot/Main'
import Footer from './components/layot/Footer'

import Formulario from './components/pages/Formulario';
import Responsavel from './components/pages/Responsavel';
import Horario from './components/pages/Horario';
import Loading from './components/layot/Loading'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Main>
          <Routes>
            <Route path='/solicitar' element={<Formulario />} />
            <Route path='/solicitar/evento/:e' element={<Formulario />} />
          </Routes>
        </Main>
        <Footer />
      </Router>
    </>
  );

}

export default App;
