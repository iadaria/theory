import {TreeChat} from './TreeChat';
import {TreeChatRight} from './TreeChatRight';
import {TreeCounterFancy} from './TreeCounterFancy';
import {TreeCounterFancyThree} from './TreeCounterFancyThree';
import {TreeCounterFancyTwo} from './TreeCounterFancyTwo';
import {TreeCounterPaused} from './TreeCounterPaused';
import {TreeCounterRender} from './TreeCounterRender';
import {TreeMyComponent} from './TreeMyComponent';
import {TreeScoreboardRightFirst} from './TreeScoreboardRightFirst';
import {TreeScoreboardWrong} from './TreeScoreboardWrong';

export function Tree() {
	let example;
	example = <TreeCounterRender />;
	example = <TreeCounterFancy />;
	example = <TreeCounterFancyTwo />;
	example = <TreeCounterPaused />;
	example = <TreeCounterFancyThree />;
	example = <TreeMyComponent />;
	example = <TreeScoreboardWrong />;
	example = <TreeScoreboardRightFirst />;
	example = <TreeChat />;
	example = <TreeChatRight />;

	return example;
}
