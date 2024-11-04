import React, {useContext} from 'react';
import Heading from './common/Heading';
import {LevelContext} from './common/LevelContext';

function Section({children}: {children: React.ReactNode}) {
	const level = useContext(LevelContext);
	return (
		<section className="section">
			<LevelContext.Provider value={level + 1}>
				{children}
			</LevelContext.Provider>
		</section>
	);
}

export default function ContextPageTwo() {
	return (
		<Section>
			<Heading>Title</Heading>
			<Section>
				<Heading>Heading</Heading>
				<Heading>Heading</Heading>
				<Heading>Heading</Heading>
				<Section>
					<Heading>Sub-heading</Heading>
					<Heading>Sub-heading</Heading>
					<Heading>Sub-heading</Heading>
					<Section>
						<Heading>Sub-sub-heading</Heading>
						<Heading>Sub-sub-heading</Heading>
						<Heading>Sub-sub-heading</Heading>
					</Section>
				</Section>
			</Section>
		</Section>
	);
}

/**
 * Теперь и Heading, и Section читают LevelContext, чтобы определить,
 * насколько "глубоко" они находятся. А Section оборачивает свои
 * дочерние компоненты в LevelContext.
 */
