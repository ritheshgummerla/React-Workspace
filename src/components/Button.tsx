/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactNode } from 'react'
type Props = {
    clickHandler: any
    children:ReactNode
  }
const Button: FC<Props> = (props) =>  {
    console.log(props.children,'Button');
    
  return (
    <h4><button onClick={props.clickHandler}>{props.children}</button></h4>
  )
}

export default Button