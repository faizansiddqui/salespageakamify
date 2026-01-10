# 🚀 Vercel Deployment Guide for Nodemailer SMTP

## 📋 Overview

This guide will help you deploy your Akamify E-commerce application with Nodemailer SMTP functionality to Vercel.

## 🔧 Prerequisites

1. **Vercel Account** - Free at [vercel.com](https://vercel.com/)
2. **SMTP Server** - Your own SMTP configuration
3. **GitHub/GitLab/Bitbucket** - For Vercel deployment

## 🗝️ SMTP Configuration

### Update Your Environment Variables

Add your SMTP configuration to your `.env` file:

```env
# Nodemailer SMTP Configuration
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=587
VITE_SMTP_SECURE=false
VITE_SMTP_USER=your-email@gmail.com
VITE_SMTP_PASS=your-app-password
VITE_EMAIL_FROM=noreply@akamify.com
```

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** in your Google Account
2. **Generate App Password**:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" → "Other (Custom name)"
   - Enter "Akamify E-commerce"
   - Copy the 16-character password-vjsv qpmv gtob dgrl

3. **Update Environment Variables**:
   ```env
   VITE_SMTP_HOST=smtp.gmail.com
   VITE_SMTP_PORT=587
   VITE_SMTP_SECURE=false
   VITE_SMTP_USER=your-email@gmail.com
   VITE_SMTP_PASS=your-16-character-app-password
   VITE_EMAIL_FROM=your-email@gmail.com
   ```

## 📁 Project Structure

Your project should have this structure for Vercel deployment:

```
akamify-ecommerce/
├── api/
│   └── send-email.js          # Vercel function for Nodemailer
├── src/
│   ├── config/
│   │   └── emailService.js    # Email service configuration
│   └── pages/                 # React pages
├── .env                      # Environment variables
├── vercel.json              # Vercel configuration
├── package.json              # Dependencies
└── README.md
```

## 🔧 Vercel Configuration

### vercel.json

The `vercel.json` file is already configured for you:

```json
{
  "functions": {
    "api/*.js": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "env": {
    "VITE_SMTP_HOST": "@smtp_host",
    "VITE_SMTP_PORT": "@smtp_port",
    "VITE_SMTP_SECURE": "@smtp_secure",
    "VITE_SMTP_USER": "@smtp_user",
    "VITE_SMTP_PASS": "@smtp_pass",
    "VITE_EMAIL_FROM": "@email_from"
  }
}
```

### package.json

Updated with Vercel build script:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "vercel-build": "npm run build"
  }
}
```

## 🚀 Deployment Steps

### 1. Push to Git Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit with Nodemailer SMTP"

# Push to GitHub
git remote add origin https://github.com/yourusername/akamify-ecommerce.git
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy your project
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your Git repository**
4. **Vercel will automatically detect it's a React project**
5. **Add environment variables** in the deployment settings:
   - `VITE_SMTP_HOST`
   - `VITE_SMTP_PORT`
   - `VITE_SMTP_SECURE`
   - `VITE_SMTP_USER`
   - `VITE_SMTP_PASS`
   - `VITE_EMAIL_FROM`
6. **Click "Deploy"**

### 3. Configure Environment Variables in Vercel

In your Vercel project dashboard:

1. **Go to Settings → Environment Variables**
2. **Add the following variables**:
   ```
   VITE_SMTP_HOST = smtp.gmail.com
   VITE_SMTP_PORT = 587
   VITE_SMTP_SECURE = false
   VITE_SMTP_USER = your-email@gmail.com
   VITE_SMTP_PASS = your-app-password
   VITE_EMAIL_FROM = noreply@akamify.com
   ```
3. **Redeploy** to apply the variables

## 🧪 Testing the Deployment

### 1. Test Email Function

After deployment, test the email function:

```javascript
// In browser console on your deployed site
fetch('/api/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: 'test@example.com',
    subject: 'Test Email from Vercel',
    html: '<h1>Test Email</h1><p>This is a test email from Vercel deployment.</p>',
    smtpConfig: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
      }
    }
  })
}).then(response => response.json())
  .then(data => console.log('Email sent:', data))
  .catch(error => console.error('Error:', error));
```

### 2. Test Full Application

1. **Visit your deployed Vercel URL**
2. **Complete a booking** to test the full email flow
3. **Check your email inbox** for the confirmation
4. **Monitor Vercel function logs** for debugging

## 📊 Monitoring and Debugging

### Vercel Function Logs

1. **Go to your Vercel project dashboard**
2. **Click on the "Functions" tab**
3. **View real-time logs** for your API functions
4. **Check for errors** and performance metrics

### Common Issues and Solutions

#### 1. "Function not found"
**Solution**: Ensure `api/send-email.js` exists and is properly configured

#### 2. "SMTP authentication failed"
**Solution**: 
- Check SMTP credentials in Vercel environment variables
- Use app password for Gmail
- Verify 2FA is enabled

#### 3. "CORS error"
**Solution**: The Vercel function already includes CORS headers

#### 4. "Environment variables not working"
**Solution**: 
- Ensure variables are prefixed with `VITE_`
- Redeploy after adding variables
- Check Vercel environment variable settings

## 🔒 Security Best Practices

### Environment Variables

- **Never commit** `.env` file to Git
- **Use Vercel environment variables** for production
- **Rotate SMTP passwords** regularly
- **Use app passwords** instead of regular passwords

### Function Security

- **Input validation** is implemented in the function
- **Error handling** prevents information leakage
- **Rate limiting** can be added if needed

## 📈 Scaling and Performance

### Vercel Functions

- **Automatic scaling** - Vercel handles scaling automatically
- **Cold starts** - First call may be slower, subsequent calls are fast
- **Concurrent executions** - Multiple requests handled simultaneously
- **Global CDN** - Functions deployed globally

### Email Sending

- **Batch emails** - Consider implementing queuing for bulk sends
- **Rate limiting** - Respect SMTP provider limits
- **Error handling** - Automatic fallback to console logging in development

## 🔄 CI/CD with Vercel

### Automatic Deployments

Vercel automatically deploys when you push to your Git repository:

```bash
# Make changes
git add .
git commit -m "Update email templates"
git push

# Vercel automatically builds and deploys
```

### Preview Deployments

- **Pull requests** get automatic preview URLs
- **Test changes** before merging to production
- **Environment variables** can be tested separately

## 📞 Support Resources

### Vercel Documentation
- **Functions**: https://vercel.com/docs/concepts/functions
- **Environment Variables**: https://vercel.com/docs/projects/environment-variables
- **Deployment**: https://vercel.com/docs/get-started/deploy

### Nodemailer Documentation
- **SMTP Configuration**: https://nodemailer.com/smtp/
- **Troubleshooting**: https://nodemailer.com/usage/
- **Examples**: https://nodemailer.com/examples/

### Gmail SMTP
- **App Passwords**: https://support.google.com/accounts/answer/185833
- **SMTP Settings**: https://support.google.com/mail/answer/7126229

## 🎯 Quick Deployment Checklist

1. **Configure SMTP** in `.env` file
2. **Push to Git repository**
3. **Deploy to Vercel** (CLI or Dashboard)
4. **Add environment variables** in Vercel settings
5. **Test email functionality**
6. **Monitor function logs**
7. **Test full application flow**

---

**🎉 Your application is now ready for Vercel deployment with Nodemailer SMTP!**

The system will automatically use your SMTP configuration through Vercel's serverless functions, providing reliable email delivery with zero infrastructure management.
