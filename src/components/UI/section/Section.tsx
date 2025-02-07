import { useId } from 'react';
import cl from './Section.module.scss';

interface SectionProps {
	title: string;
	children: React.ReactNode;
	region?: boolean;
}

const Section = ({ title, children, region = true }: SectionProps) => {
	const idTitle = useId();
	const ariaLabelledby = region ? idTitle : undefined;

	return (
		<section className="section" aria-labelledby={ariaLabelledby}>
			<div className="container">
				<div className={cl.head}>
					<h2 id={idTitle} className="h2">
						{title}
					</h2>
				</div>

				{children}
			</div>
		</section>
	);
};

export default Section;
