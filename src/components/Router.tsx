import Dashboard from 'components/Dashboard'
// import Landing from 'components/Landing'
import Home from 'components/Home'
import { HashRouter, Route, Routes } from 'react-router-dom'

import CatchallRedirect from './CatchallRedirect'
import Create from './Create'
import Congratulation from './Create/Congratulation'
import Projects from './Projects'
import Faq from './Faq'

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
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
      </Routes>
    </HashRouter>
  )
}
