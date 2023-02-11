import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  const inputRef = useRef();

  return (
    <form
      className="flex items-center border border-slate-500 pl-2 mb-2"
      onSubmit={handleSubmit}
    >
      <input
        autoFocus
        ref={inputRef}
        className="flex-1 p-2 outline-none"
        type="text"
        placeholder="Enter item here..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        required
      />
      <button
        type="submit"
        className="add-item-btn bg-slate-200 h-full w-10 flex justify-center cursor-pointer focus:outline-none"
        aria-label="Add button"
        onClick={() => inputRef.current.focus()}
      >
        <FaPlus className="text-2xl h-full px-1 text-teal-700 hover:text-teal-900" />
      </button>
    </form>
  );
};

export default AddItem;
