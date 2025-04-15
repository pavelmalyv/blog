import type { Tags } from '@/types/tags';

import cl from './Tags.module.scss';
import Skeleton from 'react-loading-skeleton';

interface TagsProps {
	tags: Tags | null;
}

const Tags = ({ tags }: TagsProps) => {
	const tagsList = tags ?? (new Array(3).fill(null) as null[]);

	return (
		<ul className={cl.tags}>
			{tagsList.map((item, i) => (
				<li key={item ?? i} className={cl.item}>
					{item ? (
						<div className={cl.tag}>{item}</div>
					) : (
						<Skeleton className={cl.skeleton} width="4em" />
					)}
				</li>
			))}
		</ul>
	);
};

export default Tags;
