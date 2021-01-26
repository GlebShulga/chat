import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Head from '../head'
import { subscriptionOnChannel, unsubscriptionOnChannel } from '../../redux/reducers/users'

const SubscriptionOnChannel = (props) => {
  const history = useHistory()
  const listOfChannels = useSelector((s) => s.channels.listOfChannels)
  const listOfUsers = useSelector((s) => s.users.listOfUsers)
  const currentUserName = useSelector((s) => s.users.currentUserName)

  const dispatch = useDispatch()

  const subscriptionOnClick = (channelTitle) => {
    const userId = listOfUsers.reduce(
      (acc, rec) => (rec.userName === currentUserName ? rec.userId : acc),
      ''
    )
    dispatch(subscriptionOnChannel(userId, channelTitle))
    history.push(`/${channelTitle}`)
    props.setPosition(false)
  }

  const unsubscriptionOnClick = (channelTitle) => {
    const userId = listOfUsers.reduce(
      (acc, rec) => (rec.userName === currentUserName ? rec.userId : acc),
      ''
    )
    dispatch(unsubscriptionOnChannel(userId, channelTitle))
  }

  const activeButton =
    'bg-transparent hover:bg-grey text-grey-dark font-semibold hover:text-white py-2 px-4 border border-grey hover:border-transparent rounded mr-2'
  return (
    <div сlassName="opacity-100">
      <Head title="Channel's list" />
      <div className="grid justify-items-center">
        <div className="flex flex-col pt-3">
          <div className="text-gray-200 text-5xl font-bold underline grid justify-center py-5">
            Channels
          </div>
          {listOfChannels.map((channelTitle) => {
            const subscriptionsOfCurrentUser = listOfUsers.reduce((acc, rec) => {
              return rec.userName === currentUserName ? rec.subscriptionOnChannels : acc
            }, [])
            const isButtonDisable = subscriptionsOfCurrentUser.find(
              (subscribedChannel) => subscribedChannel !== channelTitle
            )
            return (
              <div key="buttons" className="flex flex-row p-4 grid justify-items-center">
                <div className="text-gray-200 text-2xl font-bold">{channelTitle}</div>
                <div className="flex flex-row">
                  <div className="p-2">
                    <button
                      type="button"
                      className={activeButton}
                      onClick={() => {
                        unsubscriptionOnClick(channelTitle)
                      }}
                      disabled={isButtonDisable}
                    >
                      Unsubscribe
                    </button>
                  </div>
                  <div className="p-2">
                    <button
                      type="button"
                      className={activeButton}
                      onClick={() => {
                        subscriptionOnClick(channelTitle)
                      }}
                      disabled={isButtonDisable}
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
                props.setPosition(false)
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

SubscriptionOnChannel.propTypes = {}

export default React.memo(SubscriptionOnChannel)
