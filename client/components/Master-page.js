import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import MainWindow from './Main-window'
import Channel from './Channel'
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
    <Switch>
      <Route exact path="/main" component={() => <MainWindow />} />
      <Route exact path="/:channel" component={() => <Channel />} />
      <Route exact path="/*" component={() => <NotFound />} />
    </Switch>
  )
}

export default React.memo(MasterPage)
