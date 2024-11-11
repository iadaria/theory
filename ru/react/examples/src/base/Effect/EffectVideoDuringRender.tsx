import {useRef, useState} from 'react';

interface VideoPlayerProps {
	src: string;
	isPlaying: boolean;
}

function VideoPlayer({src, isPlaying}: VideoPlayerProps) {
	const ref = useRef<HTMLVideoElement>(null);

	if (isPlaying) {
		ref?.current?.play(); // Calling these while rendering isn't allowed.
	} else {
		ref?.current?.pause(); // Also, this crashes.
	}

	return <video ref={ref} src={src} loop playsInline />;
}

export function EffectVideoDuringRender() {
	const [isPlaying, setIsPlaying] = useState(false);
	return (
		<>
			<button onClick={() => setIsPlaying(!isPlaying)}>
				{isPlaying ? 'Pause' : 'Play'}
			</button>
			<VideoPlayer
				isPlaying={isPlaying}
				src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
			/>
		</>
	);
}
