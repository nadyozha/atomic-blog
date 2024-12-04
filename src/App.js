import { PostProvider } from "./PostContext";
import Button from "./Button";
import { Main } from "./Main";
import { Footer } from "./Footer";
import Header from "./Header";
import Archive from "./Archive";

export default function App() {
	return (
		<section>
			<Button />

			<PostProvider>
				<Header />
				<Main />
				<Archive />
				<Footer />
			</PostProvider>
		</section>
	);
}