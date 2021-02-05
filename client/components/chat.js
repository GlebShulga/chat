import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addMessage } from '../redux/reducers/messages'

const Chat = () => {
  const listOfMessages = useSelector((s) => s.messages.listOfMessages)
  const listOfUsers = useSelector((s) => s.users.listOfUsers)
  const listOfChannels = useSelector((s) => s.channels.listOfChannels)
  const currentUser = useSelector((s) => s.auth.user)
  const dispatch = useDispatch()
  const { channel: currenChannelTitle } = useParams()

  const [messageText, setMessageText] = useState()
  const onChange = (e) => {
    setMessageText(e.target.value)
  }
  const onClick = () => {
    const currentUserId = currentUser._id
    const currentChannelId = listOfChannels.reduce(
      (acc, rec) => (rec.channelTitle === currenChannelTitle ? rec._id : acc),
      ''
    )
    dispatch(addMessage(messageText, currentChannelId, currentUserId))
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      onClick()
    }
  }

  return (
    <div>
      {listOfUsers.map((user) => {
        return (
          <div key={user._id} className="px-6 py-4 flex-1 overflow-scroll-x">
            {listOfMessages
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((message) => {
                const correctTime = new Date(message.createdAt).toLocaleString()
                const currentChannelId = listOfChannels.reduce(
                  (acc, rec) => (rec.channelTitle === currenChannelTitle ? rec._id : acc),
                  ''
                )
                return (
                  currentChannelId === message.channelId &&
                  user._id === message.userId && (
                    <div className="flex items-start mb-4">
                      <img
                        src="https://i.imgur.com/qACoKgY.jpg"
                        alt="men"
                        className="w-10 h-10 rounded mr-3"
                      />
                      <div key={message._id} className="flex flex-col">
                        <div className="flex items-end">
                          <span className="font-bold text-md mr-2 font-sans">{user.login}</span>
                          <span className="text-grey text-xs font-light">{correctTime}</span>
                        </div>
                        <p className="font-light text-md text-grey-darkest pt-1">
                          <div>{message.messageText}</div>
                        </p>
                      </div>
                    </div>
                  )
                )
              })}
          </div>
        )
      })}
      <div className="flex m-6 rounded-lg border-2 border-gray-200 overflow-hidden absolute inset-x-0 bottom-0 w-5/6">
        <button
          type="button"
          id="btn"
          className="text-3xl px-3 border-r-2 border-grey hover:bg-gray-200 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
          onClick={onClick}
        >
          +
        </button>
        <input
          type="text"
          className="w-full px-4"
          placeholder={`Message to # ${currenChannelTitle}`}
          value={messageText}
          onChange={onChange}
          onKeyPress={handleKeypress}
        />
      </div>
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
