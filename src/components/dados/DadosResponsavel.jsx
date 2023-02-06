

export default function DadosResponsavel (props) {
    let dadosResponsavel = false
    
    if(props.dados) {
        dadosResponsavel = props.dados
    }

    return (
        <>
        <p><b>{dadosResponsavel.attributes.nome}</b></p>
        <p><b>Telefone</b>: <a href={"tel:"+dadosResponsavel.attributes.telefone}>{dadosResponsavel.attributes.telefone}</a></p>
        <p><b>Email</b>: <a href={"mailto:"+dadosResponsavel.attributes.email}>{dadosResponsavel.attributes.email}</a></p>
        <p><b>Ocupação</b>: {dadosResponsavel.attributes.ocupacao}</p>
        <p><b>Registro</b>: {dadosResponsavel.attributes.registro}</p>
        </>
    )
}