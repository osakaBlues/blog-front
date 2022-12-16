import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function Home({ memos }: any) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const router = useRouter();

	const handlePost = (e: any) => {
		e.preventDefault();
		axios.post("http://localhost:3000/api/memo", { title, content });

		setTitle("");
		setContent("");
		alert("작성되었습니다.");
		router.push("/");
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
			<form onSubmit={handlePost}>
				<input
					type="text"
					placeholder="제목"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					type="text"
					placeholder="내용"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button type="submit">작성</button>
			</form>
			{memos &&
				memos.map((memo: any) => (
					<div key={memo.id}>
						<h2>{memo.title}</h2>
						<p>{memo.content}</p>
					</div>
				))}
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
