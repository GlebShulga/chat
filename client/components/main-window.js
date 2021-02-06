import React from 'react'
import Head from './head'
import Sidebar from './sidebar'
// import Chat from './chat'
// import Topbar from './topbar'

const MainWindow = () => {
  return (
    <div>
      <Head title="Chat" />
      <div className="w-full border shadow bg-white">
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-full flex flex-col flex items-center p-6">
            <div className="text-4xl font-medium">Welcome to the chat</div>
            <div className="text-lg">Choose one of the channels and begin conversation</div>
          </div>
        </div>
      </div>
    </div>
  )
}

MainWindow.propTypes = {}

export default React.memo(MainWindow)
