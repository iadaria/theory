import {EffectChatRoom} from './EffectChatRoom';
import {EffectConnection} from './EffectConnection';
import {EffectOnlineStatus} from './EffectOnlineStatus';
import {EffectPlayground} from './EffectPlayground';
import {EffectVideo} from './EffectVideo';
import {EffectVideoDuringRender} from './EffectVideoDuringRender';
import {EffectVideoRenderingWithText} from './EffectVideoRenderingWithText';
import {EffectVideoWithText} from './EffectVideoWithText';

export function Effect() {
	let example;

	example = <EffectVideoDuringRender />;
	example = <EffectVideo />;
	example = <EffectVideoRenderingWithText />;
	example = <EffectVideoWithText />;
	example = <EffectPlayground />;
	example = <EffectConnection />;
	example = <EffectOnlineStatus />;
	example = <EffectChatRoom />;
	return example;
}
