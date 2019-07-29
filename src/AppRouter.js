import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './containers/Home';


// React.lazy 和 Suspense 技术还不支持服务端渲染
// lazy: 懒加载
// const Home = lazy(() => import('./containers/Home'));
const ArticleDetail = lazy(() => import('./containers/ArticleDetail'));

// Suspense: 
// 如果在父组件渲染完成后，子组件（懒加载）的模块还没有被加载完成，我们可以使用 Suspense 加载指示器为此组件做优雅降级。

const AppRouter = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
        <Route
          path='/'
          render={props => {
            let style = { display: 'block' };
            if(props.location.pathname !== '/') {
              style.display = 'none'
            }
            return <Home style={style}/>
          }}
        />
        <Route path='/article/:id' component={ArticleDetail} />
    </Suspense>
  </Router>
);

export default AppRouter;
