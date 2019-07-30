import React, { useState, useEffect } from 'react';
import Service from '../../service';
import ImgMask from '../../components/Mask';
import Loading from '../../components/Loading';
import Arrow from '../../components/Arrow';
import './index.scss';

function goBack() {
  window.history.back();
}

const ArticleDetail = (props) => {
  const id = props.match.params.id;
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [headData, setHeadData] = useState({});
  useEffect(() => {
    const styleLink = document.getElementById('detail-style');
    const storageKey = `zhihu_${id}`
    const storageData = JSON.parse(localStorage.getItem(storageKey));
    setLoading(true);
    if(storageData) {
      handleResult(storageData)
    } else {
      Service.article.articleDetail(id).then(result => {
        localStorage.setItem(storageKey, JSON.stringify(result.data))
        handleResult(result.data)
      })
    }
    function handleResult(result) {
      const { body, css, title, image_source, image } = result;
      styleLink.href = css[0];
      setHeadData({
        title,
        image_source,
        image,
      })
      setContent(body);
      setLoading(false);
    }
    return () => styleLink.href = ''
  }, [id]);
  if(loading) {
    return <Loading loading={loading} />
  }
  return (
    <div className='detail-container'>
      <div className='go-back-container'>
        <Arrow className='go-back' onClick={goBack}/>
      </div>
      <div className='detail-header'>
        <h1 className='detail-title'>
          {headData.title}
        </h1>
        <span className='img-source'>
          图片：{headData.image_source}
        </span>
        <img src={headData.image} alt=""/>
        <ImgMask />
      </div>
      <div className='detail-content'
        dangerouslySetInnerHTML={{__html: content}}
      />
    </div>
  )
}

export default ArticleDetail;