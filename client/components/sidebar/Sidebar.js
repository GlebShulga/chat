import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import ButtonAddChannel from '../add_show_Channels/ButtonAddChannel'
import ButtonShowChannels from '../add_show_Channels/ButtonShowChannels'
import Users from './Users'
import { updateActiveChannels, userJoinToChat } from '../../redux/reducers/channels'
import closeIcon from '../../assets/images/closeIcon.svg'
import menuIcon from '../../assets/images/menuIcon.svg'

const Sidebar = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((s) => s.auth.user)
  const listOfUsers = useSelector((s) => s.users.listOfUsers)
  const listOfChannels = useSelector((s) => s.channels.listOfChannels)
  const { channel: currenChannelTitle } = useParams()

  const [isSidebar, setIsSidebar] = useState(false)

  const showSidebar = () => setIsSidebar(!isSidebar)

  useEffect(() => {
    const activeChannelId = listOfChannels?.find(
      (channel) => channel.channelTitle === currenChannelTitle
    )?._id
    dispatch(userJoinToChat(activeChannelId))
    dispatch(updateActiveChannels(activeChannelId))
    return setIsSidebar(false)
  }, [currenChannelTitle])

  const channelsLinks = listOfUsers?.reduce((acc, rec) => {
    return rec.login === currentUser.login
      ? rec.subscriptionOnChannels?.map((subscribedChannel) =>
          currenChannelTitle === subscribedChannel ? (
            <div key={currenChannelTitle} className="bg-green-700 py-1">
              <div className="hover:text-gray-200 pl-1">
                <Link to={`/${currenChannelTitle}`}>{`# ${currenChannelTitle}`}</Link>
              </div>
            </div>
          ) : (
            <div key={subscribedChannel} className="py-1">
              <div className="hover:text-gray-400">
                <Link to={`/${subscribedChannel}`}>{`# ${subscribedChannel}`}</Link>
              </div>
            </div>
          )
        )
      : acc
  }, '')

  return (
    <div className="md:w-1/4 absolute lg:w-1/5 xl:w-1/6 mr-5">
      {!isSidebar && (
        <div className="flex flex-col md:hidden min-h-screen mr-5">
          <button
            className="p-4 focus:outline-none focus:bg-purple-700"
            type="button"
            onClick={showSidebar}
          >
            <img src={menuIcon} className="h-5 w-5" alt="Menu icon" />
          </button>
        </div>
      )}
      <div className={isSidebar ? 'sidebarSM' : 'hidden md:visible md:block sidebarMD'}>
        <h1 className="text-white text-base lg:text-xl mb-2 mt-3 px-4 font-sans flex justify-between">
          <span className={currenChannelTitle ? 'visible' : 'invisible'}>
            {currenChannelTitle} channel
          </span>
          {isSidebar && (
            <button
              className="focus:outline-none focus:bg-purple-700"
              type="button"
              onClick={showSidebar}
            >
              <img src={closeIcon} className="h-6 w-6" alt="Close icon" />
            </button>
          )}
        </h1>
        <div>
          <div className="flex justify-between py-3 flex-wrap">
            <div className="px-4 py-1 mb-2 mediumSans">Channels</div>
            <div className="flex justify-between lg:flex-wrap px-3 lg:block">
              <div className="px-1 ">
                <ButtonShowChannels />
              </div>
              <div className="px-1">
                <ButtonAddChannel />
              </div>
            </div>
          </div>
          <div className="mb-6 py-1 px-4 text-white font-semibold text-sm md:text-base">
            {channelsLinks}
          </div>
        </div>
        <div className="md:block">
          <div className="px-4 mb-3 mediumSans">Users</div>
          <div className="flex items-center mb-3 px-4">
            <span className="bg-green-500 rounded-full block w-2 h-2 mr-2" />
            <span className="text-purple-300">
              {currentUser.login} <i className="text-grey-400 text-sm">(me)</i>
            </span>
          </div>
          {listOfUsers?.map((user) => {
            const isUserHasSubscriptionOnCurrentChannel =
              user.subscriptionOnChannels.indexOf(currenChannelTitle) >= 0

            return (
              isUserHasSubscriptionOnCurrentChannel &&
              user.login !== currentUser.login && (
                <div key={user._id} className="flex items-center mb-3 px-4">
                  <Users user={user} />
                </div>
              )
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Sidebar)
