import { postApi} from '../../funcoes/formulario.js'
import {toogleLoading} from "../../funcoes/efeitos.js"

// Hooks do React
import { useState } from 'react';

// Componentes para compor o formulário
import Orientacao from "../form/Orientacao";
import Input from "../form/Input"
import Textarea from "../form/Textarea"
import Button from "../form/Button";
import Loading from '../layot/Loading.jsx';

function Evento({idResponsavel, setEvento}) {

    // Define a variavel e o state que armanezarão os dados advindos do formulário    
    const [dados, setDados] = useState({})

    /*
    * Função handleChange
    * Função de manipulação dos dados advindos do formulário
    * @campo = recebe o campo do formulário que terá suas propridades name e value acessadas
    */
    const handleChange = (campo) => {
        const nome = campo.name
        const valor = campo.value
        setDados({ ...dados , [nome] : valor})
    }

    // dados: estrutura de dados a ser enviado par ao backend
    const evento = {
        data: {
            types: "eventos",
            attributes: {
                titulo: dados.titulo,
                sobre: dados.sobre,
                informacoes: dados.informacoes,
            },
            relationships: {
                responsaveis: {
                    data: {
                        type: "responsaveis",
                        id: idResponsavel.data.id,    
                    }
                }
            },

        }
    }

    /*
    * Função de envio de formulário
    */
    const submit = (e) => {
        e.preventDefault()
        toogleLoading(true)
        postApi(setEvento, evento, "/eventos")
    }

    return(
        <>
            <Loading />
            <Orientacao />
            <h1 tabIndex="0">Eventos</h1>
            <div className="container_form">
                <form  onSubmit={(e) => submit(e)}>
                    <Input
                    label="Título do evento"
                    descricao="Exemplos: V Seminário de Pesquisas Educacionais; Reunião Pedagógica; Cerimônia de 
                    Posse do Novo Diretor da Unidade... Até 200 caracteres."
                    idDescricao="desc_titulo"
                    type="text"
                    name="titulo"
                    id="titulo"
                    maxlength="200"
                    required={true}
                    handleChange={handleChange}
                    />

                    <Textarea
                    label="Sobre o evento"
                    descricao="Um resumo e descrição do que se trata o evento. Até 5000 caracteres."
                    idDescricao="desc_sobre"
                    name="sobre"
                    id="sobre"
                    maxlength="5000"
                    required={true}
                    handleChange={handleChange} 
                    />

                    <Input
                    label="Mais informações"
                    descricao="Sítio eletrônico onde podem ser encontradas mais informações pertinentes ao evento. 
                    Até 255 caracteres. Exemplo: https://seusite.com.br"
                    idDescricao="desc_informacoes"
                    type="url"
                    name="informacoes"
                    id="informacoes"
                    maxlength="255"
                    handleChange={handleChange}
                    />

                    <Button className="botao">Enviar</Button>
                </form>
            </div>
        </>
    )
}

export default Evento