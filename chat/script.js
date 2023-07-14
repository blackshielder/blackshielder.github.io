const API_URL = 'https://api.staticman.net/v3/entry/github/liuzheyi666/liuzheyi666.github.io/master/comments';

// 获取留言表单和留言列表元素
const messageForm = document.getElementById('message-form');
const messageList = document.getElementById('message-list');

// 监听表单提交事件
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // 获取姓名和留言内容
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  // 发送 POST 请求保存留言
  axios.post(API_URL, {
    fields: {
      name: name,
      message: message
    }
  }).then((response) => {
    // 清空表单
    messageForm.reset();
    // 重新加载留言列表
    loadMessages();
  }).catch((error) => {
    console.error('保存留言时出错：', error);
  });
});

// 加载留言列表
function loadMessages() {
  // 发送 GET 请求获取留言列表
  axios.get(API_URL)
    .then((response) => {
      // 清空留言列表
      messageList.innerHTML = '';

      // 遍历每条留言并添加到留言列表中
      const comments = response.data;
      comments.forEach((comment) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${comment.name}：</strong>${comment.message}`;
        messageList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error('加载留言列表时出错：', error);
    });
}

// 初始化页面时加载留言列表
loadMessages();
