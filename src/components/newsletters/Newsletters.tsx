import cl from './Newsletters.module.scss';
import Field from '../UI/field/Field';
import Section from '../UI/section/Section';
import Button from '../UI/button/Button';

import { useId } from 'react';

const Newsletters = () => {
	const idHead = useId();

	return (
		<Section
			title="Stories and interviews"
			subtitle="Newsletters"
			description="Subscribe to learn about new product features, the latest in technology, solutions, and updates."
			container={false}
			width="medium"
			titleSize="h1"
			center={true}
			marginBottom="large"
		>
			<form className={cl.form} aria-labelledby={idHead} noValidate={true}>
				<h3 id={idHead} className={'visually-hidden'}>
					Subscribe to the newsletter
				</h3>

				<div className={cl.body}>
					<Field
						type="email"
						label="Your email"
						isLabelHidden={true}
						placeholder="Enter your email"
						autoComplete="email"
						aria-required={true}
					/>

					<Button type="submit" mobileFull={true}>
						Subscribe
					</Button>
				</div>
			</form>
		</Section>
	);
};

export default Newsletters;
