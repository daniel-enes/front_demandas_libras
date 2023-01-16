import loading from '../../img/loading.gif'

function Loading() {
    
    return(
        <div id="loading" className="display_none" role="alert">
            <img src={loading} className="loading" alt="carregando"/>
        </div>
    )
}

export default Loading