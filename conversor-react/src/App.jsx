import { useState } from 'react'
/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css'

function App() {
  const [euro, setEuro] = useState(0)
  const [dolar, setDolar] = useState(0)
  const [yuan, setYuan] = useState(0)
  const [unidad, setUnidad] = useState('euro')
  const [cantidad, setCantidad] = useState('')

  function convertir() {
    const cantidadNum = parseFloat(cantidad)
    
    if (isNaN(cantidadNum)) {
      alert("Por favor, introduce un número válido")
      return
    }
    let euros, dolares, yuanes
    
    switch (unidad) {
      case "euro":
        euros = cantidadNum
        dolares = cantidadNum * 1.1
        yuanes = cantidadNum * 7.5
        break
      case "dolar":
        euros = cantidadNum / 1.1
        dolares = cantidadNum
        yuanes = (cantidadNum / 1.1) * 7.5
        break
      case "yuan":
        euros = cantidadNum / 7.5
        dolares = (cantidadNum / 7.5) * 1.1
        yuanes = cantidadNum
        break
      default:
        alert("Unidad no válida.")
        return
    }
    
    setEuro(euros.toFixed(2))
    setDolar(dolares.toFixed(2))
    setYuan(yuanes.toFixed(2))  } 

  return (
    <>
      <h1>Conversor de Unidades</h1>
      <p>Euros: {euro}</p>
      <p>Dólares: {dolar}</p>
      <p>Yuanes: {yuan}</p>
      <div>
        <label htmlFor="unidad">Unidad:</label>
        <select id="unidad" value={unidad} onChange={(e) => setUnidad(e.target.value)}>
          <option value="euro">Euro</option>
          <option value="dolar">Dólar</option>
          <option value="yuan">Yuan</option>
        </select>
        <label htmlFor="cantidad">Cantidad:</label>
        <input 
          type="text" 
          id="cantidad" 
          value={cantidad} 
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button onClick={convertir}>Convertir</button>
      </div>
    </>
  )
}

export default App
