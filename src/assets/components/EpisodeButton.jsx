import React from 'react';

const EpisodeButton = ({ episode, onClick }) => {
  return (
    <div>
      <button onClick={() => onClick(episode)}>
        {episode.episodeNum}
      </button>
    </div>
  );
};

export default EpisodeButton;