import { useState } from "react";
import SongCardClient from "./SongCard";
import SongCardPreview from "./SongCardPreview";
import type { Song } from "./types";
import "./NextSongsPlayerClient.css";

export default function NextSongsPlayerClient({
  nextSongs,
}: {
  nextSongs: Song[];
}) {
  const [currentSongId, setCurrentSongId] = useState(0);

  function changeSong(id: number) {
    setCurrentSongId(id);
  }

  const current = nextSongs[currentSongId];

  return (
    <div id="next-songs-container" className="song-player-container">
      <aside id="playing-song">
        <SongCardClient
          title={current.title}
          author={current.author}
          imagePreviewUrl={current.imagePreviewUrl}
          songFileName={current.songFileName}
          url={current.url}
        />
      </aside>
      <section id="other-songs-container-wrapper">
        <div id="other-songs-container" data-lenis-prevent>
          <div id="other-songs">
            {nextSongs.map((song) => (
              <SongCardPreview
                key={song.id}
                id={song.id}
                title={song.title}
                author={song.author}
                imagePreviewUrl={song.imagePreviewUrl}
                currentSongId={currentSongId}
                changeSong={() => changeSong(song.id)}
              />
            ))}
          </div>
        </div>
        <div id="fade-bottom"></div>
      </section>
    </div>
  );
}
