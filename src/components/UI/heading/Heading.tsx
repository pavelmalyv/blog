import Skeleton from 'react-loading-skeleton';
import cl from './Heading.module.scss';
import VisuallyHiddenLoader from '@components/visuallyHiddenLoader/VisuallyHiddenLoader';

import { useEffect, useRef } from 'react';
import { MESSAGES } from '@/constants/messages';

interface HeadingProps {
	title: string | null;
}

const Heading = ({ title }: HeadingProps) => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const titleTextRef = useRef<HTMLSpanElement>(null);
	const isLoading = !title;

	useEffect(() => {
		if (!titleRef.current || !titleTextRef.current) {
			return;
		}

		const titleElement = titleRef.current;
		const titleTextElement = titleTextRef.current;

		const setFontSize = () => {
			const widthContainer = titleElement.clientWidth;
			const widthText = titleTextElement.clientWidth;

			if (widthText === 0) {
				return;
			}

			const fontSize = parseFloat(
				window.getComputedStyle(titleTextElement, null).getPropertyValue('font-size'),
			);
			const scaleFontSizeCalc = Math.floor(fontSize * (widthContainer / widthText));
			const scaleFontSize = scaleFontSizeCalc < 224 ? scaleFontSizeCalc : 224;

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
						<VisuallyHiddenLoader isFetching={isLoading} hiddenMessage={MESSAGES.titleLoading}>
							<h1 className={cl.title} ref={titleRef}>
								<span className={cl.text} ref={titleTextRef}>
									{title}
								</span>

								{!title && (
									<span className={cl.skeleton}>
										<Skeleton borderRadius={6} />
									</span>
								)}
							</h1>
						</VisuallyHiddenLoader>
					</div>
				</div>
			</section>
		</>
	);
};

export default Heading;
