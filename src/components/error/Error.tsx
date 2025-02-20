import cl from './Error.module.scss';
import Button from '../UI/button/Button';
import { useId } from 'react';

interface ErrorProps {
	title: string;
	description: string;
	isLink?: boolean;
}

const Error = ({ title, description, isLink = true }: ErrorProps) => {
	const titleId = useId();

	return (
		<section className={cl.error} aria-labelledby={titleId}>
			<div className="container">
				<div className={cl.body}>
					<h1 id={titleId} className={cl.title}>
						{title}
					</h1>
					<div className={cl.description}>{description}</div>

					{isLink && <Button>Home</Button>}
				</div>
			</div>
		</section>
	);
};

export default Error;
