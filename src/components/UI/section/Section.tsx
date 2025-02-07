import cl from './Section.module.scss';

interface SectionProps {
	title: string;
	children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
	return (
		<section className="section">
			<div className="container">
				<div className={cl.head}>
					<h2 className="h2">{title}</h2>
				</div>

				{children}
			</div>
		</section>
	);
};

export default Section;
