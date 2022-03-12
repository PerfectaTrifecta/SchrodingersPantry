const { Router } = require('express');
const axios = require('axios').default;
const rssGet = Router();
const Parser =require('rss-parser')

  const parser = new Parser({
    customFields: {
      feed: ['foo'],
      item: ['bar']
    }
  });

rssGet.get('/:selectedTab', (req, res) => {
  const { selectedTab } = req.params;
  //unique RSS feeds for each outlet
  const feedUrls = [
    '6224f0ec7f158e227c74e3526224f1448394e80ad70ed0d2.xml',
    '6224f0ec7f158e227c74e3526224f1d0b51b1b2a253956b2.xml',
    '6224f0ec7f158e227c74e352622cbfe821556b2e1528be82.xml'
  ]
  axios.get((async () => {
    const feed = await parser.parseURL(`http://fetchrss.com/rss/${feedUrls[selectedTab]}`)
    res.send(feed.items);
  })());
})

module.exports = { rssGet };
