import { api } from '../config';

const apiZhuHu = {
  startimage: `${api}/4/start-image/1080*1776`,
	latest: `${api}/4/news/latest`, // top数据 和 当天的文章列表 
	article: `${api}/4/news/before/<date>`, // 指定日期前一天的文章列表
	articleDetail: `${api}/4/news/<id>`, // 文章详情
	newsinfo: `${api}/4/story-extra`,
	// topics: '/4/themes',
	// topicbyid: '/4/theme/',
	// sections: '/3/sections',
	// sectionbyid: '/3/section',
}

export default apiZhuHu;
