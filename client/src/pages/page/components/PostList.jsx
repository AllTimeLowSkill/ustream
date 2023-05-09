import Avatar from "../../../components/avatar";

const PostList = ({ list }) => {
  return (
    <section className="container flex flex-col items-center mt-[18px]">
      {list.map((item, id) => (
        <div
          className={`${
            id === 0 ? "" : "mt-[18px]"
          } rounded-[10px] bg-[#240046] px-[24px] py-[18px] w-full`}
          key={item.post.id}
        >
          <header className="flex justify-between items-center">
            <div className="flex items-center">
              <Avatar img={item.avatar} />
              <span className="text-xl text-white font-semibold ml-[14px]">
                {item.post.title}
              </span>
            </div>
          </header>
          <main className="py-[12px]">
            <p className="text-white">{item.post.content}</p>
          </main>
        </div>
      ))}
    </section>
  );
};

export default PostList;
