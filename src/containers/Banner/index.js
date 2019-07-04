import React from 'react';
import Swiper from '../../components/Swiper';

import './index.scss';

const BannerList = ({ data, goDetail }) => {
  return (
    <Swiper list={data} className='banner-container'>
      {(props) => (
        <ListItem
          {...props}
          goDetail={goDetail}
        />
      )}
    </Swiper>
  )
}

const ListItem = ({ item, goDetail }) => (
  <div
    className='banner-item'
    onClick={() => goDetail(item.id)}
  >
    <img src={item.image} alt=""/>
    <span className='item-title'>{item.title}</span>
  </div>
)

export default BannerList;