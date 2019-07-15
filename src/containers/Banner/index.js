import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from '../../components/Swiper';
import ImgMask from '../../components/Mask';

import './index.scss';

const BannerList = ({ data }) => {
  return (
    <Swiper list={data} className='banner-container'>
      {({item}) => (
        <Link to={`/article/${item.id}`}>
          <div className='banner-item'>
            <img src={item.image} alt=""/>
            <span className='item-title'>{item.title}</span>
            <ImgMask />
          </div>
        </Link>
      )}
    </Swiper>
  )
}

export default BannerList;