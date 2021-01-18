import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addUser, setCurrentUser } from '../redux/reducers/users'

const UserRegistration = () => {
  const listOfUsers = useSelector((s) => s.users.listOfUsers)
  const dispatch = useDispatch()
  const history = useHistory()
  const [userName, setUserName] = useState()
  const [userAlreadyExist, setUserAlreadyExist] = useState(false)

  const onChange = (e) => {
    setUserName(e.target.value)
  }

  const onClickExistingUser = () => {
    dispatch(setCurrentUser(userName))
    history.push('/main')
  }

  const onClick = async () => {
    if (listOfUsers.find((user) => user.userName === userName)) {
      setUserAlreadyExist(true)
    } else {
      const lastUser = listOfUsers[listOfUsers.length - 1]
      const newUserId = lastUser.userId + 1
      const hashtag = `#${userName}`
      await dispatch(addUser(newUserId, userName, hashtag))
      dispatch(setCurrentUser(userName))
      history.push('/main')
      setUserAlreadyExist(false)
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      {/* <!-- Auth Card Container --> */}
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        {/* <!-- Auth Card --> */}
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
            px-6 py-10 sm:px-10 sm:py-6
            bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          {/* <!-- Card Title --> */}
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">Login</h2>

          <form className="mt-10">
            {/* <!-- Login Input --> */}
            <label htmlFor="text" className="block text-xs font-semibold text-gray-600 uppercase">
              Login
            </label>
            {!userAlreadyExist && (
              <input
                type="text"
                placeholder="Type your login"
                className="block w-full py-3 px-1 mt-2
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                value={userName}
                onChange={onChange}
                required
              />
            )}
            {userAlreadyExist && (
              <div>
                <input
                  type="text"
                  placeholder="Type your login"
                  className="block w-full py-3 px-1 mt-2
                    text-gray-800 appearance-none
                    border-b-2 border-red-600
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  value={userName}
                  onChange={onChange}
                  required
                />
                <div className="text-red-500 font-semibold flex justify-center text-lg pt-1">
                  User already exist
                </div>
                <div className="text-gray-700 font-semibold flex justify-center text-3xl pt-1">
                  Is it you?
                </div>
              </div>
            )}
            {/* <!-- Password Input --> */}
            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              autoComplete="current-password"
              className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
              disabled="disabled" // delete after adding Authorization
            />
            {/* <!-- Auth Buttton --> */}
            {!userAlreadyExist && (
              <button
                type="button"
                className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
                onClick={onClick}
              >
                Login
              </button>
            )}
            {userAlreadyExist && (
              <div className="flex justify-around">
                <button
                  type="button"
                  className="w-1/3 py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
                  onClick={() => setUserAlreadyExist(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="w-1/3 py-3 mt-10 bg-gray-800 rounded-sm px-1
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
                  onClick={onClickExistingUser}
                >
                  Yes
                </button>
              </div>
            )}
            {/* <!-- Another Auth Routes --> */}
            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <a href="forgot-password" className="flex-2 underline">
                Forgot password?
              </a>

              <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">or</p>

              <a href="register" className="flex-2 underline">
                Create an Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

UserRegistration.propTypes = {}

export default React.memo(UserRegistration)
