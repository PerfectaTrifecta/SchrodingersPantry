const { Router } = require('express');
const axios = require('axios').default;
const rssGet = Router();
const Parser = require('rss-parser');
const { Bookmark, User_Bookmark } = require('../db/index');

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
  })())
  .catch(err => {err})

});

rssGet.post('/bookmarks', (req, res) => {
  // console.log(req.body, 'rssRoute 30');
  const { title, creator, relTime, link, randomImg, userId } = req.body;

  Bookmark.findOrCreate({ where: { title }, defaults: { title, link, creator, relTime, img: randomImg } })
    .then(bookmark => {
      console.log(bookmark, 'rssRoute 36');

      User_Bookmark.create( {bookmarkId: bookmark.id, userId})
        .then(() => {
          console.log('bookmark created, rssRoute 40');
          res.sendStatus(201);
        });
    })
    .catch(err => console.error(err, 'rssRoute 38'));

});


module.exports = { rssGet };
