import Article from '../components/article/Article';
import Sidebar from '../components/sidebar/Sidebar';
import RecentPosts from '../components/recentPosts/RecentPosts';
import Newsletters from '../components/newsletters/Newsletters';
import HiddenLoading from '../components/hiddenLoading/hiddenLoading';
import ErrorWrapper from '../components/errorWrapper/ErrorWrapper';

import { throwNotFoundIfInvalid } from '../utils/error';
import { useParams } from 'react-router';
import { useGetPostByIdQuery } from '../api/postsSlice';
import { ERROR_MESSAGES } from '../constants/error';
import { MESSAGES } from '../constants/messages';

const PostPage = () => {
	const params = useParams<{ id?: string }>();
	const postId = throwNotFoundIfInvalid(params.id);

	const { data, isLoading, isError, error } = useGetPostByIdQuery(postId);

	return (
		<Sidebar reverse={true}>
			<Sidebar.Main>
				<HiddenLoading isFetching={isLoading} hiddenMessage={MESSAGES.postLoading}>
					<ErrorWrapper
						isError={isError}
						error={error}
						isThrowNotFound={true}
						errorMessage={ERROR_MESSAGES.postLoad}
					>
						<Article post={data ?? null} />
					</ErrorWrapper>
				</HiddenLoading>

				<Newsletters />
			</Sidebar.Main>

			<Sidebar.Aside title="Recent blog posts">
				<RecentPosts limit={5} excludeId={postId} direction="vertical" />
			</Sidebar.Aside>
		</Sidebar>
	);
};

export default PostPage;
