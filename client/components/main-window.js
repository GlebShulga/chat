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
        <div className="flex">
          <Sidebar />
          <div className="w-full flex flex-col">
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
