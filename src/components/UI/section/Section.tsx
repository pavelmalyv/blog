import classNames from 'classnames';
import cl from './Section.module.scss';
import { useId } from 'react';

interface SectionProps {
	title?: string;
	subtitle?: string;
	description?: string;
	children: React.ReactNode;
	container?: boolean;
	width?: 'medium' | 'full';
	titleSize?: 'h1' | 'h2';
	titleLevel?: 1 | 2;
	center?: boolean;
	marginBottom?: 'medium' | 'large';
	'aria-labelledby'?: string;
}

const Section = ({
	title,
	subtitle,
	description,
	children,
	container = true,
	width = 'full',
	titleSize = 'h2',
	titleLevel = 2,
	center = false,
	marginBottom = 'medium',
	['aria-labelledby']: ariaLabelledbyProp,
}: SectionProps) => {
	const idTitle = useId();
	const classesHead = classNames(cl.head, cl[`head_${width}`], cl[`head_${marginBottom}`], {
		[cl['head_center']]: center,
	});

	let ariaLabelledby;
	if (ariaLabelledbyProp) {
		ariaLabelledby = ariaLabelledbyProp;
	} else if (title) {
		ariaLabelledby = idTitle;
	}

	return (
		<section className="section" aria-labelledby={ariaLabelledby}>
			<div className={classNames({ container: container })}>
				{title && (
					<div className={classesHead}>
						{subtitle && <div className={cl.subtitle}>{subtitle}</div>}

						{titleLevel === 1 && (
							<h1 id={idTitle} className={titleSize}>
								{title}
							</h1>
						)}
						{titleLevel === 2 && (
							<h2 id={idTitle} className={titleSize}>
								{title}
							</h2>
						)}

						{description && <div className={cl.description}>{description}</div>}
					</div>
				)}

				{children}
			</div>
		</section>
	);
};

export default Section;
