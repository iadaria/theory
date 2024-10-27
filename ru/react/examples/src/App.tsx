import './App.css';
import {PureFunction} from './base/PureFunction';
import {Element} from './base/Element';
import {State} from './base/State/State';
import {EventHandler} from './base/EventHandler/EventHandler';

function App() {
	let example = <Element />;

	example = <PureFunction />;

	example = <EventHandler />;

	example = <State />;

	return example;
}

export default App;
