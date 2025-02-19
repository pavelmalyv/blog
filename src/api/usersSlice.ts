import type { User } from '../types/users';

import { apiSlice } from './apiSlice';
import { userSchema } from '../schemas/usersSchemas';

const usersSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getUserById: build.query<User, string>({
			query: (id) => `user/${id}`,
			transformResponse: async (response: unknown) => {
				const result = addAdditionalFieldsPost(response);
				return userSchema.validate(result);
			},
		}),
	}),
});

export const { useGetUserByIdQuery, useLazyGetUserByIdQuery } = usersSlice;

// адаптация публичного api под проект
function addAdditionalFieldsPost(user: unknown) {
	if (typeof user === 'object' && user !== null && 'id' in user && typeof user.id === 'number') {
		//image
		const colors = ['00605E', '006992', '5D5D5D'];
		const colorMain = colors[user.id % colors.length];
		const image = {
			src: `https://dummyjson.com/image/2500x1140/${colorMain}/ffffff?text=Author+%23${user.id}&fontFamily=poppins&type=jpg`,
			webp: `https://dummyjson.com/image/2500x1140/${colorMain}/ffffff?text=Author+%23${user.id}&fontFamily=poppins&type=webp`,
			width: 2500,
			height: 1140,
			alt: `Author #${user.id}`,
		};

		//description
		const description =
			'As a passionate and experienced UI designer, I am dedicated to creating intuitive and engaging user experiences that meet the needs of my clients and their users. I have a strong understanding of design principles and a proficiency in design tools, and I am comfortable working with cross-functional teams to bring projects to fruition. I am confident in my ability to create designs that are both visually appealing and functional, and I am always looking for new challenges and opportunities to grow as a designer.';

		//skills
		const skills = `
			<ul>
				<li>Extensive experience in UI design, with a strong portfolio of completed projects</li>
				<li>Proficiency in design tools such as Adobe Creative Suite and Sketch</li>
				<li>Excellent visual design skills, with a strong understanding of layout, color theory, and typography</li>
				<li>Ability to create wireframes and prototypes to communicate design concepts</li>
				<li>Strong communication and collaboration skills, with the ability to work effectively with cross-functional teams</li>
				<li>Experience conducting user research and gathering insights to inform design decisions</li>
				<li>Proficiency in HTML, CSS, and JavaScript</li>
			</ul>`;

		//experience
		const experience = `
			<ul>
				<li>5 years of experience as a UI designer, working on a variety of projects for clients in the tech and retail industries</li>
				<li>Led the design of a successful e-commerce website, resulting in a 25% increase in online sales</li>
				<li>Created wireframes and prototypes for a mobile banking app, leading to a 20% increase in app usage</li>
				<li>Conducted user research and usability testing to inform the redesign of a healthcare provider's website, resulting in a 15% increase in website traffic</li>
			</ul>
		`;

		return {
			...user,
			image,
			description,
			skills,
			experience,
		};
	}

	return user;
}
//
