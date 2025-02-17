import Subscription from '../Forms/subscription/Subscription';
import Field from '../UI/field/Field';
import Section from '../UI/section/Section';

const Newsletters = () => {
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
			<Subscription title="Subscribe to the newsletter">
				<Field label="Your email" isLabelHidden={true} placeholder="Enter your email" />
			</Subscription>
		</Section>
	);
};

export default Newsletters;
