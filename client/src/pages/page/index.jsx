import Avatar from "../../components/avatar";
import { useMemo, useState } from "react";
import InputControl from "../../components/input";
import { useEffect } from "react";
import { PageService } from "../../api/page.service";
import { useParams } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import CreatePostForm from "./components/CreatePostForm";
import { PostService } from "../../api/post.service";
import PostList from "./components/PostList";

const Page = () => {
  const { id } = useParams();

  const { user } = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    avatar: "",
    firstname: "",
    lastname: "",
    posts: [],
    username: "",
  });
  const [toggleAddPostForm, setToggleAddPostForm] = useState(false);
  const [val, setVal] = useState("");

  const handleAddPost = async ({ title, content }) => {
    const post = await PostService.addPost(id, { title, content });
    setUserData((prev) => {
      prev.posts.push(post);
      return { ...prev };
    });
  };

  useEffect(() => {
    async function fetchUserData() {
      const data = await PageService.getUserData(id);
      setUserData(data);
    }

    fetchUserData();
  }, [id]);

  const postsMemo = useMemo(
    () =>
      userData.posts.filter((post) =>
        post.post.title.toLowerCase().includes(val.toLowerCase())
      ),
    [val, userData]
  );

  if (!userData) {
    return <h1 className="text-3xl text-white font-semibold">Loading...</h1>;
  } else {
    return (
      <main className="px-[28px] py-[48px]">
        <header className="flex items-center">
          <Avatar size="xl" img={userData.avatar} />
          <section className="ml-[18px]">
            <span className="text-white text-xl font-semibold">
              {userData.username}
            </span>
            <p className="text-white text-base mt-[12px]">
              {userData.firstname} {userData.lastname}
            </p>
          </section>
        </header>
        <section className="flex items-center my-[28px]">
          <InputControl placeholder="Enter post title" onChange={setVal} />
          {id === user.id ? (
            <IoCreateOutline
              onClick={() => setToggleAddPostForm(!toggleAddPostForm)}
              className="text-white text-3xl ml-[12px]"
            />
          ) : null}
        </section>
        {toggleAddPostForm ? (
          <CreatePostForm handleSendData={handleAddPost} />
        ) : null}
        <PostList list={postsMemo} />
      </main>
    );
  }
};

export default Page;
