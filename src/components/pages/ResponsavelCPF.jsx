//Arquivo de configuração
import { urlApi } from "../../config"
import {toogleLoading} from "../../funcoes/efeitos.js"

// Hooks do React
import { useEffect, useState } from 'react';

// Componentes para compor o formulário
import Orientacao from "../form/Orientacao";
import Input from "../form/Input"
import Button from "../form/Button";
import Loading from "../layot/Loading";

function ResponsavelCPF({setDadosResponsavel, setResponsavelCPF}) {

    // Define a variavel e o state que armanezarão os dados advindos do formulário    
    const [cpf, setCPF] = useState();

    /*
    * Função handleChange
    * Função de manipulação dos dados advindos do formulário
    * @campo = recebe o campo do formulário que terá suas propridades "value" acessada
    */
    const handleChange = (campo) => {
        setCPF(campo.value)
    }

    /*
    * Função de envio de formulário
    */
    const submit = (e) => {
        e.preventDefault()
        toogleLoading(true)
        fetch(urlApi+"/responsaveis?cpf="+cpf, {
            method: 'GET',
            headers: {
                'Content-type': 'application/vnd.api+json',
                //'Accept': 'application/vnd.api+json',
                'Access-Control-Allow-Origin': 'http://192.168.1.66:3000',
                //'Content-type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then((data) => {
            if(!data.data) {
                setResponsavelCPF(cpf)
            } else {
                setDadosResponsavel(data)
            }
        })
        .catch((err) => console.log(err))
    }

    return(
        <>
            <Loading />
            <Orientacao />
            <h1 tabIndex="0">Informe seu CPF</h1>
            <div className="container_form">
                <form onSubmit={(e) => submit(e)}>
                    <Input
                        label="CPF"
                        descricao="Apenas dígitos numéricos, sem pontos e traço. "
                        idDescricao="desc_cpf"
                        type="number"
                        name="cpf"
                        id="cpf"
                        maxlength="11"
                        required="required"
                        handleChange={handleChange}
                    />

                    <Button />
                </form>
            </div>
        </>
    )
}

export default ResponsavelCPF