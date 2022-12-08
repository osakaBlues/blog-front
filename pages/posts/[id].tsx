import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Post } from ".";

export default function PostsId() {
	const [post, setpost] = useState({} as Post);
	const router = useRouter();
	const { id } = router.query;

	const backendUrl: string = "http://localhost:3000/api/v1/posts";

	useEffect(() => {
		if (id) {
			axios.get(backendUrl + "/" + id).then((res) => {
				setpost(res.data);
			});
		}
	}, [backendUrl, id]);

	const deletePost = () => {
		const isDelete = confirm("정말 삭제하시겠습니까?");
		if (!isDelete) return;

		axios.delete(backendUrl + "/" + id).then((res) => {
			alert("삭제되었습니다.");
			router.push("/");
		});
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
			<h1>{id}번 포스트</h1>
			{post && (
				<div>
					<h1>{post.title}</h1>
					<p>{post.content}</p>
					<p>{post.author}</p>
					<p>{post.category}</p>
					<p>{post.date}</p>
				</div>
			)}
			<button onClick={deletePost}>삭제</button>
		</div>
	);
}
