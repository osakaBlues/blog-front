import axios from "axios";
import Link from "next/link";

function Home({ memos }: any) {
	const handlePost = ({ title, content }: any) => {
		axios.post("http://localhost:3000/api/memo", { title, content });
	};

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
			{memos &&
				memos.map((memo: any) => (
					<div key={memo.id}>
						<h2>{memo.title}</h2>
						<p>{memo.content}</p>
					</div>
				))}
			<form onSubmit={handlePost}>
				<input type="text" name="title" />
				<input type="text" name="content" />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export async function getServerSideProps() {
	const res = await axios.get("http://localhost:3000/api/memo");
	const memos = res.data;
	return {
		props: {
			memos,
		},
	};
}

export default Home;
