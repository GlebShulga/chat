import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addMessage, getMessages } from '../redux/reducers/messages'
import { getUsers } from '../redux/reducers/users'

const Chat = () => {
  const listOfMessages = useSelector((s) => s.messages.listOfMessages)
  const listOfUsers = useSelector((s) => s.users.listOfUsers)
  const dispatch = useDispatch()
  const { channel: currenChannelTitle } = useParams()

  useEffect(() => {
    dispatch(getMessages())
    dispatch(getUsers())
  }, [currenChannelTitle, dispatch])

  const [messageText, setMessageText] = useState()
  const onChange = (e) => {
    setMessageText(e.target.value)
  }
  const onClick = () => {
    dispatch(addMessage(messageText))
  }
  return (
    <div>
      {listOfUsers.map((user) => {
        return (
          <div key={user.userId} className="px-6 py-4 flex-1 overflow-scroll-x">
            {listOfMessages.map((message) => {
              return (
                user.userId === message.userId && (
                  <div className="flex items-start mb-4">
                    <img
                      src="https://i.imgur.com/qACoKgY.jpg"
                      alt="men"
                      className="w-10 h-10 rounded mr-3"
                    />
                    <div key={message.messageId} className="flex flex-col">
                      <div className="flex items-end">
                        <span className="font-bold text-md mr-2 font-sans">{user.userName}</span>
                        <span className="text-grey text-xs font-light">{message.createdAt}</span>
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

      <div className="flex m-6 rounded-lg border-2 border-grey overflow-hidden">
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
        />
      </div>
    </div>
  )
}

Chat.propTypes = {}

export default React.memo(Chat)
