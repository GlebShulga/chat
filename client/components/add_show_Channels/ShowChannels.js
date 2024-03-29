import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Head from '../Head'
import { subscriptionOnChannel, unsubscriptionOnChannel } from '../../redux/reducers/users'

const SubscriptionOnChannel = (props) => {
  const history = useHistory()
  const listOfChannels = useSelector((s) => s.channels.listOfChannels)
  const currentUser = useSelector((s) => s.auth.user)

  const dispatch = useDispatch()

  const subscriptionOnClick = (channelTitle) => {
    const userId = currentUser._id
    dispatch(subscriptionOnChannel(userId, channelTitle))
    history.push(`/${channelTitle}`)
    props.setToggle(false)
  }

  const unsubscriptionOnClick = (channelTitle) => {
    const userId = currentUser._id
    dispatch(unsubscriptionOnChannel(userId, channelTitle))
  }

  return (
    <div className="opacity-100 z-0">
      <Head title="Channel's list" />
      <div className="grid justify-items-center">
        <div className="flex flex-col pt-3">
          <div className="text-gray-200 text-5xl font-bold underline grid justify-center py-5">
            Channels
          </div>
          {listOfChannels?.map((channel) => {
            const subscriptionsOfCurrentUser = currentUser.subscriptionOnChannels
            const isAlreadySubscribed = subscriptionsOfCurrentUser.find(
              (subscribedChannel) => subscribedChannel === channel.channelTitle
            )
            return (
              <div
                key={`${channel._id}_button`}
                className="flex flex-row px-4 py-2 grid justify-items-center"
              >
                <div className="text-gray-200 text-2xl font-bold">{channel.channelTitle}</div>
                <div className="flex flex-row">
                  <div className="p-2">
                    <button
                      type="button"
                      className="activeButtonShowChannels"
                      onClick={() => {
                        unsubscriptionOnClick(channel.channelTitle)
                      }}
                      disabled={!isAlreadySubscribed}
                    >
                      Unsubscribe
                    </button>
                  </div>
                  <div className="p-2">
                    <button
                      type="button"
                      className="activeButtonShowChannels"
                      onClick={() => {
                        subscriptionOnClick(channel.channelTitle)
                      }}
                      disabled={isAlreadySubscribed}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="pt-4 grid justify-center">
            <button
              type="button"
              className="px-7 py-2 rounded-full bg-gray-300 text-gray-600 max-w-max shadow-sm hover:bg-gray-300"
              onClick={() => {
                props.setToggle(false)
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SubscriptionOnChannel)
