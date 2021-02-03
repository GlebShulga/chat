import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import MainWindow from './main-window'
// import UserRegistration from './userRegistration'
// import UserAuth from './userAuth'
import Channel from './channel'
import NotFound from './404'
import { getMessages } from '../redux/reducers/messages'
import { getUsers } from '../redux/reducers/users'
import { getChannelsList } from '../redux/reducers/channels'

const MasterPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMessages())
    dispatch(getUsers())
    dispatch(getChannelsList())
  }, [])

  return (
    <div>
      <Switch>
        {/* <Route exact path="/" component={() => <UserAuth />} />
        <Route exact path="/login" component={() => <UserAuth />} />
        <Route exact path="/registration" component={() => <UserRegistration />} /> */}
        <Route exact path="/main" component={() => <MainWindow />} />
        <Route exact path="/channel/:channel" component={() => <Channel />} />
        <Route exact path="/*" component={() => <NotFound />} />
      </Switch>
    </div>
  )
}

MasterPage.propTypes = {}

export default React.memo(MasterPage)
