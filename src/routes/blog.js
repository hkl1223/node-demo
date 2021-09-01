const { SuccessModel } = require("../model/responseModel");
const { ErrorModel } = require("../model/responseModel");
const { getList, getDetail, createNewBlog, updateBlog, deleteBlog } = require("../control/blog");

const handleBlogRoute = (req, res) => {
  const method = req.method;
  const id = req.query.id;
  const blogData = req.body;

  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const listDataPromise = getList(author, keyword);
    return listDataPromise.then((listData) => {
      return new SuccessModel(listData);
    })
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    const detailDataPromise = getDetail(id);
    return detailDataPromise.then((detailData) => {
      return new SuccessModel(detailData);
    })


  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    // const author = 'zhangsan';
    // req.body.author = author;
    const newBlogDataPromise = createNewBlog(blogData);
    return newBlogDataPromise.then((newBlogData) => {
      return new SuccessModel(newBlogData);
    })
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    const updateBlogDataPromise = updateBlog(id, blogData);
    return updateBlogDataPromise.then((updateBlogData) => {
      if (updateBlogData) {
        return new SuccessModel('更新博客成功')
      } else {
        return new ErrorModel('更新博客失败...')
      }
    })
  }

  if (method === 'POST' && req.path === '/api/blog/delete') {
    // const author = 'zhangsan';
    const deleteBlogPromise = deleteBlog(id);
    return deleteBlogPromise.then(deleteBlogData => {
      if (deleteBlogData) {
        return new SuccessModel('删除博客成功')
      } else {
        return new ErrorModel('删除博客失败...')
      }
    })
  }
}

module.exports = handleBlogRoute;