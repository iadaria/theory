import {useEffect, useRef, useState} from 'react';

interface VideoPlayerProps {
	src: string;
	isPlaying: boolean;
}

function VideoPlayer({src, isPlaying}: VideoPlayerProps) {
	const ref = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (isPlaying) {
			console.log('Calling video.play()');
			ref?.current?.play();
		} else {
			console.log('Calling video.pause()');
			ref?.current?.pause();
		}
	});

	return <video ref={ref} src={src} loop playsInline />;
}

export function EffectVideo() {
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
