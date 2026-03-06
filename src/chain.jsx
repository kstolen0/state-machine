import { useEffect, useState } from "react"
import { Reward } from "./reward"

export const Chain = ({ spins, quantity, spinP, setSpins, setCoins, coinP }) => {

  const [rewards, setRewards] = useState([])

  useEffect(() => {
    let timer
    if (spins > 0) {
      timer = setTimeout(() => {

        console.log("consume spin")
        setSpins(s => s - 1)
        let res = Math.random();
        console.log(`res is ${res}`)
        if (res <= spinP) {
          console.log(`won ${quantity} spins`)
          setSpins(s => s + quantity)
          setRewards(prev => [...prev, ...Array(quantity).fill('spin')].slice(-25))
          return
        }
        res -= spinP
        if (res <= coinP) {
          console.log(`won coin`)
          setCoins(c => c + 1)
          setRewards(prev => [...prev, 'coin'].slice(-25))
          return
        }
        console.log(`won nothing`)
        setRewards(prev => [...prev, 'none'].slice(-25))

      }, 1000);
    }

    return () => { if (timer) clearTimeout(timer) }

  }, [spins, setSpins, quantity, spinP, coinP, rewards.length])

  return (
    <div>
      <input type='button' onClick={() => setRewards([])} value={'CLEAR PRIZES'} />
      <div className="chain">
        {rewards.slice().reverse().map((type, idx) => (
          <Reward type={type} key={idx} />
        ))}
      </div>
    </div>
  )
}
