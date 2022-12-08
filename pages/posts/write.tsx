import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Write() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [author, setAuthor] = useState("");
	const [category, setCategory] = useState("");
	const [date, setDate] = useState(new Date());

	const router = useRouter();

	const backendUrl: string = process.env.BACKEND_URL_POSTS || "";

	const handleSubmit = (e: any) => {
		e.preventDefault();
		axios.post(backendUrl, {
			author,
			category,
			title,
			content,
			date,
		});

		setTitle("");
		setContent("");
		setAuthor("");
		setCategory("");
		setDate(new Date());

		alert("글이 등록되었습니다.");
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
					<Link href="/posts/write">Write</Link>
				</li>
			</ul>
			<h1>Write Post</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<label htmlFor="content">Content</label>
				<input
					type="text"
					id="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>

				<label htmlFor="author">Author</label>
				<input
					type="text"
					id="author"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>

				<label htmlFor="category">Category</label>
				<input
					type="text"
					id="category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				/>

				<label htmlFor="date">Date</label>
				<input
					type="date"
					id="date"
					value={date.toLocaleDateString()}
					onChange={(e) => setDate(new Date(e.target.value))}
				/>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
