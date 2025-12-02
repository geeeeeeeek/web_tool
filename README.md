# 在线网址导航 - Web Tool

[English Doc](./Readme-en.md)

基于 HTML + CSS + JavaScript 开发的在线网址导航工具，界面简洁美观，支持网址收录提交，适合个人或团队使用。

## 项目特点

- 纯静态 HTML 页面，无需后端支持
- 响应式设计，支持移动端访问
- 支持日间/夜间模式切换
- 分类清晰，支持快速搜索
- 网址提交功能，方便收录管理
- 部署简单，支持多种部署方式

## 在线预览

- GitHub Pages: https://geeeeeeeek.github.io/web_tool/
- Vercel: https://web-tool-omega.vercel.app/
- Cloudflare Pages: https://web-a55.pages.dev/

## 快速开始

### 本地预览

1. 克隆项目到本地
```bash
git clone https://github.com/geeeeeeeek/web_tool.git
cd web_tool
```

2. 使用任意 HTTP 服务器运行
```bash
# 使用 Python 3
python -m http.server 8000

# 使用 Node.js (需要先安装 http-server)
npx http-server -p 8000

# 或者直接用浏览器打开 index.html
```

3. 在浏览器中访问 `http://localhost:8000`

## 部署指南

### 方式一：Nginx 部署

#### 1. 准备工作

确保服务器已安装 Nginx：

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

#### 2. 上传文件

将项目文件上传到服务器：

```bash
# 创建网站目录
sudo mkdir -p /var/www/web_tool

# 上传文件（本地执行）
scp -r ./* user@your-server:/var/www/web_tool/

# 或者在服务器上使用 git clone
cd /var/www
sudo git clone https://github.com/geeeeeeeek/web_tool.git
```

#### 3. 配置 Nginx

创建 Nginx 配置文件：

```bash
sudo vim /etc/nginx/sites-available/web_tool
```

添加以下配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 修改为你的域名或服务器 IP

    root /var/www/web_tool;
    index index.html;

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # 404 页面
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
}
```

#### 4. 启用站点并重启 Nginx

```bash
# 创建软链接启用站点
sudo ln -s /etc/nginx/sites-available/web_tool /etc/nginx/sites-enabled/

# 测试配置文件
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx

# 设置开机自启
sudo systemctl enable nginx
```

#### 5. 配置 HTTPS (可选但推荐)

使用 Let's Encrypt 免费证书：

```bash
# 安装 certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书并自动配置 Nginx
sudo certbot --nginx -d your-domain.com

# 设置自动续期
sudo certbot renew --dry-run
```

### 方式二：Vercel 部署 (推荐)

Vercel 提供免费的静态网站托管服务，部署简单快速。

#### 方法 1: 通过 Vercel Dashboard (最简单)

1. 访问 [Vercel 官网](https://vercel.com) 并注册/登录

2. 点击 "Add New Project"

3. 导入你的 GitHub 仓库
   - 选择 "Import Git Repository"
   - 授权 GitHub 并选择 `web_tool` 仓库

4. 配置项目
   - Framework Preset: 选择 "Other"
   - Root Directory: `./` (保持默认)
   - Build Command: 留空
   - Output Directory: `./` (保持默认)

5. 点击 "Deploy" 按钮，等待部署完成

6. 部署成功后会自动分配一个域名，如：`your-project.vercel.app`

#### 方法 2: 通过 Vercel CLI

1. 安装 Vercel CLI

```bash
npm install -g vercel
```

2. 登录 Vercel

```bash
vercel login
```

3. 在项目目录下执行部署

```bash
cd web_tool
vercel
```

4. 按照提示完成配置
   - Set up and deploy? Y
   - Which scope? 选择你的账户
   - Link to existing project? N
   - Project name? web_tool (或自定义名称)
   - In which directory is your code located? ./

5. 生产环境部署

```bash
vercel --prod
```

#### 自定义域名 (可选)

1. 在 Vercel Dashboard 中打开你的项目

2. 进入 "Settings" -> "Domains"

3. 添加你的自定义域名

4. 按照提示在域名服务商处添加 DNS 记录


### 方式三：其他部署平台

#### GitHub Pages

1. 在 GitHub 仓库设置中启用 Pages
2. 选择分支和目录（通常是 `main` 分支的 `/` 根目录）
3. 保存后自动部署

#### Cloudflare Pages

1. 登录 Cloudflare Dashboard
2. 进入 Pages 并创建新项目
3. 连接 GitHub 仓库
4. 配置构建设置（留空即可）
5. 点击部署

#### Netlify

1. 登录 Netlify
2. 点击 "Add new site" -> "Import an existing project"
3. 选择 Git 仓库
4. 构建命令和发布目录留空
5. 点击 "Deploy site"

## 二次开发

### 修改网址导航内容

编辑 `index.html` 文件，找到对应的网址链接区域进行修改：

```html
<div class="url-card io-px-3 io-py-2 mb-2">
    <a href="https://your-website.com" target="_blank" rel="nofollow" class="text-xs">
        <strong>网站名称</strong>
        <span class="url-desc">网站描述</span>
    </a>
