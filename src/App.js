import React, { useRef, useEffect } from 'react'

import AppCanvas from './Canvas'
import Controls from './Controls';

function App () {
  return (
    <div className='App' style={{position: 'relative'}}>
      <AppCanvas />
      <Controls />
    </div>
  )
}

export default App