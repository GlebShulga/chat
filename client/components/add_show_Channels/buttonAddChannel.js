import React, { useEffect, useState } from 'react'
import AddChannel from './addChannel'

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
      <div className="absolute mb-10 ml-10">
        <div
          id="tooltipAdd"
          className="bg-black text-white text-xs font-bold rounded py-1 px-4 right-0 bottom-full hidden"
        >
          Create a channel
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
        id="btnAdd"
        className="p-0 w-8 h-8 bg-purple-600 rounded-full hover:bg-green-500 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
        onClick={() => setToggle(!toggle)}
      >
        <svg viewBox="0 0 20 20" className="w-6 h-6 inline-block">
          <path
            fill="#FFFFFF"
            d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
          />
        </svg>
      </button>
      {toggle && (
        <div className="absolute w-screen h-screen bg-gray-700 opacity-80 top-0 left-0 flex items-center justify-center">
          <AddChannel setToggle={setToggle} />
        </div>
      )}
    </div>
  )
}

ButtonAddChannel.propTypes = {}

export default React.memo(ButtonAddChannel)
