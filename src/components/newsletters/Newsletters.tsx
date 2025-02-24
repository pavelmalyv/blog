import Field from '@components/UI/field/Field';
import Section from '@components/UI/section/Section';
import Checkbox from '@components/UI/checkbox/Checkbox';
import Button from '@components/UI/button/Button';
import FormSmall from '@components/Forms/formSmall/FormSmall';
import SuccessModal from '@components/Modals/successModal/successModal';

import { Link } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { boolean, InferType, object, string } from 'yup';
import { policyUrl } from '@/routes/routes';
import { useId, useState } from 'react';
import { ERROR_MESSAGES } from '@/constants/error';
import { useSendNewslettersMutation } from '@/api/formsSlice';
import { toast } from 'react-toastify';

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
	const headId = useId();
	const [isOpen, setIsOpen] = useState(false);

	const { control, handleSubmit, reset } = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			email: '',
			policy: false,
		},
	});

	const [sendNewsletters, { isLoading }] = useSendNewslettersMutation();

	const showFormError = () => toast.error(ERROR_MESSAGES.form);

	const onSubmit: SubmitHandler<FormSchema> = async () => {
		try {
			// не отправляем реальный email
			await sendNewsletters('example@example.com').unwrap();
			setIsOpen(true);
			reset();
		} catch (error) {
			showFormError();
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
					title="Subscribe to the newsletter"
					aria-labelledby={headId}
					noValidate={true}
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
