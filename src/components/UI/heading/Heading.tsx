import { useEffect, useRef } from 'react';
import cl from './Heading.module.scss';

interface HeadingProps {
	title: string;
}

const Heading = ({ title }: HeadingProps) => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const titleTextRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!titleRef.current || !titleTextRef.current) {
			return;
		}

		const titleElement = titleRef.current;
		const titleTextElement = titleTextRef.current;

		const setFontSize = () => {
			const widthContainer = titleElement.clientWidth;
			const widthText = titleTextElement.clientWidth;
			const fontSize = parseFloat(
				window.getComputedStyle(titleTextElement, null).getPropertyValue('font-size'),
			);
			const scaleFontSize = Math.floor(fontSize * (widthContainer / widthText));

			requestAnimationFrame(() => {
				titleTextElement.style.fontSize = scaleFontSize + 'px';
			});
		};
		setFontSize();

		const resizeObserver = new ResizeObserver(() => {
			setFontSize();
		});
		resizeObserver.observe(titleTextElement);

		window.addEventListener('resize', setFontSize);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('resize', setFontSize);
		};
	}, []);

	return (
		<>
			<section className={cl.heading}>
				<div className="container">
					<div className={cl.wrapper}>
						<h1 className={cl.title} ref={titleRef}>
							<span className={cl.text} ref={titleTextRef}>
								{title}
							</span>
						</h1>
					</div>
				</div>
			</section>
		</>
	);
};

export default Heading;
