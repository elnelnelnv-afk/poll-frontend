import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import CreatePoll from './components/CreatePoll'
import RegisterVote from './components/RegisterVote'
import ViewResult from './components/ViewResult'
import "./App.css"

function App() {
  return (
    <div className='App'>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <header className='header'>
          <div className='nav-link left-section'>
            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeH7BEA-4wubHu4xgn6-b0VC4UTSzk9le64g&s"} alt='logo' className='logo' />
            <h1 className='header-title'>Public Poll</h1>
          </div>
          <nav className='nav'>
            <Link to="/">Create Poll</Link>
            <Link to="/register-vote">Register Vote</Link>
            <Link to="/view-result">View Results</Link>
          </nav>
        </header>
        <div className='container'>
          <Routes>
            <Route path="/" element={<CreatePoll/>}/>
            <Route path='/register-vote' element={<RegisterVote/>}/>
            <Route path='/view-result' element={<ViewResult/>}/>
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  )
}

export default App
