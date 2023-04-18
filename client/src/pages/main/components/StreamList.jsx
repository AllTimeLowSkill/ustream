import StreamListItem from "./StreamListItem";

const StreamList = ({ streams }) => {
  return (
    <section className="mt-[38px]">
      <header className="mb-[12px]">
        <p className="text-white text-3xl font-semibold">
          <span className="text-[#E0AAFF]">Live channels</span> you might like
        </p>
      </header>
      <div className="grid grid-cols-5 gap-7">
        {streams
          ? streams.map((stream) => (
              <StreamListItem
                key={stream.streamId}
                streamKey={stream.streamId}
                username={stream.username}
                avatar={stream.avatar}
                id={stream.category}
              />
            ))
          : null}
      </div>
    </section>
  );
};

export default StreamList;
