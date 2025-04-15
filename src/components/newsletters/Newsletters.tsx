import Field from '@components/UI/field/Field';
import Section from '@components/UI/section/Section';
import Checkbox from '@components/UI/checkbox/Checkbox';
import Button from '@components/UI/Buttons/button/Button';
import FormSmall from '@components/Forms/formSmall/FormSmall';
import SuccessModal from '../Modals/successModal/SuccessModal';

import { Link } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { boolean, InferType, object, string } from 'yup';
import { policyUrl } from '@/routes/routes';
import { useState } from 'react';
import { useSendNewslettersMutation } from '@/api/formsSlice';
import { showError } from '@/utils/notification';
import { ERROR_MESSAGES } from '@/constants/error';

const formSchema = object({
	email: string().email().required(),
	policy: boolean().oneOf([true], ERROR_MESSAGES.policyCheckbox).required(),
});

type FormSchema = InferType<typeof formSchema>;

interface NewslettersProps {
	titleLevel?: 1 | 2;
	container?: boolean;
}

const Newsletters = ({ titleLevel, container = true }: NewslettersProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const { control, handleSubmit, reset } = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			email: '',
			policy: false,
		},
	});

	const [sendNewsletters, { isLoading }] = useSendNewslettersMutation();

	const onSubmit: SubmitHandler<FormSchema> = async () => {
		try {
			// не отправляем реальный email
			await sendNewsletters('example@example.com').unwrap();
			setIsOpen(true);
			reset();
		} catch (error) {
			showError(ERROR_MESSAGES.form);
			console.error(error);
		}
	};

	return (
		<>
			<Section
				title="Stories and interviews"
				subtitle="Newsletters"
				description="Subscribe to learn about new product features, the latest in technology, solutions, and updates."
				container={container}
				width="medium"
				titleSize="h1"
				titleLevel={titleLevel}
				center={true}
				marginBottom="large"
			>
				<FormSmall
					noValidate={true}
					aria-label="Subscribe to the newsletter"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Controller
						name="email"
						control={control}
						render={({ field, fieldState }) => (
							<Field
								type="email"
								label="Your email"
								isLabelHidden={true}
								placeholder="Enter your email"
								autoComplete="email"
								onChange={field.onChange}
								onBlur={field.onBlur}
								value={field.value}
								disabled={field.disabled}
								name={field.name}
								ref={field.ref}
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>
					<Controller
						name="policy"
						control={control}
						render={({ field, fieldState }) => {
							const labelPolicy = (
								<>
									<span>I agree to the </span>
									<Link to={policyUrl} target="_blank" className="link">
										privacy policy
									</Link>
								</>
							);

							return (
								<Checkbox
									label={labelPolicy}
									onChange={field.onChange}
									onBlur={field.onBlur}
									checked={field.value}
									disabled={field.disabled}
									name={field.name}
									ref={field.ref}
									center={true}
									aria-required={true}
									aria-invalid={fieldState.invalid}
									errorMessage={fieldState.error?.message}
								/>
							);
						}}
					/>

					<Button type="submit" disabled={isLoading}>
						Subscribe
					</Button>
				</FormSmall>
			</Section>

			<SuccessModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
};

export default Newsletters;
