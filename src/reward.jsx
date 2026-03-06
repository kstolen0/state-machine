
export const Reward = ({ type }) => {

  const content = type === 'spin' ? '🗝️' : type === 'coin' ? '💵' : '😭';

  return (<div className={`reward ${type}`}>
    {content}
  </div>
  )
}
