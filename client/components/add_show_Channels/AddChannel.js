import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Head from '../Head'
import { addChannel } from '../../redux/reducers/channels'
// import { subscriptionOnChannel } from '../../redux/reducers/users'

const AddChannel = (props) => {
  const history = useHistory()
  const listOfChannels = useSelector((s) => s.channels.listOfChannels)
  const creatorId = useSelector((s) => s.auth.user._id)
  const [channelTitle, setChannelTitle] = useState()
  const [channelDescription, setChannelDescription] = useState()
  const [channelAlreadyExist, setChannelAlreadyExist] = useState(false)
  const dispatch = useDispatch()
  const onChangeTitle = (e) => {
    setChannelTitle(e.target.value)
  }
  const onChangeDescription = (e) => {
    setChannelDescription(e.target.value)
  }
  const onClickAddChannel = () => {
    if (listOfChannels.indexOf(channelTitle) === -1) {
      dispatch(addChannel(creatorId, channelTitle, channelDescription))
      history.push(`/${channelTitle}`)
      props.setToggle(false)
      setChannelAlreadyExist(false)
    }
    setChannelAlreadyExist(true)
  }

  return (
    <div className="opacity-100">
      <Head title="Add Channel" />
      <div className="grid grid-col-1 gap-2">
        {!channelAlreadyExist && (
          <input
            className="border border-gray-300 text-gray-600 rounded-lg p-2"
            type="text"
            placeholder="Type new channel's name"
            value={channelTitle}
            onChange={onChangeTitle}
          />
        )}
        {channelAlreadyExist && (
          <div>
            <input
              className="border-4 border-red-600 text-gray-600 rounded-lg p-2"
              type="text"
              placeholder="Type new channel's name"
              value={channelTitle || ''}
              onChange={onChangeTitle}
            />
            <div className="text-red-500 font-semibold flex justify-center text-lg pt-1">
              Channel`s name already exist
            </div>
          </div>
        )}
        <input
          className="border border-gray-300 text-gray-600 rounded-lg p-2"
          type="text"
          placeholder="Type description"
          value={channelDescription || ''}
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
            onClick={onClickAddChannel}
          >
            Add channel
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AddChannel)
