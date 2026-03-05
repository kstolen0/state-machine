import { useCallback, useState } from 'react'
import './App.css'
import { Chain } from './chain';

function App() {
  const [numSpins, setNumSpins] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [p, setP] = useState(0.5);
  const [run, setRun] = useState(false)

  const res = quantity * p

  const onReset = useCallback(() => {
    setNumSpins(5)
    setQuantity(1)
    setP(0.5)

  }, [setNumSpins, setQuantity, setP])

  return (
    <div>
      <h1>number of spins left: {numSpins}</h1>
      <h2>chain is {res < 1 ? `finite` : `infinite`} ({res})</h2>
      <div>
        <Slider handleChange={(e) => setQuantity(Number(e.target.value))} default={quantity} label={`quantity of spins to reward (${quantity})`} min={1} max={10} />
        <Slider handleChange={(e) => setP(Number(e.target.value) / 100)} default={p * 100} label={`probability (${p})`} min={1} max={100} />
      </div>
      <input type='button' onClick={() => setRun(r => !r)} value={run ? 'STOP' : 'START'} />
      <input type='button' onClick={onReset} value={'RESET VALUES'} />
      <Chain run={run} spins={numSpins} quantity={quantity} probability={p} setSpins={setNumSpins} />
    </div>
  )
}


const Slider = (props) => {

  return (<p>
    {props.label} <br />
    <input className='slider' type='range' min={props.min} max={props.max} onChange={props.handleChange} defaultValue={props.default} value={props.default} />
  </p>
  )
}


export default App
