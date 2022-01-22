import React from 'react'
import { useSelector } from 'react-redux'

const SocketMessages = ({ messageFromSocket, currentChannelId, altOfAvatar, messagesEndRef }) => {
  const listOfUsers = useSelector((s) => s.users.listOfUsers)

  return (
    <div>
      {listOfUsers?.map((user) => {
        return (
          currentChannelId === messageFromSocket.room &&
          user._id === messageFromSocket.userId && (
            <div key={user._id && messageFromSocket.messageText} className="flex items-start mt-4">
              <img
                src={user.avatar}
                alt={altOfAvatar.find((avatar) => avatar.src === user.avatar)}
                className="avatar"
              />
              <div className="flex flex-col">
                <div className="flex items-end">
                  <span className="nickname">{user.login}</span>
                  <span className="dataMessage">{messageFromSocket.messageTime}</span>
                </div>
                <p className="textMessage">
                  <span ref={messagesEndRef}>{messageFromSocket.messageText}</span>
                </p>
              </div>
            </div>
          )
        )
      })}
    </div>
  )
}

export default React.memo(SocketMessages)
