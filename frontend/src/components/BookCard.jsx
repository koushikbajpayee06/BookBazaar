const BookCard = ({ bookData }) => {
  const {
    title,
    author,
    category,
    price,
    rating,
    image,
    description,
  } = bookData;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      {image ? (
        <img
          className="h-72 w-full shrink-0 bg-gray-100 object-contain p-3"
          src={image}
          alt={title}
        />
      ) : (
        <div className="flex h-72 shrink-0 items-center justify-center bg-gray-100 text-gray-500">
          No cover available
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-14 text-xl font-bold leading-7 text-gray-900">
          {title}
        </h3>

        <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-gray-600">
          {author}
        </p>

        <p className="mt-2 truncate text-sm font-medium text-gray-500">
          {category}
        </p>

        <p className="mt-3 line-clamp-3 min-h-18 text-sm leading-6 text-gray-600">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <p className="text-lg font-bold text-orange-600">
            ₹{price}
          </p>

          <p className="whitespace-nowrap text-sm font-semibold text-green-600">
            ⭐ {rating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;