/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateLoginField, updatePasswordField, singIn } from '../redux/reducers/auth'

const UserAuth = () => {
  const error = useSelector((s) => s.auth.error)
  const login = useSelector((s) => s.auth.login)
  const password = useSelector((s) => s.auth.password)
  const dispatch = useDispatch()
  // const [userDataIncorrect, setUserDataIncorrect] = useState(false)

  const onChangeLogin = (e) => {
    dispatch(updateLoginField(e.target.value))
  }

  const onChangePassword = (e) => {
    dispatch(updatePasswordField(e.target.value))
  }

  const onClick = () => {
    dispatch(singIn())
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
            {error && (
              <div>
                <div className="text-red-500 font-semibold flex justify-center text-lg pt-1">
                  Login or password is not correct
                </div>
              </div>
            )}
            {/* <!-- Auth Buttton --> */}
            <button
              type="button"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
              onClick={onClick}
            >
              Login
            </button>
            {/* <!-- Another Auth Routes --> */}
            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm flex justify-center">
              <Link to="/registration" className="flex-2 underline">
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default React.memo(UserAuth)
