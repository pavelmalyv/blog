import classNames from 'classnames';
import cl from './Section.module.scss';
import { useId } from 'react';

interface SectionProps {
	title: string;
	subtitle?: string;
	children: React.ReactNode;
	labelledby?: boolean;
	container?: boolean;
}

const Section = ({
	title,
	subtitle,
	children,
	labelledby = true,
	container = true,
}: SectionProps) => {
	const idTitle = useId();
	const ariaLabelledby = labelledby ? idTitle : undefined;

	return (
		<section className="section" aria-labelledby={ariaLabelledby}>
			<div className={classNames({ container: container })}>
				<div className={cl.head}>
					{subtitle && <div className={cl.subtitle}>{subtitle}</div>}

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
