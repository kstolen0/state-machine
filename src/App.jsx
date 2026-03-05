import { useState } from 'react'
import './App.css'
import { Chain } from './chain';

function App() {
  const [numSpins, setNumSpins] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [p, setP] = useState(0.5);
  const [run, setRun] = useState(false)

  const res = quantity * p

  return (
    <div>
      <h1>number of spins left: {numSpins}</h1>
      <h2>chain is {res < 1 ? `finite` : `infinite`} ({res})</h2>
      <div>
        <Input handleChange={(e) => setQuantity(Number(e.target.value))} default={quantity} label={'quantity of spins to reward'} />
        <Input handleChange={(e) => setP(Number(e.target.value))} default={p} label={'probability of spin reward'} />
      </div>
      <input type='button' onClick={() => setRun(r => !r)} value={'toggle'} />
      <Chain run={run} spins={numSpins} quantity={quantity} probability={p} setSpins={setNumSpins} />
    </div>
  )
}

const Input = (props) => {

  return (<p>
    {props.label} <br />
    <input onChange={props.handleChange} defaultValue={props.default} />
  </p>
  )
}


export default App
