import React, { useEffect, useState } from 'react'
import SubscriptionOnChannel from './showChannels'

const ButtonShowChannels = () => {
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const btn = document.querySelector('#btnShow')
    const tooltip = document.querySelector('#tooltipShow')

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
          id="tooltipShow"
          className="bg-black text-white text-xs font-bold rounded py-1 px-4 right-0 bottom-full hidden"
        >
          Show public channels
          <svg
            className="absolute text-black h-2 left-0 ml-3 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          />
        </div>
      </div>
      <button
        type="button"
        id="btnShow"
        className="p-0 w-8 h-8 bg-purple-600 rounded-full hover:bg-green-500 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
        onClick={() => setToggle(!toggle)}
      >
        <svg
          className="text-white w-6 h-6 mx-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
      </button>
      {toggle && (
        <div className="absolute w-screen h-screen bg-gray-700 opacity-90 top-0 left-0 flex items-center justify-center z-10">
          <SubscriptionOnChannel setToggle={setToggle} />
        </div>
      )}
    </div>
  )
}

ButtonShowChannels.propTypes = {}

export default React.memo(ButtonShowChannels)
