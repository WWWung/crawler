const http = require('http');
const fs = require('fs');
const request = require('request');

//  处理获取到的html，语法与jq相似
const cheerio = require('cheerio');

//  用来处理utf-8和gbk2312的中文乱码问题
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
