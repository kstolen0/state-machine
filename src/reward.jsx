
export const Reward = ({ type }) => {

  const content = type === 'spin' ? '🗝️' : '💵';

  return (<div className={`reward ${type}`}>
    {content}
  </div>
  )
}
