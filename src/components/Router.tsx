import Dashboard from 'components/Dashboard'
// import Landing from 'components/Landing'
import Home from 'components/Home'
import { HashRouter, Route, Switch } from 'react-router-dom'

import { Modal as RouterModal } from 'antd'

import CatchallRedirect from './CatchallRedirect'
import Create from './Create'
import Congratulation from './Create/Congratulation'
import Projects from './Projects'
import Faq from './Faq'
const { confirm } = RouterModal
export default function Router() {
  return (
    <HashRouter
      getUserConfirmation={(result, callback) => {
        confirm({
          className: 'continueModal',
          title: <div className="continueModalTitle">Confirm</div>,
          content: <div className="continueModalDes">{result}</div>,
          okText: 'continue',
          onOk: () => callback(true),
          onCancel: () => callback(false),
        })
      }}
    >
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/projects/:owner">
          <Projects />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/faq">
          <Faq />
        </Route>
        <Route path="/p/:handle">
          <Dashboard />
        </Route>
        <Route path="/congratulation/:handle">
          <Congratulation />
        </Route>
        <Route path="/:route">
          <CatchallRedirect />
        </Route>
      </Switch>
    </HashRouter>
  )
}
