import { useEffect, useState } from "react"
import { Reward } from "./reward"

export const Chain = ({ run, spins, quantity, probability, setSpins }) => {

  const [rewards, setRewards] = useState([])
  console.log(`render. reward length is ${rewards.length}`)

  useEffect(() => {
    let timer
    console.log(`spins are ${spins}. run is ${run} `)
    if (spins > 0 && run === true) {
      console.log("begin consume spin")
      timer = setTimeout(() => {

        console.log("consume spin")
        setSpins(s => s - 1)
        const res = Math.random();
        if (res <= probability) {
          console.log(`won ${quantity} spins`)
          setSpins(s => s + quantity)
          setRewards(prev => [...prev, ...Array(quantity).fill('spin')])
        } else {
          console.log(`won coins`)
          setRewards(prev => [...prev, 'coin'])
        }

      }, 1000);
    }

    return () => { if (timer) clearTimeout(timer) }

  }, [run, spins, setSpins, quantity, probability, rewards.length])

  return (
    <div>
      <input type='button' onClick={() => setRewards([])} value={'CLEAR PRIZES'} />
      <div className="chain">
        {rewards.map((type, idx) => (
          <Reward type={type} key={idx} />
        ))}
      </div>
    </div>
  )
}
