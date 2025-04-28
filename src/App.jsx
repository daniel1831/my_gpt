import React, { useState } from 'react';
import './App.css'
import Main from './component/Main'
import Sidebar from './component/Sidebar'

function App() {

  const [expanded, setExpanded] = useState(false);
  const[value, setValue] = useState("")
  const[message, setMessage] = useState(null)
  const[prechat, setPrechat] = useState([])
  const[title, setTitle] = useState(null)


  const toggleSidebar = () => setExpanded(prev => !prev);

  const createNewChat = () =>{
    setMessage(null)
    setValue("")
    setTitle(null)
  }

  const handleClick = (sidetitle) => {
    setTitle(sidetitle)
    setMessage(null)
    setValue("")
  }

  const sidetitle = Array.from(new Set (prechat.map(prechat => prechat.title)))

  return (
    <div className="layout">
      <Sidebar expanded={expanded} 
               toggleSidebar={toggleSidebar}
               createNewChat={createNewChat}
               sidetitle={sidetitle}
               handleClick={handleClick} />
      <Main 
        value={value}
        setValue={setValue}
        message={message}
        setMessage={setMessage}
        title={title}
        setTitle={setTitle}
        prechat={prechat}
        setPrechat={setPrechat}
        />
    </div>
  )
}

export default App
