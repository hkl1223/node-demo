const { execSQL } = require('../database/mysql');

const getList = (author, keyword) => {
  let sql = `SELECT * FROM blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`;
  }

  return execSQL(sql);

}

const getDetail = (id) => {
  const sql = `SELECT * FROM blogs where id='${id}'`;
  return execSQL(sql).then(rows => {
    return rows[0];
  })
}

const createNewBlog = (blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const sql = `
  INSERT INTO blogs (title,content,author)VALUES ('${title}','${content}','${author}');`

  return execSQL(sql).then((insertedResult) => {
    console.log(insertedResult)
    return {
      id: insertedResult.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author
  const sql = `UPDATE blogs SET title='${title}',content='${content}',author='${author}' WHERE id=${id}`;
  return execSQL(sql).then((updateResult) => {
    console.log(updateResult)
    if (updateResult.affectedRows > 0) {
      return true
    }
    return false
  })
}

const deleteBlog = (id) => {
  const sql = `DELETE FROM blogs WHERE id=${id}`;
  return execSQL(sql).then((deleteResult) => {
    console.log(deleteResult)
    if (deleteResult.affectedRows > 0) {
      return true
    }
    return false
  })
}
module.exports = {
  getList,
  getDetail,
  createNewBlog,
  updateBlog,
  deleteBlog
}