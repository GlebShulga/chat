import React from 'react'
import { useSelector } from 'react-redux'

const Messages = ({ message, currentChannelId, altOfAvatar }) => {
  const listOfUsers = useSelector((s) => s.users.listOfUsers)

  return (
    <div>
      {listOfUsers?.map((user) => {
        return (
          currentChannelId === message.channelId &&
          user._id === message.userId && (
            <div key={user._id && message._id} className="flex items-start mt-4">
              <img
                src={user.avatar}
                alt={altOfAvatar.find((avatar) => avatar.src === user.avatar)}
                className="avatar"
              />
              <div className="flex flex-col">
                <div className="flex items-end">
                  <span className="nickname">{user.login}</span>
                  <span className="dataMessage">{message.messageTime}</span>
                </div>
                <p className="textMessage">
                  <span>{message.messageText}</span>
                </p>
              </div>
            </div>
          )
        )
      })}
    </div>
  )
}

export default React.memo(Messages)
