import React, { useState, useEffect, useRef } from 'react';
import Service from '../../service';
import Banner from '../Banner';
import ArticleList from '../ArticleList';
import './index.scss';

const formatNumber = (number) => {
  return number > 9 ? number : `0${number}`
}
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = formatNumber(date.getMonth() + 1);
  const day = formatNumber(date.getDay());
  return `${year}${month}${day}`
}

const goDetail = () => {
  console.log(111);
}

let currentDay = formatDate(new Date());

const Home = () => {
  const [bannerList, setBannerList] = useState([]);
  const [articleList, setArticleList] = useState({});
  useEffect(() => {
    Promise.all([
      Service.articleServer.latest(),
      Service.articleServer.articleBeforeDate(currentDay)
    ]).then(result => {
      const { date, stories, top_stories } = result[0].data;
      const yesterdayData = result[1].data
      setBannerList(top_stories);
      setArticleList([
        { date, stories},
        { 
          date: yesterdayData.date,
          stories: yesterdayData.stories
        }
      ]);
      currentDay--;
    })
  }, []);

  const [loadMore, setLoadMore] = useState(false);
  const appContainer = useRef(null);
  useEffect(() => {
    function scrollTop(e) {
      const {
        scrollTop,  // 滚动高度
        clientHeight, // 可视高度
        scrollHeight  // 容器总高度
      } = e.target;
      if(scrollHeight === scrollTop + clientHeight) {
        setLoadMore(true);
        // 编写一个函数计算上一天的日期
        Service.articleServer.articleBeforeDate(currentDay).then(result => {
          currentDay--;
          const { date, stories } = result.data;
          setLoadMore(false);
          setArticleList(list => {
            return [
              ...list,
              { date, stories }
            ]
          })
        })
      }
    }
    const appDom = appContainer.current;
    appDom.addEventListener('scroll', scrollTop)
    return () => appDom.removeEventListener('scroll', scrollTop)
  },[appContainer])

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