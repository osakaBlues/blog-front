import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Post {
	author: string;
	category: string;
	title: string;
	content: string;
	date: string;
}

export default function Posts() {
	const [post, setpost] = useState([] as Post[]);

	const backendUrl = process.env.BACKEND_URL_POSTS || "";

	useEffect(() => {
		axios.get(backendUrl).then((res) => {
			setpost(res.data);
		});
	}, [backendUrl]);

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
			{post &&
				post.map((item: Post) => {
					return (
						<div key={item.title}>
							<h1>{item.title}</h1>
							<p>{item.author}</p>
							<p>{item.category}</p>
							<p>{item.content}</p>
							<p>{item.date}</p>
						</div>
					);
				})}
		</div>
	);
}
