import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getChannel } from '../redux/reducers/channels'

const Topbar = () => {
  const dispatch = useDispatch()
  const { channel: channelTitle } = useParams()
  const { channel } = useSelector((s) => s.channels)
  useEffect(() => {
    dispatch(getChannel(channelTitle))
  }, [dispatch, channelTitle])
  return (
    <div className="border-b flex px-6 py-2 items-center">
      <div className="flex flex-col">
        <h3 className="text-grey-800 text-md mb-1 font-extrabold"># {`${channelTitle}`}</h3>
        <div className="text-grey-500 font-thin text-sm">{`${channel.channelDescription}`}</div>
      </div>
      <div className="ml-auto hidden md:block">
        <input type="search" placeholder="Search" className="border border-grey rounded-lg p-2" />
      </div>
    </div>
  )
}

Topbar.propTypes = {}

export default React.memo(Topbar)
