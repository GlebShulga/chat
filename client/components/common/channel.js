import React from 'react'
import { useParams } from 'react-router-dom'
import Head from '../head'
import Topbar from '../topbar'

const Channel = () => {
  const { channelTitle } = useParams()
  return (
    <div>
      <Head title="Task List" />
      <div> <Topbar /> </div>
      {channelTitle}
    </div>
  )
}

Channel.propTypes = {}

export default React.memo(Channel)
