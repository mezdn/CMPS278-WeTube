import React, { useEffect, useState } from 'react';
import VideoCard from '../../VideoCard/VideoCard';
import {Helmet} from "react-helmet";

import './TrendingPage.css';

function TrendingPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("https://youtube278.azurewebsites.net/api/video/trending")
      .then(response => response.json())
      .then(result => setVideos(result))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <div className="trending">
      <Helmet>
          <meta charSet="utf-8" />
          <title>WeTube - Trending</title>
          <link rel="canonical" href="http://example.com" />
      </Helmet>
      <h2>Trending</h2>
      <div className="trending__videos">
        {videos.map((video) => {
          return (
            <VideoCard
              title={video.title}
              views={video.views.length}
              path={video.id}
              key={video.id}
              timestamp={video.uploadDate}
              channelId={video.author.id}
              channelImg={`https://youtube278.azurewebsites.net/api/channel/image-stream/${video.author.id}`}
              channel={video.author.name}
              image={`https://youtube278.azurewebsites.net/api/video/image-stream/${video.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TrendingPage;
