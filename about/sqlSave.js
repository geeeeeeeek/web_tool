const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// 配置 SQL Server 数据库连接
const config = {
  user: 'your_username',
  password: 'your_password',
  server: 'your_server',
  database: 'your_database',
  options: {
    encrypt: true, // 如果使用 Azure 数据库服务，需要启用加密
  },
};

// 连接到 SQL Server 数据库
sql.connect(config)
  .then(() => console.log('Connected to SQL Server'))
  .catch(err => console.error('Error connecting to SQL Server:', err));

// 定义消息表的 SQL 查询
const createTableQuery = `
  IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Messages')
  BEGIN
      CREATE TABLE Messages (
          Id INT PRIMARY KEY IDENTITY(1,1),
          Sender NVARCHAR(255),
          Message NVARCHAR(1000)
      );
  END
`;

// 创建 Messages 表（如果不存在）
sql.query(createTableQuery)
  .then(() => console.log('Messages table created'))
  .catch(err => console.error('Error creating Messages table:', err));

// 处理保存消息的请求
app.post('/save-message', (req, res) => {
  const { sender, message } = req.body;

  const insertQuery = `
    INSERT INTO Messages (Sender, Message)
    VALUES (@sender, @message);
  `;

  sql.query(insertQuery, {
      sender: sql.NVarChar(255),
      message: sql.NVarChar(1000),
    }, {
      sender,
      message,
    })
    .then(() => res.json({ success: true }))
    .catch(error => res.json({ success: false, error: error.message }));
});

// 处理获取所有消息的请求
app.get('/get-messages', (req, res) => {
  const selectQuery = 'SELECT * FROM Messages';

  sql.query(selectQuery)
    .then(result => res.json(result.recordset))
    .catch(error => res.json({ error: error.message }));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