</div>
```

### 修改关于页面

编辑 `about/index.html` 文件，修改个人信息、联系方式等内容。

### 修改网站提交页面

编辑 `commit.html` 文件，可以配置表单字段和提交逻辑：

```javascript
// 在第 371 行附近，替换为实际的 API 地址
$.ajax({
    url: '/api/submit',
    method: 'POST',
    data: formData,
    success: function(response) {
        // 处理成功响应
    }
});
```

### 自定义样式

主要样式文件位于 `assets/css/` 目录：

- `custom-style.css` - 自定义样式
- `style-3.03029.1.css` - 主题样式

### 添加新的分类

在 `index.html` 中添加新的分类区块：

```html
<div class="io-title text-sm" id="your-category-id">
    <i class="far fa-star fa-lg fa-fw mr-1"></i>
    分类名称
</div>
<div class="row io-mx-n2">
    <!-- 添加网址卡片 -->
</div>
```

## 项目结构

```
web_tool/
├── index.html              # 首页
├── commit.html             # 网址提交页面
├── 404.html               # 404 错误页面
├── about/
│   └── index.html         # 关于页面
├── assets/
│   ├── css/               # 样式文件
│   ├── js/                # JavaScript 文件
│   ├── images/            # 图片资源
│   └── fontawesome-5.15.4/ # 图标库
├── README.md              # 项目文档
└── vercel.json            # Vercel 配置（可选）
```

## 常见问题

### 1. 图片或样式加载失败

检查资源路径是否正确，确保相对路径引用准确。

### 2. 网址提交功能如何实现后端

目前提交功能将数据保存在浏览器 localStorage 中。如需持久化存储，可以：
- 使用 Vercel Serverless Functions
- 配置后端 API（Node.js、Python、PHP 等）
- 使用第三方表单服务（Formspree、Typeform 等）

### 3. 如何添加网站统计

可以集成以下统计工具：
- Google Analytics
- 百度统计
- 51.la（项目已集成）

### 4. 如何优化 SEO

- 完善 meta 标签（title、description、keywords）
- 添加网站地图 sitemap.xml
- 提交到搜索引擎收录
- 优化页面加载速度

## 技术栈

- HTML5
- CSS3
- JavaScript (jQuery)
- Bootstrap 4
- Font Awesome 5

## 参考资料

- [Nginx 官方文档](https://nginx.org/en/docs/)
- [Vercel 部署文档](https://vercel.com/docs)
- [Let's Encrypt 证书](https://letsencrypt.org/)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

- GitHub: https://github.com/geeeeeeeek
- 个人主页: https://web.gitapp.cn
- Email: kefu308@gmail.com

---

⭐ 如果这个项目对你有帮助，欢迎 Star 支持！
