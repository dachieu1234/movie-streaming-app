"use client";
import dynamic from "next/dynamic";
import React from "react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface PlayerProps {
  src: string;
  playing?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
}

const Player: React.FC<PlayerProps> = ({
  src,
  playing = false,
  controls = true,
  loop = false,
  muted = false,
}) => (
  <div className="relative pt-[56.25%] rounded-xl overflow-hidden bg-black">
    <div className="absolute inset-0">
      <ReactPlayer
        src={src}
        width="100%"
        height="100%"
        controls={controls}
        playing={playing}
        loop={loop}
        muted={muted}
      />
    </div>
  </div>
);

export default Player;
