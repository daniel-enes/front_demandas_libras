import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setCredentials, setSuccess } from "../../features/auth/authSlice"
import { useNavigate
 } from "react-router-dom"
export default function Login() {

  const navigate = useNavigate()

  const credentials = useSelector((state) => state.auth.credentials)
  const success = useSelector((state) => state.auth.success)
  const dispatch = useDispatch() 
  
  const [dadosLogin, setDadosLogin] = useState({})

  const handleChange = (campo) => {
    let name = campo.name
    let value = campo.value
    setDadosLogin({...dadosLogin, [name]:value})
  }

  const credentialsApi = {
    grant_type: 'password',
    client_id: 2,
    client_secret: 'RsLm1qZaFx8IHJhIo3UWN63kOXSNVSZTOUI4uYO4',
    username: dadosLogin.username,
    password: dadosLogin.password,
  }

  const submit = (e) => {
    e.preventDefault()
    dispatch(setCredentials(dadosLogin))

    fetch('http://localhost:8000/oauth/token', {
      method: 'POST',
      headers: {
          'Content-type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json',
      },
      body: JSON.stringify(credentialsApi),
    })
    .then(resp => resp.json())
    .then((data) => {
      if(data.access_token) {
        dispatch(setSuccess(true))
        localStorage.setItem('access_token', data.access_token)
        navigate('/eventos')
      }
    })
    .catch(error => {
      if(typeof error.response !== 'undefined') 
      {
        if(error.response.status === 401 || error.response.status === 400) 
        {
          //console.log(error.response)
        }
      }
      else
      {
      // erro ao conectar-se ao servidor
      }
    })
  }

  return(
    <div className="container">
      <h2>{credentials.username}</h2>
      <form onSubmit={(e) => submit(e)} className="container_form">
      <h1>Login</h1>
        <input onChange={(e) => handleChange(e.target)} type="text" name="username" placeholder="Username"/>
        <input onChange={(e) => handleChange(e.target)} type="password" name="password" placeholder="Password"/>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}