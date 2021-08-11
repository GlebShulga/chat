import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addMessage } from '../redux/reducers/messages'
import { getChannel } from '../redux/reducers/channels'
import { trySignIn } from '../redux/reducers/auth'

const Chat = () => {
  const { listOfMessages, listOfMessagesFromSocket } = useSelector((s) => s.messages)
  const listOfUsers = useSelector((s) => s.users.listOfUsers)
  const { listOfChannels, channel } = useSelector((s) => s.channels)
  const currentUser = useSelector((s) => s.auth.user)
  const altOfAvatar = useSelector((s) => s.avatars.listOfAvatars)
  const dispatch = useDispatch()
  const { channel: currenChannelTitle } = useParams()

  const [messageText, setMessageText] = useState()

  function getActualTime() {
    const monthsArr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const time = new Date()
    let hour = time.getUTCHours()
    let minute = time.getUTCMinutes()
    const day = time.getUTCDate()
    const month = monthsArr[time.getUTCMonth()]

    hour = hour < 10 ? `0${hour}` : hour
    minute = minute < 10 ? `0${minute}` : minute

    const data = `${hour}:${minute}, ${day} ${month}`
    return data
  }

  const onChange = (e) => {
    setMessageText(e.target.value)
  }
  const onClickSendMessage = useCallback(() => {
    if (messageText.trim()) {
      const currentUserId = currentUser._id
      const currentChannelId = listOfChannels?.reduce(
        (acc, rec) => (rec.channelTitle === currenChannelTitle ? rec._id : acc),
        ''
      )
      dispatch(addMessage(messageText, currentChannelId, currentUserId, getActualTime()))
      setMessageText('')
    }
  }, [messageText, currentUser._id, listOfChannels, currenChannelTitle])

  const currentChannelId = listOfChannels?.reduce(
    (acc, rec) => (rec.channelTitle === currenChannelTitle ? rec._id : acc),
    ''
  )

  useEffect(() => {
    dispatch(getChannel(currenChannelTitle))
    dispatch(trySignIn(true))
  }, [dispatch, currenChannelTitle])

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      onClickSendMessage()
    }
  }

  return (
    <div className="ml-auto pt-0 z-0 h-full sm:w-2/3 md:w-3/4 w-full lg:w-4/5 xl:w-5/6">
      <div className="w-full flex flex-col my-auto h-full">
        {/* <!-- Top bar --> */}
        <div className="border-b flex md:px-6 py-2 items-center justify-center md:justify-start">
          <div className="flex flex-col grid justify-items-stretch md:justify-start">
            <h3 className="text-gray-800 text-md mb-1 font-extrabold justify-self-center md:justify-self-start">
              # {`${currenChannelTitle}`}
            </h3>
            {channel?.channelDescription ? (
              <div className="text-gray-500 text-sm justify-self-center md:justify-self-start">{`${channel?.channelDescription}`}</div>
            ) : (
              <div className="invisible" />
            )}
          </div>
        </div>
        {/* <!-- Chat messages --> */}
        <div className="px-6 flex-1 scrollbar overflow-scroll-x overflow-y-auto flex-grow flex flex-col">
          <div className="w-5/6 pt-0">
            {listOfMessages?.map((message) => {
              return (
                <div key={message._id}>
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
            })}
            {listOfMessagesFromSocket?.map((messageFromSocket) => {
              return (
                <div key={messageFromSocket.userId && messageFromSocket.messageText}>
                  {listOfUsers?.map((user) => {
                    return (
                      currentChannelId === messageFromSocket.room &&
                      user._id === messageFromSocket.userId && (
                        <div
                          key={user._id && messageFromSocket.messageText}
                          className="flex items-start mt-4"
                        >
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
                              <span>{messageFromSocket.messageText}</span>
                            </p>
                          </div>
                        </div>
                      )
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex m-6 rounded-lg border-2 border-gray-200 w-5/6">
          <label htmlFor="message">
            <button
              type="button"
              id="btn"
              className="text-3xl px-3 border-r-2 border-grey hover:bg-gray-200 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
              onClick={onClickSendMessage}
            >
              +
            </button>
            <input
              id="message"
              type="text"
              className="w-full px-4"
              placeholder={`Message to # ${currenChannelTitle}`}
              value={messageText || ''}
              onChange={onChange}
              onKeyPress={handleKeypress}
            />{' '}
          </label>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Chat)
