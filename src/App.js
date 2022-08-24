import "./App.css"
import { useState } from 'react' 

import api from "./services/api";

function App() {
  const[input, setInput] = useState("")
  const[cep, setCep] = useState({})
  
  async function searchCep(e) {
    e.preventDefault()

    try {
      const response = await api.get(`${input}/json`)
      setCep(response)
      console.log(response)
      setInput("")
    } catch (error) {
      setCep(error.name)
    }
  }
  

  return (
    <div className="app">
      <h1 className="title">Buscar Cep</h1>

      <form className="form">
        <input className="input" placeholder="Informe o cep" type='text' onChange={e => setInput(e.target.value)} required value={input}/>

        <button className="button" onClick={searchCep}>
          Buscar
        </button>
      </form>

      {cep.status == 200 &&(
        <div className="infoCep">
          <p><strong>Cep:</strong> {cep.data.cep}</p>
          <p><strong>ddd:</strong> {cep.data.ddd}</p>
          <p><strong>Localidade:</strong> {cep.data.localidade} - {cep.data.uf}</p>
        </div>
      )}

      {cep == "AxiosError" &&(
        <div className="infoCep">
          <p className="invalid"><strong>CEP inválido!!</strong></p>
        </div>
      )}
    </div>
  )
}

export default App;
