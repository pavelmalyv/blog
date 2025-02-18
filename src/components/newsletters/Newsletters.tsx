import Field from '../UI/field/Field';
import Section from '../UI/section/Section';
import Checkbox from '../UI/checkbox/Checkbox';
import Button from '../UI/button/Button';
import FormSmall from '../Forms/formSmall/FormSmall';

import { Link } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { boolean, InferType, object, string } from 'yup';
import { policyUrl } from '../../routes/routes';
import { useId } from 'react';
import { ERROR_MESSAGES } from '../../constants/error';
import { useSendNewslettersMutation } from '../../api/formsSlice';
import { toast } from 'react-toastify';

const formSchema = object({
	email: string().email().required(),
	policy: boolean().oneOf([true], ERROR_MESSAGES.policyCheckbox).required(),
});

type FormSchema = InferType<typeof formSchema>;

const Newsletters = () => {
	const idHead = useId();
	const showFormError = () => toast.error(ERROR_MESSAGES.form);

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
			reset();
		} catch (error) {
			showFormError();
			console.error(error);
		}
	};

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
			<FormSmall
				title="Subscribe to the newsletter"
				aria-labelledby={idHead}
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
								<Link to={policyUrl} className="link">
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
	);
};

export default Newsletters;
