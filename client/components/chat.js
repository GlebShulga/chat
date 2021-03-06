import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addMessage } from '../redux/reducers/messages'

const Chat = () => {
  const listOfMessages = useSelector((s) => s.messages.listOfMessages)
  const listOfUsers = useSelector((s) => s.users.listOfUsers)
  const listOfChannels = useSelector((s) => s.channels.listOfChannels)
  const currentUser = useSelector((s) => s.auth.user)
  const altOfAvatar = useSelector((s) => s.avatars.listOfAvatars)
  const dispatch = useDispatch()
  const { channel: currenChannelTitle } = useParams()

  const [messageText, setMessageText] = useState()
  const onChange = (e) => {
    setMessageText(e.target.value)
  }
  const onClickSendMessage = useCallback(() => {
    if (messageText) {
      const currentUserId = currentUser._id
      const currentChannelId = listOfChannels.reduce(
        (acc, rec) => (rec.channelTitle === currenChannelTitle ? rec._id : acc),
        ''
      )
      dispatch(addMessage(messageText, currentChannelId, currentUserId))
      setMessageText('')
    }
  }, [messageText, currentUser._id, listOfChannels, currenChannelTitle])

  const currentChannelId = listOfChannels.reduce(
    (acc, rec) => (rec.channelTitle === currenChannelTitle ? rec._id : acc),
    ''
  )

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      onClickSendMessage()
    }
  }

  return (
    <div className="px-6 py-4 flex-1 overflow-scroll-x">
      {listOfMessages
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((message) => {
          const correctTime = new Date(message.createdAt).toLocaleString()
          return (
            <div key={message._id} className="">
              {listOfUsers.map((user) => {
                return (
                  currentChannelId === message.channelId &&
                  user._id === message.userId && (
                    <div key={message._id} className="flex items-start mb-4">
                      <img
                        src={user.avatar}
                        alt={altOfAvatar.find((avatar) => avatar.src === user.avatar)}
                        className="w-10 h-10 rounded mr-3"
                      />
                      <div className="flex flex-col">
                        <div className="flex items-end">
                          <span className="font-bold text-md mr-2 font-sans">{user.login}</span>
                          <span className="text-grey text-xs font-light">{correctTime}</span>
                        </div>
                        <p className="font-light text-md text-grey-darkest pt-1">
                          <span>{message.messageText}</span>
                        </p>
                      </div>
                    </div>
                  )
                )
              })}
            </div>
          )
        })}
      <div className="flex m-6 rounded-lg border-2 border-gray-200 overflow-hidden absolute inset-x-0 bottom-0 w-5/6 z-0">
        <button
          type="button"
          id="btn"
          className="text-3xl px-3 border-r-2 border-grey hover:bg-gray-200 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
          onClick={onClickSendMessage}
        >
          +
        </button>
        <input
          type="text"
          className="w-full px-4"
          placeholder={`Message to # ${currenChannelTitle}`}
          value={messageText || ''}
          onChange={onChange}
          onKeyPress={handleKeypress}
        />
      </div>
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
