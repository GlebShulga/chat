import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Messages from './Messages'
import SocketMessages from './SocketMessages'
import { addMessage } from '../../redux/reducers/messages'
import { getChannel } from '../../redux/reducers/channels'
import { trySignIn } from '../../redux/reducers/auth'
import { getActualTime } from '../helpers'
import sendIcon from '../../assets/images/sendIcon.svg'

const Chat = () => {
  const { listOfMessages, listOfMessagesFromSocket } = useSelector((s) => s.messages)
  const { listOfChannels, channel } = useSelector((s) => s.channels)
  const currentUser = useSelector((s) => s.auth.user)
  const altOfAvatar = useSelector((s) => s.avatars.listOfAvatars)
  const dispatch = useDispatch()
  const { channel: currenChannelTitle } = useParams()

  const [messageText, setMessageText] = useState()

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const onChange = (e) => {
    setMessageText(e.target.value)
  }
  const onClickSendMessage = useCallback(() => {
    if (messageText?.trim()) {
      const currentUserId = currentUser._id
      const currentChannelId = listOfChannels?.reduce(
        (acc, rec) => (rec.channelTitle === currenChannelTitle ? rec._id : acc),
        ''
      )
      dispatch(addMessage(messageText, currentChannelId, currentUserId, getActualTime()))
      setMessageText('')
      scrollToBottom()
    }
  }, [messageText, currentUser._id, listOfChannels, currenChannelTitle])

  const currentChannelId = listOfChannels?.find(
    (chan) => chan.channelTitle === currenChannelTitle
  )?._id

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
                  <Messages
                    message={message}
                    currentChannelId={currentChannelId}
                    altOfAvatar={altOfAvatar}
                  />
                </div>
              )
            })}
            {listOfMessagesFromSocket?.map((messageFromSocket) => {
              return (
                <div key={messageFromSocket.userId && messageFromSocket.messageText}>
                  <SocketMessages
                    messageFromSocket={messageFromSocket}
                    currentChannelId={currentChannelId}
                    altOfAvatar={altOfAvatar}
                    messagesEndRef={messagesEndRef}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex m-6 rounded-lg border-2 border-gray-200 w-5/6">
          <input
            id="message"
            type="text"
            className="w-full px-4 py-auto"
            placeholder={`Message to # ${currenChannelTitle}`}
            value={messageText || ''}
            onChange={onChange}
            onKeyPress={handleKeypress}
          />
          <button
            type="button"
            id="btn"
            className="text-3xl px-3 border-r-2 border-grey hover:bg-gray-200 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
            onClick={onClickSendMessage}
          >
            <img src={sendIcon} className="h-5 w-5" alt="Send message icon" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Chat)
