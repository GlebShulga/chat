import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getChannelsList } from '../../redux/reducers/channels'
import Head from '../head'
import Topbar from '../topbar'
import Sidebar from '../sidebar'
import Chat from '../chat'

const Channel = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getChannelsList())
  }, [])
  return (
    <div>
      <Head title="Chat" />
      <div className="w-full border shadow bg-white">
        <div className="flex">
          <Sidebar />
          <div className="w-full flex flex-col">
            <Topbar />
            <Chat />
          </div>
        </div>
      </div>
    </div>
  )
}

Channel.propTypes = {}

export default React.memo(Channel)
