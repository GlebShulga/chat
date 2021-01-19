/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Head from '../head'
import { subscriptionOnChannel } from '../../redux/reducers/users'

const SubscriptionOnChannel = (props) => {
  const history = useHistory()
  const listOfChannels = useSelector((s) => s.channels.listOfChannels)
  const currentUserName = useSelector((s) => s.users.currentUserName)

  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(subscriptionOnChannel(userId, channelTitle))
    history.push(`/${channelTitle}`)
    props.setToggle(false)
  }

  return (
    <div сlassName="opacity-100">
      <Head title="Add Channel" />
      <div className="grid grid-col-1 gap-2">
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

SubscriptionOnChannel.propTypes = {}

export default React.memo(SubscriptionOnChannel)
