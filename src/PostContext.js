import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
	return {
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body: faker.hacker.phrase(),
	};
}

//1) Create a context
const PostContext = createContext();

function PostProvider({ children }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [posts, setPosts] = useState(() =>
		Array.from({ length: 30 }, () => createRandomPost())
	);

	const searchedPosts =
		searchQuery.length > 0
			? posts.filter((post) =>
				`${post.title} ${post.body}`
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			)
			: posts;

	function handleAddPost(post) {
		setPosts((posts) => [post, ...posts]);
	}

	function handleClearPosts() {
		setPosts([]);
	}

	return (
		//2) Provide value to child components
		<PostContext.Provider value={{
			posts: searchedPosts,
			searchQuery: searchQuery,
			onClearPosts: handleClearPosts,
			setSearchQuery: setSearchQuery,
			onAddPost: handleAddPost,
		}}>
			{children}
		</PostContext.Provider>
	)
}

function usePosts() {
	const context = useContext(PostContext);
	if (context === undefined) {
		throw new Error('PostContext used outside of the PostProvider');
	}
	return context;
}

export { PostProvider, usePosts };