import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import ButtonAddChannel from './add_show_Channels/buttonAddChannel'
import ButtonShowChannels from './add_show_Channels/buttonShowChannels'
import bell from '../assets/images/bell.svg'

const Sidebar = () => {
  const currentUser = useSelector((s) => s.auth.user)
  const listOfUsers = useSelector((s) => s.users.listOfUsers)
  const { channel: currenChannelTitle } = useParams()
  return (
    <div className="bg-purple-900 text-purple-300 w-1/4 md:w-1/5 pb-6">
      <h1 className="text-white text-base lg:text-xl mb-2 mt-3 px-4 font-sans flex justify-between">
        <span>{currenChannelTitle} channel</span>
        <img src={bell} className="h-6 w-6" alt="bell icon" />
      </h1>
      <div className="flex items-center mb-6 px-4">
        <span className="bg-green-500 rounded-full block w-2 h-2 mr-2" />
        <span className="text-purple-300">{currentUser.login}</span>
      </div>
      <div>
        <div className="flex justify-between py-3 flex-wrap">
          <div className="px-4 py-1 mb-2 font-sans">Channels</div>
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
          {listOfUsers.reduce((acc, rec) => {
            return rec.login === currentUser.login
              ? rec.subscriptionOnChannels.map((subscribedChannel) =>
                  currenChannelTitle === subscribedChannel ? (
                    <div key={currenChannelTitle} className="bg-green-500 py-1">
                      <div className="hover:text-gray-200">
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
          }, '')}
        </div>
      </div>
      <div className="hidden md:block">
        <div className="px-4 mb-3 font-sans">Users</div>
        <div className="flex items-center mb-3 px-4">
          <span className="bg-green-500 rounded-full block w-2 h-2 mr-2" />
          <span className="text-purple-300">
            {currentUser.login} <i className="text-grey-400 text-sm">(me)</i>
          </span>
        </div>
        {listOfUsers.map((user) => {
          return (
            user.subscriptionOnChannels.indexOf(currenChannelTitle) >= 0 &&
            user.login !== currentUser.login && (
              <div className="flex items-center mb-3 px-4">
                <span className="bg-green-500 rounded-full block w-2 h-2 mr-2" />
                <span className="text-purple-300">{user.login}</span>
              </div>
            )
          )
        })}
      </div>
    </div>
  )
}

Sidebar.propTypes = {}

export default React.memo(Sidebar)
