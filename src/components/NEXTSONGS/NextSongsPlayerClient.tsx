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

  const current = nextSongs[currentSongId];

  return (
    <div id="no-responsive-next-songs-container">
      <aside id="playing-song">
        <SongCardClient
          title={current.title}
          author={current.author}
          imagePreviewUrl={current.imagePreviewUrl}
          songFileName={current.songFileName}
        />
      </aside>

      <section id="other-songs-container">
        <div id="other-songs">
          {nextSongs
            .filter((song) => song.id !== currentSongId)
            .map((song) => (
              <SongCardPreview
                key={song.id}
                title={song.title}
                author={song.author}
                imagePreviewUrl={song.imagePreviewUrl}
                changeSong={() => setCurrentSongId(song.id)}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
