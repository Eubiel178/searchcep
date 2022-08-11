import "./App.css"
import { useState } from 'react' 

import api from "./services/api";

function App() {
  const[input, setInput] = useState()
  const[cep, setCep] = useState()
  
  async function searchCep(e) {
    e.preventDefault()

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <main>
      <h1 className="title">Buscar Cep</h1>

      <form className="form">
        <input className="input" placeholder="Informe o cep" type='text' onChange={e => setInput(e.target.value)} required value={input}/>

        <button className="button" onClick={searchCep}>
          Buscar
        </button>
      </form>

      {cep &&(
        <div className="infoCep">
          <p><strong>Cep:</strong> {cep.cep}</p>
          <p><strong>ddd:</strong> {cep.ddd}</p>
          <p><strong>Localidade:</strong> {cep.localidade} - {cep.uf}</p>
        </div>
      )}
    </main>
  )
}

export default App;
