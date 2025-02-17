import classNames from 'classnames';
import cl from './Section.module.scss';
import { useId } from 'react';

interface SectionProps {
	title: string;
	subtitle?: string;
	description?: string;
	children: React.ReactNode;
	labelledby?: boolean;
	container?: boolean;
	width?: 'medium' | 'full';
	titleSize?: 'h1' | 'h2';
	center?: boolean;
}

const Section = ({
	title,
	subtitle,
	description,
	children,
	labelledby = true,
	container = true,
	width = 'full',
	titleSize = 'h2',
	center = false,
}: SectionProps) => {
	const idTitle = useId();
	const ariaLabelledby = labelledby ? idTitle : undefined;

	return (
		<section className="section" aria-labelledby={ariaLabelledby}>
			<div className={classNames({ container: container })}>
				<div
					className={classNames(cl.head, cl[`head_${width}`], {
						[cl['head_center']]: center,
					})}
				>
					{subtitle && <div className={cl.subtitle}>{subtitle}</div>}

					<h2 id={idTitle} className={titleSize}>
						{title}
					</h2>

					{description && <div className={cl.description}>{description}</div>}
				</div>

				{children}
			</div>
		</section>
	);
};

export default Section;
