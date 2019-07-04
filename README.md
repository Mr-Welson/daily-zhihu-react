## 知乎日报-React版

> 使用最新的 `react-hooks` 拿来练手，后续使用 ts 重写一波

## API

1. 启动界面图像获取

   - URL: `http://news-at.zhihu.com/api/4/start-image/1080*1776`
   - `tart-image` 后为图像分辨率，接受如下格式: 
   - `320*432`
   - `480*728`
   - `720*1184`
   - `1080*1776`
   - 

2. 最新消息

   - URL: `http://news-at.zhihu.com/api/4/news/latest`
   - 响应实例

   ```
    {
    		date: "20140523",
       stories: [
           {
               title: "新闻标题",
               ga_prefix: "052321",
               images: [
                   "http://p1.zhimg.com/45/b9/45b9f057fc1957ed2c946814342c0f02.jpg"
               ],
               type: 0,
               id: 3930445
           },
       ...
       ],
       top_stories: [
           {
               title: "商场和很多人家里，竹制家具越来越多（多图）",
               image: "http://p2.zhimg.com/9a/15/9a1570bb9e5fa53ae9fb9269a56ee019.jpg",
               ga_prefix: "052315",
               type: 0,
               id: 3930883
           },
       ...
       ]
   	}
   	
   	ga_prefix : 供 Google Analytics 使用
   	images: 图像地址（官方 API 使用数组形式。目前暂未有使用多张图片的情形出现，曾见无 images 属性的情况，请在使用中注意 ）
   	type : 作用未知
   	id : url 与 share_url 中最后的数字（应为内容的 id）
   	multipic : 消息是否包含多张图片（仅出现在包含多图的新闻中）
   ```

3. 消息内容获取与离线下载

   - URL: `http://news-at.zhihu.com/api/4/news/3892357`

4. 新闻额外信息

   - URL: `http://news-at.zhihu.com/api/4/story-extra/#{id}`
   - 输入新闻的ID，获取对应新闻的额外信息，如评论数量，所获的『赞』的数量。
   - 实例

   ```
   {
       "long_comments": 0,
       "popularity": 161,
       "short_comments": 19,
       "comments": 19,
   }
   
   long_comments : 长评论总数
   popularity : 点赞总数
   short_comments : 短评论总数
   comments : 评论总数
   ```

   

   





## 页面
### 文章列表页

1. banner
2. 每日日报

### 文章详情页



