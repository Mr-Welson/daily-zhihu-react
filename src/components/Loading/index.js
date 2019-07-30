import React from 'react';
import './index.scss';

const Loading = ({loading=true, ...rest}) => {
  return (
    <div className='loading' {...rest} style={{display: loading ? 'flex' : 'none'}}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Loading;