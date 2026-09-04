import { useParams } from "react-router-dom";
import bookList from "../data/bookList";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const BookDetails = () => {
  const { bookId } = useParams();


 const dispatch = useDispatch()
    const handleAddItem = () => {
      //  dispatch an action
      dispatch(addItem(book))
    };

  const book = bookList.find(
    (currentBook) => currentBook.id === bookId
  );

  // console.log("Book ID:", bookId);
  // console.log("Matching book:", book);

  if (!book) {
    return <h1>Book not found</h1>;
  }

  const {
    title,
    author,
    category,
    price,
    rating,
    image,
    description,
    } = book;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
                <img
                src={image}
                alt={title}
                className="max-h-150 full rounded-xl object-cover shadow-lg"
                />
            </div>
            <div className="flex flex-col justify-center">
                <p className="font-semibold text-orange-600">{category}</p>
                <h1 className="mt-2 text-4xl font-bold text-gray-900">{title}</h1>
                <p className="mt-3 text-lg text-gray-600">By {author}</p>
                <p className="mt-4 font-semibold text-green-600">⭐ {rating}</p>
                <p className="mt-6 leading-7 text-gray-600">{description}</p>
                <p className="mt-6 text-2xl font-bold text-orange-600">₹{price}</p>
                <button type="button" 
                    className="mt-8 w-fit rounded-lg bg-orange-600 px-7 py-3 font-semibold text-white transition hover:bg-orange-700"
                    onClick={handleAddItem}
                >Add to Cart
                </button>
            </div>
        </div>
    </main>
  );
};

export default BookDetails;