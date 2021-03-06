import React, { useEffect, useState } from 'react';
import PlayerRecommendation from '../PlayerRecommendation/PlayerRecommendation';
import InteractionSection from '../InteractionSection/InteractionSection';
import {Helmet} from "react-helmet";

import './VideoPlayer.css';
import { useParams } from 'react-router-dom';
import { CircularProgress, Container, Grid } from '@material-ui/core';

function VideoPlayerPage() {
  const [video, setVideo] = useState({});
  const [views, setViews] = useState(0);
  const [channelName, setChannelName] = useState('');
  let { id, playlistId } = useParams();
  const currentUser = JSON.parse(window.localStorage.getItem('CurrentUser'));
  const query =
    currentUser == null
      ? ''
      : `?userId=${currentUser.id}&userSecret=${currentUser.secret}`;

  const recommendationLink =
    playlistId != null
      ? `https://youtube278.azurewebsites.net/api/playlist/${playlistId}`
      : video?.author?.id != undefined && video?.author?.id != null
      ? `https://youtube278.azurewebsites.net/api/video/recommendation?channelId=${video?.author?.id}`
      : '';

  const loadVideoData = async () => {
    const response = await fetch(
      `https://youtube278.azurewebsites.net/api/Video/${id}`
    );
    const responseJSON = await response.json();
    setVideo(responseJSON);
    setViews(responseJSON.views?.length);
    setChannelName(responseJSON.author?.name);
  };

  useEffect(() => {
    loadVideoData();
  }, [id]);

  if (video.author !== undefined) {
    return (
      <div className="videoPlayer">
        <Helmet>
            <meta charSet="utf-8" />
            <title>WeTube - {video?.title}</title>
            <link rel="canonical" href="http://example.com" />
        </Helmet>
        <div className="videoPlayer__body">
          <div className="videoPlayer__player">
            <video
              src={`https://youtube278.azurewebsites.net/api/video/stream/${id}${query}`}
              autoPlay
              controls
            ></video>
          </div>
          <div className="videoPlayer__interactions">
            <InteractionSection
              views={views}
              channelName={channelName}
              video={video}
            />
          </div>
        </div>
        <div className="videoPlayer__playerRecommendations">
          <PlayerRecommendation
            recommendationLink={recommendationLink}
            currentVideoId={video.id}
          />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Grid
          container
          alignContent="center"
          justify="center"
          spacing={0}
          direction="column"
          style={{ minHeight: '100vh' }}
        >
          <Grid item>
            <CircularProgress variant="indeterminate" />
            Loading
          </Grid>
        </Grid>{' '}
      </>
    );
  }
}

export default VideoPlayerPage;
