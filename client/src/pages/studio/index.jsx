import { useDispatch, useSelector } from "react-redux";
import Player from "../stream/components/Player";
import StreamChat from "../stream/components/StreamChat";
import Select from "react-select";
import { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useMemo } from "react";
import Button from "../../components/button";
import { updateCategory } from "../../store/slices/categorySlice";

const Studio = () => {
  const { user } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const dispath = useDispatch();

  const [toggleStreamSettings, setToggleStreamSettings] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const categorySelectOptions = useMemo(() => {
    const options = [];
    categories.forEach((item) => {
      options.push({
        value: item.id,
        label: item.title,
      });
    });
    return options;
  }, [categories]);

  return (
    <main className="px-[28px] py-[48px]">
      <section className="flex items-center my-[28px]">
        <Player streamKey={user.streamKey} />
        <StreamChat id={user.streamKey} />
      </section>
      <section className="my-[18px] flex items-center">
        <Select
          options={categorySelectOptions}
          className="w-full"
          isSearchable
          onChange={(item) => setSelectedCategoryId(item.value)}
        />
        <Button
          title="Change category"
          onClick={() =>
            dispath(
              updateCategory({
                id: selectedCategoryId,
                streamKey: user.streamKey,
              })
            )
          }
        />
      </section>
      <section>
        <section className="flex justify-between items-center">
          <span className="text-white text-xl font-semibold">
            Stream settings
          </span>
          {toggleStreamSettings ? (
            <AiOutlineArrowUp
              onClick={() => setToggleStreamSettings(false)}
              className="text-white text-2xl cursor-pointer"
            />
          ) : (
            <AiOutlineArrowDown
              onClick={() => setToggleStreamSettings(true)}
              className="text-white text-2xl cursor-pointer"
            />
          )}
        </section>
        {toggleStreamSettings ? (
          <div className="px-[14px] py-[8px]">
            <span className="text-white font-semibold">
              Stream key: {user.streamKey}
            </span>
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default Studio;
