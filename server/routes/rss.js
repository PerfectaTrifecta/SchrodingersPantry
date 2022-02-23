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
    '6206a68b6d822c4afd308fd26206a71a2631ca7ba8088fc2.xml',
    '6206a68b6d822c4afd308fd26206a7d932a48d18dd49a782.xml',
    '6206a68b6d822c4afd308fd26206a88b6bb15b6f04753492.xml'
  ]
  axios.get((async () => {
    console.log("ENDPOINT HIT");
    const feed = await parser.parseURL(`http://fetchrss.com/rss/${feedUrls[selectedTab]}`);
    // setStories(feed.items);
    res.send(feed.items);
  })());
})

module.exports = { rssGet };
