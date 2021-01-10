import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Head from '../head'
import { addChannel } from '../../redux/reducers/channels'

const AddChannel = (props) => {
  const [channelTitle, setChannelTitle] = useState()
  const [channelDescription, setChannelDescription] = useState()
  const dispatch = useDispatch()
  const onChangeTitle = (e) => {
    setChannelTitle(e.target.value)
  }
  const onChangeDescription = (e) => {
    setChannelDescription(e.target.value)
  }
  const onClick = () => {
    dispatch(addChannel(channelTitle, channelDescription))
    props.setToggle(false)
  }

  return (
    <div>
      <Head title="Add Channel" />
      <div className="grid grid-col-1 gap-2">
        <input
          className="border border-gray-300 text-gray-600 rounded-lg p-2"
          type="text"
          placeholder="Type new channel's name"
          value={channelTitle}
          onChange={onChangeTitle}
        />
        <input
          className="border border-gray-300 text-gray-600 rounded-lg p-2"
          type="text"
          placeholder="Type description"
          value={channelDescription}
          onChange={onChangeDescription}
        />
        <div className="flex justify-between pt-3">
          <button
            type="button"
            className="px-7 py-2 rounded-full bg-gray-300 text-gray-600 max-w-max shadow-sm hover:shadow-md"
            onClick={() => {
              props.setToggle(false)
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-7 py-2 rounded-full bg-gray-300 text-gray-600 max-w-max shadow-sm hover:shadow-md"
            onClick={onClick}
          >
            Add channel
          </button>
        </div>
      </div>
    </div>
  )
}

AddChannel.propTypes = {}

export default React.memo(AddChannel)
