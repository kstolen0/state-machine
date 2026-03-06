import { useCallback, useState } from 'react'
import './App.css'
import { Chain } from './chain';

function App() {
  const [numSpins, setNumSpins] = useState(0);
  const [coins, setCoins] = useState(5);

  const [spinOutcomeAmount, setSpinOutcomeAmount] = useState(1);
  const [spinOutcomeP, setSpinOutcomeP] = useState(0.3);
  const [coinOutcomeP, setCoinOutcomeP] = useState(0.3);
  const pOfNothing = (1 - (coinOutcomeP + spinOutcomeP)).toPrecision(2)

  const res = (spinOutcomeAmount * spinOutcomeP).toFixed(2)

  const onReset = useCallback(() => {
    setNumSpins(0)
    setCoins(5)
    setSpinOutcomeAmount(1)
    setSpinOutcomeP(0.3)
    setCoinOutcomeP(0.3)

  }, [setNumSpins, setSpinOutcomeAmount, setSpinOutcomeP])

  const buySpin = useCallback(() => {
    setNumSpins(n => n + 1)
    setCoins(c => c - 1)
  }, [setNumSpins]);

  const handleCoinP = (p) => {
    if ((pOfNothing > 0.02 && spinOutcomeP + coinOutcomeP < 1) || p <= coinOutcomeP) {
      setCoinOutcomeP(p)
    }
  }

  const handleSpinP = (p) => {
    if ((pOfNothing > 0.02 && spinOutcomeP + coinOutcomeP < 1) || p <= spinOutcomeP) {
      setSpinOutcomeP(p)
    }
  }

  return (
    <div className='container'>
      <div className='inputs'>
        <ManageCoinOutcome setP={handleCoinP} p={coinOutcomeP} />
        <ManageSpinOutcome setP={handleSpinP} setQuantity={setSpinOutcomeAmount} p={spinOutcomeP} quantity={spinOutcomeAmount} />
        <ManageNoOutcome p={pOfNothing} />
      </div>
      <div>
        <input type='button' disabled={coins < 1} onClick={buySpin} value={'BUY SPIN'} />
        <input type='button' onClick={onReset} value={'RESET VALUES'} />
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <h2>spins: {numSpins}</h2>
        <h2>coins: {coins}</h2>
      </div>
      <h3>chain is {res < 1 ? `finite` : `infinite`} ({`${spinOutcomeAmount} * ${spinOutcomeP} = ${res}`})</h3>
      <Chain spins={numSpins} quantity={spinOutcomeAmount} spinP={spinOutcomeP} coinP={coinOutcomeP} setSpins={setNumSpins} setCoins={setCoins} />
    </div>
  )
}

const ManageSpinOutcome = ({ setP, setQuantity, p, quantity }) => {

  return (<div>
    <Slider handleChange={(e) => setP(Number(e.target.value) / 100)} value={p * 100} label={`probability of spins (${p})`} min={1} max={100} />
    <Slider handleChange={(e) => setQuantity(Number(e.target.value))} value={quantity} label={`quantity of spins to reward (${quantity})`} min={1} max={10} />
  </div>
  )
}

const ManageCoinOutcome = ({ setP, p }) => {

  return (<div>
    <Slider handleChange={(e) => setP(Number(e.target.value) / 100)} value={p * 100} label={`probability of coin (${p})`} min={1} max={100} />
  </div>
  )
}

const ManageNoOutcome = ({ p }) => {

  return (<div>
    <Slider disabled={true} value={p * 100} label={`probability of nothing (${p})`} min={1} max={100} />
  </div>)
}

const Slider = (props) => {
  return (<p>
    {props.label} <br />
    <input disabled={!!props.disabled} className='slider' type='range' min={props.min} max={props.max} onChange={props.handleChange} value={props.value} />
  </p>
  )
}


export default App
