import React, { useState, useEffect } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import axios from "axios";



const RSSFeed: React.FC = () => {


  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [stories, setStories] = useState<RSSData[]>([]);

  interface RSSData {
    feed: string,
    item: number,
    creator: string,
    title: string,
    pubDate: string,
    link: string,
    content: string,
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
        console.log(story);
        const { creator, title, pubDate, link, content } = story;
        const parser = new DOMParser();
        const img = parser.parseFromString(content, "text/html");
        console.log(img);
        return(
          <div key={title}>
          {/* {img} */}
           <h4><a href={link}>{title}</a></h4> 
            <h5>{creator}</h5>
            <h6>{pubDate}</h6>
            
          </div>
        )
      })}
    </div>
  )
}

export default RSSFeed;