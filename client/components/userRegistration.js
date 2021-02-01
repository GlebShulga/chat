// /* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addUser } from '../redux/reducers/users'

const UserRegistration = () => {
  const listOfUsers = useSelector((s) => s.users.listOfUsers)
  const dispatch = useDispatch()
  const [login, setLogin] = useState()
  const [password, setPassword] = useState()
  // const [userAlreadyExist, setUserAlreadyExist] = useState(false)

  const onChangeLogin = (e) => {
    setLogin(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  // const onChangeLogin = (e) => {
  //   dispatch(updateLoginField(e.target.value))
  // }

  // const onChangePassword = (e) => {
  //   dispatch(updatePasswordField(e.target.value))
  // }

  // const onClickExistingUser = () => {
  //   dispatch(setCurrentUser(userName))
  //   history.push('/main')
  // }

  const onClick = () => {
    // if (listOfUsers.find((user) => user.userName === userName)) {
    //   setUserAlreadyExist(true)
    // } else {
    const lastUser = listOfUsers[listOfUsers.length - 1]
    const newUserId = lastUser.userId + 1
    const hashtag = `#${login}`
    dispatch(addUser(newUserId, login, password, hashtag))
    // setUserAlreadyExist(false)
    // }
  }

  // const onClick = () => {
  //   dispatch(singIn())
  // }

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
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Registration
          </h2>

          <form className="mt-10">
            {/* <!-- Login Input --> */}
            <label htmlFor="text" className="block text-xs font-semibold text-gray-600 uppercase">
              Login
            </label>
            {/* {!userAlreadyExist && ( */}
            <input
              type="text"
              placeholder="Type your login"
              className="block w-full py-3 px-1 mt-2
                    text-gray-800 appearance-none
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              value={login}
              onChange={onChangeLogin}
              required
            />
            {/* )}
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
                  // onChange={onChange}
                  required
                />
                <div className="text-red-500 font-semibold flex justify-center text-lg pt-1">
                  User already exist
                </div>
                <div className="text-gray-700 font-semibold flex justify-center text-3xl pt-1">
                  Choose another name
                </div>
              </div>
            )} */}
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
              value={password}
              onChange={onChangePassword}
            />
            {/* <!-- Auth Buttton --> */}
            {/* {!userAlreadyExist && ( */}
            <button
              type="button"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
              onClick={onClick}
            >
              Registration
            </button>
            {/* // )} */}
            {/* {userAlreadyExist && (
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
            )} */}
            {/* <!-- Another Auth Routes --> */}
            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm justify-center">
              <Link to="/login" className="flex-2 underline">
                Back to the login page
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

UserRegistration.propTypes = {}

export default React.memo(UserRegistration)
