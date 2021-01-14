import React from 'react'

import Head from './head'
import Topbar from './topbar'
import Sidebar from './sidebar'
import Chat from './chat'

const Channel = () => {
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
