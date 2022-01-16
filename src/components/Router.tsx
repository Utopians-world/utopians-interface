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
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/projects/:owner" element={<Projects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/p/:handle" element={<Dashboard />} />
        <Route path="/congratulation/:handle" element={<Congratulation />} />
        <Route path="/:route" element={<CatchallRedirect />} />
      </Routes>
    </HashRouter>
  )
}
