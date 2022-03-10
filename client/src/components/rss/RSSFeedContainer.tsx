import React, { useState, useEffect } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import axios from "axios";
import moment from 'moment';



const RSSFeed: React.FC = () => {


  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [stories, setStories] = useState<RSSData[]>([]);

  const randomClipArtArray: string[] = [
    'https://www.pinclipart.com/picdir/big/416-4166818_cook-food-clipart-png-transparent-png.png',
    'https://i.pinimg.com/originals/d0/5b/82/d05b824d2572238cfd2de87399b0d727.png',
    'https://i.pinimg.com/736x/2c/3a/b8/2c3ab8298456889d3a398e3372c87df7.jpg',
    'https://media.istockphoto.com/vectors/aerial-view-of-food-on-pan-vector-id1269030310?b=1&k=20&m=1269030310&s=612x612&w=0&h=5Lp_uRPKCWO8Z7R6eosTPaF8oVvT35LDX161e7IJHp8=',
    'https://www.pinclipart.com/picdir/big/542-5423799_cooking-logo-png-clipart.png',
    'https://lirp.cdn-website.com/971fafd2/dms3rep/multi/opt/mixer-616w.png',
    'https://cdn.shopify.com/s/files/1/0291/7698/7727/files/01_0002_Layer-3_480x480@2x.png?v=1588670474',
  ];

  interface RSSData {
    feed: string,
    item: number,
    creator: string,
    title: string,
    pubDate: string,
    link: string,
  }

  
  
  const getFeed = (selectedTab: number) => {
      axios.get<RSSData[]>(`/routes/rss/populate/${selectedTab}`)
        .then(({ data }) => {
          setStories(data);
        })
        .catch((err) => {
          throw err;
        })
  };

useEffect(() => {
  getFeed(0);
}, [])


  const tabs = ["Eater", "NYT Food", "Delish"];

  return (
    <div>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={(e, value) => {
          setSelectedTab(value);
          getFeed(selectedTab);
        }
          }>
          {tabs.map((tab) => <Tab label={tab} key={tab} />)}
        </Tabs>
      </AppBar>
      {stories.map((story) => {
        const { creator, title, pubDate, link} = story;
        const relTime = moment(pubDate).format("[Published On: ] dddd, MMMM Do" );
        const randomImg = Math.floor(Math.random() * randomClipArtArray.length);
        console.log(randomImg)
        return(
          <div id="story" key={title}>
          <div id="rssImg"><a href={link}><img width='130' src={randomClipArtArray[randomImg]}></img></a></div>
              <div id="rssStoryDiv">
                <h4><a id="headline" href={link}>{title}</a></h4> 
                <h5>Written by: {creator}</h5>
                <h5>{relTime}</h5>
              </div>
          </div>
        )
      })}
    </div>
  )
}

export default RSSFeed;