import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { values } from "lodash";
import axios from "axios";



const RSSFeed: React.FC = () => {


  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [stories, setStories] = useState<any[]>([]);

  type CustomFeed = {foo: string};
  type CustomItem = {bar: number};

  interface RSSData {
    feed: string,
    item: number,
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
          {tabs.map((tab, i) => <Tab label={tab} key={tab} />)}
        </Tabs>
      </AppBar>
      {/* <RenderFeed selectedTab={selectedTab} /> */}
      {stories.map((story, i) => {
        let { creator, title, pubDate, link } = story;
        return(
          <div>
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