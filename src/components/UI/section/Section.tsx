import cl from './Section.module.scss';
import { useId } from 'react';

interface SectionProps {
	title: string;
	children: React.ReactNode;
	labelledby?: boolean;
}

const Section = ({ title, children, labelledby = true }: SectionProps) => {
	const idTitle = useId();
	const ariaLabelledby = labelledby ? idTitle : undefined;

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
