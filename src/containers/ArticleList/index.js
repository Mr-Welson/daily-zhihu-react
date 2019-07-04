import React from 'react';

import './index.scss';

const ArticleList = ({data, goDetail}) => {
  console.log(data, 333);
  return (
    <div className='article-list-container'> 
      {data.map(v => {
        return (
          <div key={v.date} className='list-content'>
            <div className="list-date">
              {v.date.substr(0,4)
                + '/'
                + v.date.substr(4,2)
                + '/'
                + v.date.substr(6,2)
              }
            </div>
            <div className="article-list">
              {v.stories && v.stories.map(article => (
                <div
                  className='article'
                  key={article.id}
                  onClick={goDetail}
                >
                  <img src={article.images[0]} alt=""/>
                  <div className='article-info'>
                    {article.title}
                  </div>
                </div>  
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ArticleList;