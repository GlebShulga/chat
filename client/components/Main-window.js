import React from 'react'
import Head from './Head'
import Sidebar from './sidebar/Sidebar'

const MainWindow = () => {
  return (
    <div className="h-screen">
      <Head title="Chat" />
      <Sidebar />
      <div className="grid justify-items-center py-6 px-12">
        <div className="text-xl md:text-2xl lg:text-4xl font-medium">Welcome to the chat</div>
        <div className="md:text-lg pl-4">Choose one of the channels and begin conversation</div>
      </div>
    </div>
  )
}

export default React.memo(MainWindow)
