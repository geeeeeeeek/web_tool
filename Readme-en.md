# Web Tool - Online Navigation

[中文文档](./README.md)

A web navigation tool based on HTML + CSS + JavaScript, with a clean and beautiful interface, supporting URL submission and suitable for personal or team use.

## Features

- Pure static HTML pages, no backend required
- Responsive design, mobile-friendly
- Day/Night mode toggle
- Clear categorization with quick search
- URL submission feature for easy management
- Simple deployment, supports multiple deployment methods

## Live Demo

- GitHub Pages: https://geeeeeeeek.github.io/web_tool/
- Vercel: https://web-tool-omega.vercel.app/
- Cloudflare Pages: https://web-a55.pages.dev/

## Quick Start

### Local Preview

1. Clone the repository
```bash
git clone https://github.com/geeeeeeeek/web_tool.git
cd web_tool
```

2. Run with any HTTP server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (requires http-server)
npx http-server -p 8000

# Or simply open index.html in browser
```

3. Visit `http://localhost:8000` in your browser

## Deployment Guide

### Method 1: Nginx Deployment

#### 1. Prerequisites

Ensure Nginx is installed on your server:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

#### 2. Upload Files

Upload project files to the server:

```bash
# Create website directory
sudo mkdir -p /var/www/web_tool

# Upload files (run locally)
scp -r ./* user@your-server:/var/www/web_tool/

# Or use git clone on server
cd /var/www
sudo git clone https://github.com/geeeeeeeek/web_tool.git
```

#### 3. Configure Nginx

Create Nginx configuration file:

```bash
sudo vim /etc/nginx/sites-available/web_tool
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # Change to your domain or server IP

    root /var/www/web_tool;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static resource caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # 404 page
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
}
```

#### 4. Enable Site and Restart Nginx

```bash
# Create symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/web_tool /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable on boot
sudo systemctl enable nginx
```

#### 5. Configure HTTPS (Optional but Recommended)

Use Let's Encrypt free certificate:

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate and auto-configure Nginx
sudo certbot --nginx -d your-domain.com

# Setup auto-renewal
sudo certbot renew --dry-run
```

### Method 2: Vercel Deployment (Recommended)

Vercel provides free static website hosting with simple and fast deployment.

#### Option 1: Via Vercel Dashboard (Easiest)

1. Visit [Vercel](https://vercel.com) and sign up/login

2. Click "Add New Project"

3. Import your GitHub repository
   - Select "Import Git Repository"
   - Authorize GitHub and select `web_tool` repository

4. Configure project
   - Framework Preset: Select "Other"
   - Root Directory: `./` (keep default)
   - Build Command: Leave empty
   - Output Directory: `./` (keep default)

5. Click "Deploy" and wait for completion

6. After successful deployment, you'll get a domain like: `your-project.vercel.app`

#### Option 2: Via Vercel CLI

1. Install Vercel CLI

```bash
npm install -g vercel
```

2. Login to Vercel

```bash
vercel login
```

3. Deploy from project directory

```bash
cd web_tool
vercel
```

4. Follow the prompts
   - Set up and deploy? Y
   - Which scope? Select your account
   - Link to existing project? N
   - Project name? web_tool (or custom name)
   - In which directory is your code located? ./

5. Production deployment

```bash
vercel --prod
```

#### Custom Domain (Optional)

1. Open your project in Vercel Dashboard

2. Go to "Settings" -> "Domains"

3. Add your custom domain

4. Follow instructions to add DNS records at your domain registrar

#### Vercel Configuration File (Optional)

Create `vercel.json` in project root for advanced configuration:

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Method 3: Other Deployment Platforms

#### GitHub Pages

1. Enable Pages in GitHub repository settings
2. Select branch and directory (usually `main` branch and `/` root)
3. Save and auto-deploy

#### Cloudflare Pages

1. Login to Cloudflare Dashboard
2. Go to Pages and create new project
3. Connect GitHub repository
4. Configure build settings (leave empty)
5. Click deploy

#### Netlify

1. Login to Netlify
2. Click "Add new site" -> "Import an existing project"
3. Select Git repository
4. Leave build command and publish directory empty
5. Click "Deploy site"

## Customization

### Modify Navigation Links

Edit `index.html` file and find the URL link section:

```html
<div class="url-card io-px-3 io-py-2 mb-2">
    <a href="https://your-website.com" target="_blank" rel="nofollow" class="text-xs">
        <strong>Website Name</strong>
        <span class="url-desc">Website Description</span>
    </a>
</div>
```

### Modify About Page

Edit `about/index.html` file to update personal information and contact details.

### Modify Submission Page

Edit `commit.html` file to configure form fields and submission logic:

```javascript
// Around line 371, replace with actual API endpoint
$.ajax({
    url: '/api/submit',
    method: 'POST',
    data: formData,
    success: function(response) {
        // Handle success response
    }
});
```

### Custom Styles

Main style files are in `assets/css/` directory:

- `custom-style.css` - Custom styles
- `style-3.03029.1.css` - Theme styles

### Add New Categories

Add new category blocks in `index.html`:

```html
<div class="io-title text-sm" id="your-category-id">
    <i class="far fa-star fa-lg fa-fw mr-1"></i>
    Category Name
</div>
<div class="row io-mx-n2">
    <!-- Add URL cards here -->
</div>
```

## Project Structure

```
web_tool/
├── index.html              # Homepage
├── commit.html             # URL submission page
├── 404.html               # 404 error page
├── about/
│   └── index.html         # About page
├── assets/
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── images/            # Image resources
│   └── fontawesome-5.15.4/ # Icon library
├── README.md              # Documentation (Chinese)
├── Readme-en.md           # Documentation (English)
└── vercel.json            # Vercel config (optional)
```

## FAQ

### 1. Images or Styles Not Loading

Check if resource paths are correct and ensure relative paths are accurate.

### 2. How to Implement Backend for Submission

Currently, submission data is saved in browser localStorage. For persistent storage:
- Use Vercel Serverless Functions
- Configure backend API (Node.js, Python, PHP, etc.)
- Use third-party form services (Formspree, Typeform, etc.)

### 3. How to Add Analytics

Integrate analytics tools:
- Google Analytics
- Baidu Analytics
- 51.la (already integrated)

### 4. How to Optimize SEO

- Complete meta tags (title, description, keywords)
- Add sitemap.xml
- Submit to search engines
- Optimize page load speed

## Tech Stack

- HTML5
- CSS3
- JavaScript (jQuery)
- Bootstrap 4
- Font Awesome 5

## References

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Let's Encrypt](https://letsencrypt.org/)

## License

MIT License

## Contributing

Issues and Pull Requests are welcome!

## Contact

- GitHub: https://github.com/geeeeeeeek
- Website: https://web.gitapp.cn
- Email: kefu308@gmail.com

---

⭐ If this project helps you, please give it a Star!
