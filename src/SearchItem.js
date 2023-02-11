const SearchItem = ({ search, setSearch }) => {
  return (
    <form className="flex" onSubmit={(e) => e.preventDefault()}>
      <input
        className="flex-1 p-2 border outline-none border-slate-500"
        type="search"
        role="searchbox"
        placeholder="Search items"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
