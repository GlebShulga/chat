import React from 'react'
import Head from './head'

const PrivateComponent = () => {
  return (
    <div>
      <Head title="Top secret" />
      <div className="w-full border shadow bg-white">
        <div className="flex">
          <div className="w-full flex flex-col">This is private component</div>
        </div>
      </div>
    </div>
  )
}

PrivateComponent.propTypes = {}

export default React.memo(PrivateComponent)
