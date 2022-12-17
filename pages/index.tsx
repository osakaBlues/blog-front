import axios from "axios";
import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const url = "http://osakablues.site/api/memo";

function Home({ memos, errorCode, req }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handlePost = (e: any) => {
    e.preventDefault();
    axios.post("/api/memo", {
      title,
      content,
    });

    setTitle("");
    setContent("");
    alert("작성되었습니다.");
    router.push("/");
  };
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
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

export async function getServerSideProps({ req }: any) {
  const res = await axios.get("/api/memo");
  return {
    props: { memos: res, req },
  };
}

export default Home;
