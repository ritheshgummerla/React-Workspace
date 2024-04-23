/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'

function Title() {
    console.log('title');
  return (
    <h3>Title</h3>
  )
}

export default React.memo(Title)