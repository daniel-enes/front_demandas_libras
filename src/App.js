import Header from './components/layot/Header'
import Main from './components/layot/Main'
import Footer from './components/layot/Footer'

import Formulario from './components/pages/Formulario';

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
