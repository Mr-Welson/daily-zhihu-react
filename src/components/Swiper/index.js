import React, { useState, useEffect } from 'react';
import './index.scss'
;

let timer;
const Swiper = ({
  className='', list, time=3000, current=0, children, ...rest
}) => {
  const [active, setActive] = useState(current);
  const [timerId, setTimerId] = useState();
  const length = list.length;
  useEffect(() => {
    timer = setInterval(() => {
      setActive(c => (c + 1) % length)
    }, time);
    return () => clearTimeout(timer)
  }, [time, length, timerId]);
  return (
    <div className={'swiper-container ' + className} {...rest}>
      <div className='swiper-content'>
        {list.map((v,k) => {
          return (
            <div key={k}
              className={`swiper-slide ${active === k ? 'swiper-slide-active': ''}`}
            >
              {children({item: v})}
            </div>
          )
        })}
      </div>
      <div className='swiper-pagination'>
        {Array.from({length}).map((v, k) => {
          return (
            <span 
              key={k}
              className={`
                swiper-pagination-dot 
                ${active === k ? 'swiper-pagination-dot-active': ''}
              `}
              onClick={(e) => {
                e.stopPropagation();
                clearTimeout(timer)
                setTimerId(Math.random());
                setActive(k)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Swiper;