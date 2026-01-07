import type { Song } from "./types";
import "./SongCardPreview.css";

type SongCardPreviewProps = Omit<Song, "id" | "songFileName" | "url"> & {
  changeSong: () => void;
};

export default function SongCardPreview({
  title,
  author,
  imagePreviewUrl,
  changeSong,
}: SongCardPreviewProps) {
  return (
    <button type="button" className="song-preview-button" onClick={changeSong}>
      <div className="SongCardPreview">
        <div className="SongCard">
          <img className="card-image" src={imagePreviewUrl.src} alt={title} />
        </div>
        <div className="song-info">
          <h3 className="song-title">{title}</h3>
          <p className="song-author">{author}</p>
        </div>
      </div>
    </button>
  );
}
