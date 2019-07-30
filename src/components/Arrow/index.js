import React from 'react';
import './index.scss';

const Arrow = ({ className='', ...rest }) => {
  return (
    <div className={`arrow-img ${className}`} {...rest}></div>
  )
}

export default Arrow;