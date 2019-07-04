import axios from 'axios';
import apiZhuHu from './api/article';

class articleServer {
  latest() {
    return axios.get(apiZhuHu.latest)
  }

  // YYYYMMDD
  articleBeforeDate(date) {
    return axios.get(apiZhuHu.article.replace('<date>', date))

  }

  // 
  articleDetail(id) {
    return axios.get(apiZhuHu.articleDetail.replace('<id>', id))
  }
}

export default new articleServer();



