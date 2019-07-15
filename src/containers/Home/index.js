import React, { useState, useEffect, useRef } from 'react';
import Service from '../../service';
import { formatDate } from '../../utils';
import Banner from '../Banner';
import ArticleList from '../ArticleList';
import './index.scss';

const goDetail = () => {
  console.log(111);

}

const getYesterdayDate = (date) => {
  const dateObj = new Date(new Date(date)*1 - 24 * 3600 * 1000);
  return dateObj;
}

let lastDate = formatDate(new Date());

const Home = () => {
  const [bannerList, setBannerList] = useState([]);
  const [articleList, setArticleList] = useState({});
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    Service.article.latest().then(result => {
      const { date, stories, top_stories } = result.data;
      setBannerList(top_stories);
      setArticleList([{ date, stories }]);
    }).then(() => {
      getArticleList()
    })
  }, []);

  function getArticleList() {
    setLoadMore(true);
    const option = lastDate.split('/').join('');
    return Service.article.articleBeforeDate(option).then(result => {
      lastDate = formatDate(getYesterdayDate(lastDate))
      const { date, stories } = result.data;
      setLoadMore(false);
      setArticleList(list => {
        return [
          ...list,
          { date, stories }
        ]
      })
    }).catch(err => {
      setLoadMore(false);
      console.log(err);
    })
  }

  const appContainer = useRef(null);
  useEffect(() => {
    let timer; // 防抖
    let loadingData=false; // 
    let beforeScrollTop = 0; // 标记滚动方向
    function handleScroll(e) {
      const {
        scrollTop,  // 滚动高度
        clientHeight, // 可视高度
        scrollHeight  // 容器总高度
      } = e.target;
      if(!loadingData && scrollTop > beforeScrollTop && scrollHeight >= scrollTop + clientHeight + 100 * 3) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          beforeScrollTop = scrollTop;
          loadingData = true;
          console.time();
          getArticleList().then(() => {
            console.timeEnd();
            loadingData = false;
          })
        }, 0);
      }
    }
    const dom = appContainer.current;
    dom.addEventListener('scroll', handleScroll)
    return () => dom.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='app-container' ref={appContainer}> 
      <Banner data={bannerList} goDetail={goDetail} />
      {articleList.length && (
        <ArticleList data={articleList} goDetail={goDetail} /> 
      )}
      {loadMore && (
        '加载更多...'
      )}
    </div>
  )
}

export default Home;