import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { values } from "lodash";
import axios from "axios";
import Parser from 'rss-parser';




const RSSFeed: React.FC = () => {


  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [stories, setStories] = useState<any[]>([]);

  type CustomFeed = {foo: string};
  type CustomItem = {bar: number};
  const [parsedDoc, setParsedDoc] = useState();

  const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
      feed: ['foo'],
      item: ['bar']
    }
  });

  //unique RSS feeds for each outlet
  const feedUrls = [
    '6206a68b6d822c4afd308fd26206a71a2631ca7ba8088fc2.xml',
    '6206a68b6d822c4afd308fd26206a7d932a48d18dd49a782.xml',
    '6206a68b6d822c4afd308fd26206a88b6bb15b6f04753492.xml'
  ]
  const getFeed = (selectedTab: number) => {
    (async () => {
      const feed = await parser.parseURL(`http://fetchrss.com/rss/${feedUrls[selectedTab]}`);
      setStories(feed.items);
    })();
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
        let {creator, title, pubDate, link} = story;
        return(
          <div>
            <h5>{title}</h5>
            <h5>{creator}</h5>
            <h6>{pubDate}</h6>
            <a href="url">{link}</a>
          </div>
        )
      })}
    </div>
  )
}

export default RSSFeed;