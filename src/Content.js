import ItemList from "./ItemList";

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p className="text-4xl italic text-center my-12 text-slate-400">
          You have no items!
        </p>
      )}
    </>
  );
};

export default Content;
