import { useEffect, useState } from "react";
import axios from "axios";
import InputControl from "../../input";
import { Link } from "react-router-dom";

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      const users = await axios.post("http://localhost:3000/api/user/find", {
        username: searchValue,
      });
      setUsers(users.data);
    }, 200);
  }, [searchValue]);

  return (
    <section className="hidden md:block relative w-[350px]">
      <InputControl
        placeholder="search"
        type="search"
        onChange={setSearchValue}
      />
      <section
        className={`${
          searchValue !== ""
            ? "absolute mt-[12px] px-[18px] py-[28px] overflow-y-auto z-10 w-full h-[240px] bg-[#3C096C] rounded-[10px]"
            : "hidden"
        }`}
      >
        {users.map((user, idx) => (
          <Link to={`/page/${user.id}`} key={user.id}>
            <div className={`${idx !== 0 ? "mt-[14px]" : ""}`}>
              <span className="text-white text-md">{user.username}</span>
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
};

export default Searchbar;
