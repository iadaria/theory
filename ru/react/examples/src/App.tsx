import './App.css';
import {PureFunction} from './base/PureFunction';
import {Element} from './base/Element';
import {State} from './base/State/State';
import {EventHandler} from './base/EventHandler/EventHandler';
import {Render} from './base/Render/Render';
import {Declarative} from './base/Declarative';
import {Tree} from './base/Tree/Tree';

function App() {
	let example = null;
	example = <PureFunction />;
	example = <EventHandler />;
	example = <State />;
	example = <Element />;
	example = <Render />;
	example = <Declarative />;
	example = <Tree />;
	return example;
}

export default App;
