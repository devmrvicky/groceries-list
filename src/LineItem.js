import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className="flex items-center p-2 gap-2 bg-slate-200 m-2 hover:bg-slate-300">
      <input
        onChange={() => handleCheck(item.id)}
        className="checkbox w-6 h-6 cursor-pointer"
        type="checkbox"
        checked={item.checked}
      />
      <label
        className={`item-name p-2 ${item.checked ? "line-through" : ""}`}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
      </label>
      <FaTrashAlt
        className="delete-btn ml-auto text-2xl text-teal-700 hover:text-red-500"
        role="button"
        tabIndex="0"
        onClick={() => handleDelete(item.id)}
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};

export default LineItem;
