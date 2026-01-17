import { useRef, useState, useEffect, useLayoutEffect } from "react";
import type { Song } from "./types";
import Play from "@/assets/svg/Play_vector.svg?react";
import Pause from "@/assets/svg/Pause_vector.svg?react";
import Loader from "@/assets/svg/Loader.svg?react";
import ExternalLink from "@/assets/svg/external-link.svg?react";
import VolumeLoud from "@/assets/svg/volume-loud.svg?react";
import VolumeCross from "@/assets/svg/volume-cross.svg?react";
import "./SongCard.css";
import gsap from "gsap";

type Props = Pick<
  Song,
  "title" | "author" | "imagePreviewUrl" | "songFileName" | "url"
>;

const SONG_URLS = import.meta.glob(
  "/src/assets/songs/nextsongs/*.{mp3,wav,ogg,flac}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

function getSongUrl(songFileName: string) {
  const match = Object.entries(SONG_URLS).find(([path]) =>
    path.endsWith("/" + songFileName),
  );
  return match?.[1];
}

export default function SongCardClient({
  title,
  author,
  url,
  imagePreviewUrl,
  songFileName,
  changeToPrevSong,
  changeToNextSong,
}: Props & { changeToPrevSong: () => void; changeToNextSong: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- Crossfade background layers ---
  const bgARef = useRef<HTMLDivElement | null>(null);
  const bgBRef = useRef<HTMLDivElement | null>(null);

  const [bgAUrl, setBgAUrl] = useState<string>(imagePreviewUrl.src);
  const [bgBUrl, setBgBUrl] = useState<string | null>(null);

  // Guardamos la direccion del cambio (para animacion lateral)
  const dirRef = useRef<"next" | "prev">("next");
  const bgAnimatingRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1); // 0..1
  const [muted, setMuted] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const volumeWrapRef = useRef<HTMLDivElement | null>(null);

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

  // Helpers
  const progress =
    duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;

  function seekToClientX(clientX: number, trackEl: HTMLDivElement) {
    const a = audioRef.current;
    if (!a || duration <= 0) return;

    const rect = trackEl.getBoundingClientRect();
    const x = Math.min(rect.right, Math.max(rect.left, clientX));
    const p = (x - rect.left) / rect.width;

    const t = p * duration;
    a.currentTime = t;
    setCurrentTime(t);
  }

  function setVolumeFromClientY(clientY: number, sliderEl: HTMLDivElement) {
    const rect = sliderEl.getBoundingClientRect();
    const y = Math.min(rect.bottom, Math.max(rect.top, clientY));
    const p = 1 - (y - rect.top) / rect.height; // top=1 bottom=0

    const v = Math.min(1, Math.max(0, p));
    setVolume(v);
    if (v > 0) setMuted(false);
  }

  // Pointer drag: progress
  function onProgressPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    seekToClientX(e.clientX, el);
  }
  function onProgressPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      seekToClientX(e.clientX, e.currentTarget);
    }
  }

  // Pointer drag: volume
  function onVolumePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    setVolumeFromClientY(e.clientY, el);
  }
  function onVolumePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      setVolumeFromClientY(e.clientY, e.currentTarget);
    }
  }

  // Apply volume/mute
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    a.muted = muted;
  }, [volume, muted]);

  // Close volume popover on outside click
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!volumeWrapRef.current) return;
      if (!volumeWrapRef.current.contains(e.target as Node)) {
        setIsVolumeOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  // Reset on song change
  useEffect(() => {
    setPlaying(false);
    setLoading(false);
    setCurrentTime(0);
    setDuration(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();

      if (hasMounted) {
        toggle();
      }
    }
  }, [songFileName]);

  // Background crossfade on image change
  useEffect(() => {
    const nextUrl = imagePreviewUrl.src;

    if (!hasMounted) {
      setBgAUrl(nextUrl);
      return;
    }

    if (bgAnimatingRef.current) return;

    setBgBUrl(nextUrl);
  }, [imagePreviewUrl.src, hasMounted]);

  useLayoutEffect(() => {
    if (!bgBUrl) return;

    const a = bgARef.current;
    const b = bgBRef.current;

    if (!a || !b) return;

    bgAnimatingRef.current = true;

    gsap.set(b, { opacity: 0 });
    gsap.set(a, { opacity: 1 });

    const tl = gsap.timeline({
      defaults: { duration: 0.5, ease: "power1.inOut" },
      onComplete: () => {
        // Commit
        setBgAUrl(bgBUrl);
        setBgBUrl(null);

        // Limpieza
        gsap.set(a, { clearProps: "transform,opacity" });
        bgAnimatingRef.current = false;
      },
    });

    tl.to(a, { opacity: 0 }, 0).to(b, { opacity: 1 }, 0);

    return () => {
      tl.kill();
    };
  }, [bgBUrl]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div id="SongCardClient">
      <div id="SongCard" onClick={toggle}>
        {/* <img className="card-image" src={imagePreviewUrl.src} alt={title} /> */}
        <div className="card-bg" aria-hidden="true">
          <div
            ref={bgARef}
            className="card-bg-layer"
            style={{ backgroundImage: `url(${bgAUrl})` }}
          />
          {bgBUrl && (
            <div
              ref={bgBRef}
              className="card-bg-layer"
              style={{ backgroundImage: `url(${bgBUrl})` }}
            />
          )}
        </div>
        <div className="card-content">
          <audio
            ref={audioRef}
            src={getSongUrl(songFileName)}
            preload="metadata"
            onLoadStart={() => setLoading(true)}
            onWaiting={() => setLoading(true)}
            onCanPlay={() => setLoading(false)}
            onPlaying={() => setLoading(false)}
            onPause={() => setPlaying(false)}
            onEnded={() => {
              setPlaying(false);
              setLoading(false);
              setCurrentTime(0);
            }}
            onError={() => {
              setLoading(false);
              setPlaying(false);
              console.error("audio error loading:", songFileName);
            }}
            onLoadedMetadata={(e) => {
              const a = e.currentTarget;
              setDuration(Number.isFinite(a.duration) ? a.duration : 0);
            }}
            onTimeUpdate={(e) => {
              setCurrentTime(e.currentTarget.currentTime);
            }}
          />

          <div id="play-pause-icon">
            {loading ? (
              <Loader id="loader" className="iconSongCard" />
            ) : playing ? (
              <Pause className="iconSongCard" />
            ) : (
              <Play className="iconSongCard" />
            )}
          </div>

          <div
            id="right-icons"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            style={{ pointerEvents: "auto" }}
          >
            <div
              className={`volumeWrap ${isVolumeOpen ? "open" : ""}`}
              ref={volumeWrapRef}
            >
              <button
                type="button"
                className="iconBtn"
                aria-label="Volume"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVolumeOpen((v) => !v); // tap = toggle
                }}
              >
                {muted || volume === 0 ? (
                  <VolumeCross className="iconSongCard" />
                ) : (
                  <VolumeLoud className="iconSongCard" />
                )}
              </button>

              <div
                className="volumePopover"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="volumeSlider"
                  role="slider"
                  aria-label="Volume"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round((muted ? 0 : volume) * 100)}
                  onPointerDown={onVolumePointerDown}
                  onPointerMove={onVolumePointerMove}
                >
                  <div className="volumeTrack" />
                  <div
                    className="volumeFill"
                    style={{ height: `${(muted ? 0 : volume) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <a
              className="iconBtn"
              aria-label="Info"
              href={`${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="iconSongCard" />
            </a>
          </div>

          <div
            id="progress-track"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => {
              e.stopPropagation();
              onProgressPointerDown(e);
            }}
            onPointerMove={(e) => {
              e.stopPropagation();
              onProgressPointerMove(e);
            }}
            style={{ ["--progress" as any]: progress }}
          >
            <div className="progressFill" />
          </div>
        </div>
        <div id="buttons-next-prev">
          <button
            className="button-change-song"
            onClick={() => {
              dirRef.current = "prev";
              changeToPrevSong();
            }}
          >
            {"<"}
          </button>
          <button
            className="button-change-song"
            onClick={() => {
              dirRef.current = "next";
              changeToNextSong();
            }}
          >
            {">"}
          </button>
        </div>
      </div>

      <div id="song-info">
        <h2 title={title}>{title}</h2>
        <h3 title={author}>{author}</h3>
      </div>
    </div>
  );
}
