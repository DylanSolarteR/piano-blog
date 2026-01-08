import type { Song } from "./types";
import "./SongCardPreview.css";
import { useEffect } from "react";

type SongCardPreviewProps = Omit<Song, "songFileName" | "url"> & {
  currentSongId?: number;
  changeSong: () => void;
};

export default function SongCardPreview({
  id,
  title,
  author,
  imagePreviewUrl,
  currentSongId,
  changeSong,
}: SongCardPreviewProps) {
  return (
    <button
      id={`song-preview-button-${id}`}
      type="button"
      className={`song-preview-button ${
        currentSongId === id ? " activeSong" : ""
      }`}
      onClick={changeSong}
    >
      <div className="SongCardPreview">
        <div className="SongCard">
          <img className="card-image" src={imagePreviewUrl.src} alt={title} />
        </div>
        <div className="song-info">
          <h3 className="song-title" title={title}>
            {title}
          </h3>
          <p className="song-author" title={author}>
            {author}
          </p>
        </div>
      </div>
    </button>
  );
}
