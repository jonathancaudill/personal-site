#!/usr/bin/env node

/**
 * Sitemap Submission Script
 * 
 * This script helps submit your sitemap to major search engines.
 * Run this after deploying your site to ensure search engines can find all your pages.
 */

const https = require('https');
const http = require('http');

const SITEMAP_URL = 'https://jonathancaudill.com/sitemap.xml';

// Search engine submission URLs
const searchEngines = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET'
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET'
  },
  {
    name: 'Yandex',
    url: `https://blogs.yandex.com/pings/?status=success&url=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET'
  }
];

function submitToSearchEngine(engine) {
  return new Promise((resolve, reject) => {
    const url = new URL(engine.url);
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: engine.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SitemapSubmitter/1.0)'
      }
    };

    const client = url.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          engine: engine.name,
          status: res.statusCode,
          data: data
        });
      });
    });

    req.on('error', (error) => {
      reject({
        engine: engine.name,
        error: error.message
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject({
        engine: engine.name,
        error: 'Request timeout'
      });
    });

    req.end();
  });
}

async function submitSitemap() {
  console.log('🚀 Submitting sitemap to search engines...\n');
  console.log(`📍 Sitemap URL: ${SITEMAP_URL}\n`);

  const results = [];

  for (const engine of searchEngines) {
    try {
      console.log(`📡 Submitting to ${engine.name}...`);
      const result = await submitToSearchEngine(engine);
      results.push(result);
      
      if (result.status === 200) {
        console.log(`✅ ${engine.name}: Success (${result.status})`);
      } else {
        console.log(`⚠️  ${engine.name}: Unexpected status (${result.status})`);
      }
    } catch (error) {
      console.log(`❌ ${engine.name}: Failed - ${error.error}`);
      results.push(error);
    }
  }

  console.log('\n📊 Submission Summary:');
  console.log('=====================');
  
  results.forEach(result => {
    if (result.error) {
      console.log(`❌ ${result.engine}: ${result.error}`);
    } else {
      console.log(`✅ ${result.engine}: ${result.status}`);
    }
  });

  console.log('\n💡 Next Steps:');
  console.log('1. Wait 24-48 hours for search engines to process your sitemap');
  console.log('2. Monitor your site in Google Search Console');
  console.log('3. Check Bing Webmaster Tools for indexing status');
  console.log('4. Consider submitting individual URLs for faster indexing');

  console.log('\n🔗 Manual Submission Links:');
  console.log(`Google Search Console: https://search.google.com/search-console`);
  console.log(`Bing Webmaster Tools: https://www.bing.com/webmasters`);
  console.log(`Yandex Webmaster: https://webmaster.yandex.com/`);
}

// Run the script
if (require.main === module) {
  submitSitemap().catch(console.error);
}

module.exports = { submitSitemap, searchEngines }; 