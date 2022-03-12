import React, { useState, useEffect } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AppBar from "@mui/material/AppBar";
import axios from "axios";
import moment from 'moment';



const RSSFeed: React.FC = () => {


  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [stories, setStories] = useState<RSSData[]>([]);
  const [eater, setEaterFeed] = useState<RSSData[]>([]);
  const [nyt, setNYTFeed] = useState<RSSData[]>([]);
  const [delish, setDelishFeed] = useState<RSSData[]>([]);

  const randomClipArtArray: string[] = [
    'http://media1.s-nbcnews.com/i/streams/2014/October/141006/2D274906938828-today-cafeteria-140811-01.jpg',
    'https://imageio.forbes.com/specials-images/dam/imageserve/41858688/0x0.jpg?format=jpg&width=1200&fit=bounds',
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2020%2F09%2F11%2Fcdc-covid-restaurant-study-FT-BLOG0920.jpg',
    'https://www.irishtimes.com/polopoly_fs/1.4323852.1596723346!/image/image.jpg_gen/derivatives/box_620_330/image.jpg',
    'https://s3.amazonaws.com/fathom_media/photos/Tickets-Barcelona-main.jpg.1200x800_q85_crop.jpg',
    'https://cdn.tatlerasia.com/tatlerasia/i/2021/09/01110318-odette-team-culinary-2_cover_1800x1200.jpg',
    'https://media.bizj.us/view/img/11940842/gettyimages-1153697837*1200xx7178-4054-0-498.jpg',
    'https://images.ctfassets.net/yixw23k2v6vo/5hEq682Ain2d0upHa2QjbH/93693bde0dc9e814f046b963684d5abd/becca-tapert-UaBIcWSS4FY-unsplash.jpg',
    'https://www.homestratosphere.com/wp-content/uploads/2020/04/kitchens-designed-for-people-who-love-to-cook-April122020-1-min.jpg',
    'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/12/19/0/FN_getty_woman-in-kitchen_s4x3.jpg.rend.hgtvcom.441.294.suffix/1482195667779.jpeg',
    'https://www.foodsafetynews.com/files/2017/12/family-baking-cookies.jpg',
    'https://empire-s3-production.bobvila.com/slides/19986/widened/pots-stove.jpg?1591223274',
    'https://media.istockphoto.com/photos/cast-iron-pot-on-stove-picture-id172794670?k=20&m=172794670&s=612x612&w=0&h=_U1PTY7oqITF8AOEyHYRyKQiY5OHBSZoQy4nCo874vI=',
    'https://www.eatthis.com/wp-content/uploads/sites/4/2019/01/preheat-skillet-on-stove.jpg',
    'https://www.eatthis.com/wp-content/uploads/sites/4/2019/05/person-holding-skillet-on-stovetop.jpg?fit=1200%2C879&ssl=1',
    'https://www.woodtv.com/wp-content/uploads/sites/51/2016/07/boiling-water-strawberry-jam_40918566_ver1.0.jpg',
    'https://s.abcnews.com/images/US/boiling-water-rf-gty-210217_1613587839945_hpMain_16x9_992.jpg',
    'https://perfectdailygrind.com/wp-content/uploads/2018/01/people-in-a-coffee-shop-scaled-e1586473572334.jpg',
    'https://cdn.ca.emap.com/wp-content/uploads/sites/12/2016/01/The_new_workplace_Robert_Wolcheck_372450656-1024x683.jpg',
    'https://www.thebalancesmb.com/thmb/8RKbM-3LeFAwcyvDFOUTUZSmT5Y=/2121x1414/filters:fill(auto,1)/GettyImages-930090080-cb278d98196c4c1baa0bafc66848c625.jpg',
    'https://blog.eureka.co.it/hs-fs/hubfs/Third-wave-coffee-shop-people.jpg?width=1024&name=Third-wave-coffee-shop-people.jpg',
    'https://images.squarespace-cdn.com/content/v1/5be6dd00f79392e09d2d579d/1559231326281-77P7EI4LNHK7W05SBT24/People+%26+Places+Johor+Bahru?format=1000w',
  ];

  interface RSSData {
    feed: string,
    item: number,
    creator: string,
    title: string,
    pubDate: string,
    link: string,
  }

  let eaterFeed = () => {
    axios.get<RSSData[]>(`/routes/rss/populate/${0}`)
        .then(({ data }) => {
          setEaterFeed(data);
        })
        .catch((err) => {
          throw err;
        })
  }
  
  const nytFeed = () => {
    axios.get<RSSData[]>(`/routes/rss/populate/${1}`)
        .then(({ data }) => {
          setNYTFeed(data);
        })
        .catch((err) => {
          throw err;
        })
  }

  const delishFeed = () => {
    axios.get<RSSData[]>(`/routes/rss/populate/${2}`)
        .then(({ data }) => {
          setDelishFeed(data);
        })
        .catch((err) => {
          throw err;
        })
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
  eaterFeed();
  nytFeed();
  delishFeed();

}, [])


  const tabs = ["Eater", "NYT Food", "Delish"];

  return (
    <div>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={(e, value) => {
          setSelectedTab(value);
          if(value === 0) {
            setStories(eater)
          } else if(value === 1) {
            setStories(nyt);
          } else if(value === 2) {
            setStories(delish);
          }
        }
          }>
          {tabs.map((tab) => <Tab label={tab} key={tab} />)}
        </Tabs>
      </AppBar>
      {stories.map((story) => {
        const { creator, title, pubDate, link} = story;
        const relTime = moment(pubDate).format("[Published On: ] dddd, MMMM Do" );
        const randomImg = Math.floor(Math.random() * randomClipArtArray.length);
        return(
          <div id="story" key={title}><a id="headline" href={link}>
          <div id="rssImg"><img width='120' src={randomClipArtArray[randomImg]}></img></div>
              <div id="rssStoryDiv">
                <h5 id='rssTitle'>{title}</h5> 
                <h6 id='rssCreator'>Written by: {creator}</h6>
                <h6 id='rssTime'>{relTime}</h6>
              </div>
          </a></div>
        )
      })}
    </div>
  )
}

export default RSSFeed;