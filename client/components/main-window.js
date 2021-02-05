import React from 'react'
import Head from './head'
import Sidebar from './sidebar'
import Chat from './chat'
// import Topbar from './topbar'

const MainWindow = () => {
  return (
    <div>
      <Head title="Chat" />
      <div className="w-full border shadow bg-white">
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-full flex flex-col relative">
            {/* <Topbar /> */}
            <Chat />
          </div>
        </div>
      </div>
    </div>
  )
}

MainWindow.propTypes = {}

export default React.memo(MainWindow)
