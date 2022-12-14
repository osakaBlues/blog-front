import Link from "next/link";

function Home({ API_URL }: { API_URL: string }) {
	return (
		<div>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/posts">Posts</Link>
				</li>
				<li>
					<Link href="/posts/[id]" as="/posts/1">
						Posts 1
					</Link>
				</li>
				<li>
					<Link href="/posts/write">Write</Link>
				</li>
			</ul>
			<h1>Blog Home</h1>
			<h1>{API_URL}</h1>
		</div>
	);
}

export async function getStaticProps() {
	const API_URL = process.env.API_URL;
	return {
		props: {
			API_URL,
		},
	};
}

export default Home;
