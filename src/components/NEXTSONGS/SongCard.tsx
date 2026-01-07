import { useRef, useState, useEffect } from "react";
import type { Song } from "./types";
import Play from "@/assets/svg/Play_vector.svg?react";
import Pause from "@/assets/svg/Pause_vector.svg?react";
import Loader from "@/assets/svg/Loader.svg?react";
import "./SongCard.css";

type Props = Pick<
  Song,
  "title" | "author" | "imagePreviewUrl" | "songFileName"
>;

export default function SongCardClient({
  title,
  author,
  imagePreviewUrl,
  songFileName,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  async function toggle() {
    const a = audioRef.current;
    if (!a) return;

    if (a.paused) {
      try {
        setLoading(true);
        await a.play();
        setPlaying(true);
      } catch (err) {
        console.error("audio play() failed:", err);
        setPlaying(false);
      }
    } else {
      a.pause();
      setPlaying(false);
      setLoading(false);
    }
  }

  // cuando cambia la canción, pausa y resetea
  useEffect(() => {
    setPlaying(false);
    setLoading(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      // auto-play on song change but not in first render
      // (user has to click to play first time)
      if (hasMounted) {
        toggle();
      }
    }
  }, [songFileName]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <div id="SongCard" onClick={toggle}>
        <img className="card-image" src={imagePreviewUrl.src} alt={title} />

        <audio
          ref={audioRef}
          src={`/src/assets/songs/nextsongs/${songFileName}`}
          preload="metadata"
          onLoadStart={() => setLoading(true)}
          onWaiting={() => setLoading(true)}
          onCanPlay={() => setLoading(false)}
          onPlaying={() => setLoading(false)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setLoading(false);
          }}
          onError={() => {
            setLoading(false);
            setPlaying(false);
            console.error("audio error loading:", songFileName);
          }}
        />
        <div id="play-pause-icon">
          {loading ? <Loader id="loader" /> : playing ? <Pause /> : <Play />}
        </div>
      </div>
      <div id="song-info">
        <h2>{title}</h2>
        <h3>{author}</h3>
      </div>
    </>
  );
}
