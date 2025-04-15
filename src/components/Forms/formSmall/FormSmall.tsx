import classNames from 'classnames';
import cl from './FormSmall.module.scss';

type FormSmallProps = React.ComponentProps<'form'> & {
	children: React.ReactNode;
};

const FormSmall = ({ children, className, ...props }: FormSmallProps) => {
	return (
		<form className={classNames(cl.form, className)} {...props}>
			{children}
		</form>
	);
};

export default FormSmall;
