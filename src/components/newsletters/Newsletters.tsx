import cl from './Newsletters.module.scss';
import Field from '../UI/field/Field';
import Section from '../UI/section/Section';
import Button from '../UI/button/Button';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useId } from 'react';

const formSchema = object({
	email: string().email().required(),
});

const Newsletters = () => {
	const idHead = useId();

	const { control, handleSubmit } = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = () => {};

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
			<form
				className={cl.form}
				onSubmit={handleSubmit(onSubmit)}
				aria-labelledby={idHead}
				noValidate={true}
			>
				<h3 id={idHead} className={'visually-hidden'}>
					Subscribe to the newsletter
				</h3>

				<div className={cl.body}>
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

					<Button type="submit" mobileFull={true}>
						Subscribe
					</Button>
				</div>
				<div className={cl.policy}>
					<Checkbox label="I agree to the" aria-required={true} />
				</div>
			</form>
		</Section>
	);
};

export default Newsletters;
