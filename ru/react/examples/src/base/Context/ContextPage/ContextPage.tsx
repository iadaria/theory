import React from 'react';
import { LevelContext } from './common/LevelContext';
import Heading from './common/Heading';

function Section({
	level,
	children,
}: {
	level: number;
	children: React.ReactNode;
}) {
	return (
		<section className="section">
			<LevelContext.Provider value={level}>
				{children}
			</LevelContext.Provider>
		</section>
	);
}

export default function PageWithContext() {
	return (
		<Section level={1}>
			<Heading>Title</Heading>
			<Section level={2}>
				<Heading>Heading</Heading>
				<Heading>Heading</Heading>
				<Heading>Heading</Heading>
				<Section level={3}>
					<Heading>Sub-heading</Heading>
					<Heading>Sub-heading</Heading>
					<Heading>Sub-heading</Heading>
					<Section level={4}>
						<Heading>Sub-sub-heading</Heading>
						<Heading>Sub-sub-heading</Heading>
						<Heading>Sub-sub-heading</Heading>
					</Section>
				</Section>
			</Section>
		</Section>
	);
}
