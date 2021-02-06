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
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-full flex flex-col relative z-0">
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
