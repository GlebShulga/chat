import React from 'react'
import { useSelector } from 'react-redux'

const Users = ({ user }) => {
  const onlineUsers = useSelector((s) => s.channels.onlineUsers)

  return (
    <>
      <span
        className={
          onlineUsers.includes(user.login)
            ? 'bg-green-500 userStatusDot'
            : 'bg-gray-500 userStatusDot'
        }
      />
      <span className="text-purple-300">{user.login}</span>
    </>
  )
}

export default React.memo(Users)
