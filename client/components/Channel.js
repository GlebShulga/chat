import React from 'react'

import Head from './Head'
import Sidebar from './Sidebar'
import Chat from './Chat'

const Channel = () => {
  return (
    <div className="h-screen">
      <Head title="Chat" />
      <Sidebar />
      <Chat />
    </div>
  )
}

export default React.memo(Channel)
