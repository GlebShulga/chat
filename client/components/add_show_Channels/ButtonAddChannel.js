import React, { useEffect, useState } from 'react'
import AddChannel from './AddChannel'
import addChannelIcon from '../../assets/images/addChannelIcon.svg'
import createChannelIcon from '../../assets/images/createChannelIcon.svg'

const ButtonAddChannel = () => {
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const btn = document.querySelector('#btnAdd')
    const tooltip = document.querySelector('#tooltipAdd')

    btn.addEventListener('mouseenter', () => {
      tooltip.classList.remove('hidden')
    })

    btn.addEventListener('mouseleave', () => {
      tooltip.classList.add('hidden')
    })
    return () =>
      btn.addEventListener('mouseleave', () => {
        tooltip.classList.add('hidden')
      })
  }, [])

  return (
    <div>
      <div className="absolute mb-10 ml-10 z-10">
        <div
          id="tooltipAdd"
          className="bg-black text-white text-xs font-bold rounded py-1 px-4 right-0 bottom-full hidden"
        >
          Create a channel
          <img
            src={createChannelIcon}
            className="absolute text-black h-2 left-0 ml-3 top-full"
            alt="create channel icon"
          />
        </div>
      </div>
      <button
        type="button"
        id="btnAdd"
        className="p-0 w-8 h-8 bg-purple-600 rounded-full hover:bg-green-500 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
        onClick={() => setToggle(!toggle)}
      >
        <img src={addChannelIcon} alt="add channel icon" />
      </button>
      {toggle && (
        <div className="absolute w-screen h-screen bg-gray-700 opacity-90 top-0 left-0 flex items-center justify-center z-10">
          <AddChannel setToggle={setToggle} />
        </div>
      )}
    </div>
  )
}

export default React.memo(ButtonAddChannel)
