const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })
    req.on('end', () => {
      console.log(postData)
      res.end('数据接受完毕')
    })
    console.log(req.headers['content-types']);
  }
});

server.listen(5000, () => {
  console.log('服务器启动成功')
})

