const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

const iconv = require('iconv-lite');

const url = 'http://www.mmonly.cc/ktmh/dmmn/';

crawlDadPage(url);


function crawlDadPage (url) {
  http.get(url, res => {
    let length = 0;
    let data = [];
    res.on('data', chunk => {
      data.push(chunk);
      length += chunk.length;
    })

    res.on('end', (err) => {
      if (err) {
        console.log(err);
        return false;
      }
      const html = Buffer.concat(data, length);
      const $ = cheerio.load(iconv.decode(html, 'gb2312').toString());
      for (let i=0; i<$('.masonry-brick .ABox').length; i++) {
        console.log($('.masonry-brick .ABox').eq(i).find('img').attr('alt'));
      }
    })
  })
}
