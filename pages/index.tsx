import Link from "next/link";

export default function Home() {
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
		</div>
	);
}
