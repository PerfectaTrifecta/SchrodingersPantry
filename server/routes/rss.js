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
    '624c6916be9d5652ef71fa72624c6ab46d652c2a324fb893.xml',
    '624c6916be9d5652ef71fa72624c696c3bd74a34f96b3962.xml',
    '624c6916be9d5652ef71fa72624c6b323c9a0e6849094e42.xml'
  ]
  axios.get((async () => {
    const feed = await parser.parseURL(`http://fetchrss.com/rss/${feedUrls[selectedTab]}`)
    res.send(feed.items);
  })());
})

module.exports = { rssGet };
