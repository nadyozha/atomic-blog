import { useState } from "react";
import { usePosts } from "./PostContext";
import { faker } from "@faker-js/faker";

function createRandomPost() {
	return {
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body: faker.hacker.phrase(),
	};
}

export default function Archive() {
	const [showArchive, setShowArchive] = useState(false);
	const { onAddPost } = usePosts();
	const [posts] = useState(() =>
		Array.from({ length: 100 }, () => createRandomPost())
	);

	return (
		<aside>
			<h2>Post archive</h2>
			<button onClick={() => setShowArchive((s) => !s)}>
				{showArchive ? "Hide archive posts" : "Show archive posts"}
			</button>

			{showArchive && (
				<ul>
					{posts.map((post, i) => (
						<li key={i}>
							<p>
								<strong>{post.title}:</strong> {post.body}
							</p>
							<button onClick={() => onAddPost(post)}>Add as new post</button>
						</li>
					))}
				</ul>
			)}
		</aside>
	);
}