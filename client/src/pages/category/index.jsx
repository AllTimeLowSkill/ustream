import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StreamList from "../main/components/StreamList";

const Category = () => {
  const { streams } = useSelector((state) => state.streams);
  const { categories } = useSelector((state) => state.category);
  const { id } = useParams();

  const categoeyStreams = useMemo(
    () => streams.filter((stream) => stream.category === id),
    [id, streams]
  );

  const category = useMemo(() => {
    const local = JSON.parse(sessionStorage.getItem("category"));
    if (!local || id !== local.id) {
      const tmp = categories.find((item) => item.id === id);
      sessionStorage.setItem("category", JSON.stringify(tmp));
      return tmp;
    } else {
      return local;
    }
  }, [id]);

  return (
    <div className="px-[28px] py-[48px]">
      <header className="flex">
        <img
          className="w-[180px] h-[240px] rounded-[10px]"
          src={`http://localhost:9000/category-image/${category.image}`}
          alt="Category"
        />
        <section className="px-[28px] flex flex-col justify-between h-[240px]">
          <span className="text-[40px] text-white font-semibold">
            {category.title}
          </span>
          <p className="text-white text-base">{category.desc}</p>
        </section>
      </header>
      <section className="mt-[40px]">
        {categoeyStreams ? <StreamList streams={categoeyStreams} /> : null}
      </section>
    </div>
  );
};

export default Category;
