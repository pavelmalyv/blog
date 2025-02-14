import type { Tags } from '../../../types/tags';

import cl from './Tags.module.scss';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';

interface TagsProps {
	tags: Tags | null;
}

const Tags = ({ tags }: TagsProps) => {
	const tagsList = tags ?? (new Array(3).fill(null) as null[]);

	const style = {
		height: 24,
		borderRadius: 16,
	};

	return (
		<ul className={cl.tags}>
			{tagsList.map((item, i) => {
				if (item) {
					return (
						<li className={classNames(cl.item, cl['item-tag'])} key={item} style={style}>
							{item}
						</li>
					);
				} else {
					return (
						<li className={cl.item} key={i}>
							<Skeleton width="4em" height={style.height} borderRadius={style.borderRadius} />
						</li>
					);
				}
			})}
		</ul>
	);
};

export default Tags;
