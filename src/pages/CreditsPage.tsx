import Heading from '../components/UI/heading/Heading';
import Section from '../components/UI/section/Section';
import Text from '../components/UI/text/Text';

const CreditsPage = () => {
	return (
		<>
			<Heading title="Credits" />
			<Section>
				<Text>
					<h2>Design Attribution</h2>
					<p>
						This site’s design is taken from the Figma Community under the{' '}
						<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">
							CC BY 4.0
						</a>{' '}
						license. Modifications have been made.
					</p>
					<p>
						Original work:{' '}
						<a
							href="https://www.figma.com/community/file/1235152009438565697/the-blog-a-web-personal-blog"
							target="_blank"
						>
							The Blog - A Web Personal Blog
						</a>
						<br></br>
						Author: Faqih Sopyan
					</p>
				</Text>
			</Section>
		</>
	);
};

export default CreditsPage;
