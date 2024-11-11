import {log} from 'console';
import {useEffect, useRef, useState} from 'react';

interface VideoPlayerProps {
	src: string;
	isPlaying: boolean;
}

function VideoPlayer({src, isPlaying}: VideoPlayerProps) {
	const ref = useRef<HTMLVideoElement>(null);
	console.log(VideoPlayer.name, 'rendered', {isPlaying});
	useEffect(() => {
		if (isPlaying) {
			console.log('Calling video.play()');
			ref?.current?.play();
		} else {
			console.log('Calling video.pause()');
			ref?.current?.pause();
		}
	}, [isPlaying]);

	return <video ref={ref} src={src} loop playsInline />;
}

export function EffectVideoWithText() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [text, setText] = useState('');

	console.log(EffectVideoWithText.name, 'rendered');
	return (
		<>
			<input value={text} onChange={(e) => setText(e.target.value)} />
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
