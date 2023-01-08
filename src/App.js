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
      <Header />
      <Main>
        <Formulario />
      </Main>
      <Footer />
    </>
  );
}

export default App;
