import React, { useState, useEffect, useRef } from "react";
import { formatDate, getLastDate } from "../../utils";
import Service from "../../service";
import Banner from "../Banner";
import ArticleList from "../ArticleList";
import svgNoData from "../../assets/images/nodata.svg";
import Arrow from "../../components/Arrow";
import Loading from "../../components/Loading";

import "./index.scss";

let lastDate = formatDate(new Date());

const Home = ({ style }) => {
  const [loading, setLoading] = useState(true);
  const [bannerList, setBannerList] = useState([]);
  const [articleList, setArticleList] = useState({});
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    Service.article
      .latest()
      .then(result => {
        const { date, stories, top_stories } = result.data;
        setLoading(false);
        setBannerList(top_stories);
        setArticleList([{ date, stories }]);
      })
      .then(() => {
        getArticleList();
      });
  }, []);

  function getArticleList() {
    setLoadMore(true);
    const option = lastDate.split("/").join("");
    return Service.article
      .articleBeforeDate(option)
      .then(result => {
        lastDate = formatDate(getLastDate(lastDate));
        const { date, stories } = result.data;
        setLoadMore(false);
        setArticleList(list => {
          return [...list, { date, stories }];
        });
      })
      .catch(err => {
        setLoadMore(false);
        console.log(err);
      });
  }

  const appContainer = useRef(null);
  useEffect(() => {
    let timer; // 防抖
    let loadingData = false; //
    let beforeScrollTop = 0; // 标记滚动方向
    function handleScroll(e) {
      const {
        scrollTop, // 滚动高度
        clientHeight, // 可视高度
        scrollHeight // 容器总高度
      } = e.target;
      if (
        !loadingData &&
        scrollTop > beforeScrollTop &&
        scrollHeight <= scrollTop + clientHeight + 100 * 3
      ) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          beforeScrollTop = scrollTop;
          loadingData = true;
          // console.time();
          getArticleList().then(() => {
            // console.timeEnd();
            loadingData = false;
          });
        }, 0);
      }
    }
    const dom = appContainer.current;
    dom.addEventListener("scroll", handleScroll);
    return () => dom.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-container" ref={appContainer} style={style}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Banner data={bannerList} />
          {!!articleList.length ? (
            <ArticleList data={articleList} />
          ) : (
            <div className="no-data">
              <img src={svgNoData} alt="" />
              <p>暂无数据</p>
            </div>
          )}
          <div
            className="loadmore-wrapper"
            style={{ display: loadMore ? "block" : "none" }}
          >
            <div className="loadmore-container">
              <Arrow />
              <span>下滑查看更多</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
