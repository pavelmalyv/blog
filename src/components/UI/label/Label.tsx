import classNames from 'classnames';
import cl from './Label.module.scss';

interface LabelProps {
	htmlFor: string;
	isLabelHidden?: boolean;
	children: React.ReactNode;
}

const Label = ({ htmlFor, isLabelHidden = false, children }: LabelProps) => {
	return (
		<label htmlFor={htmlFor} className={classNames(cl.label, { 'visually-hidden': isLabelHidden })}>
			{children}
		</label>
	);
};

export default Label;
