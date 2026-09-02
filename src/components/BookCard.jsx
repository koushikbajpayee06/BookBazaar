
const BookCard = ({bookData}) => {
    const {title, author, category, price, rating, image, description} = bookData;
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition">
        <img className="w-full h-72 object-cover" src={image} alt={title} />
       <div  className="p-5">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p  className="mt-1 text-sm text-gray-600">{author}</p>
            <p className="mt-2 text-sm font-medium text-gray-500">{category}</p>
            <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-bold text-orange-600">₹{price}</p>
                <p className="text-green-600 font-semibold">Rating: ⭐ {rating}</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
       </div>
    </div>
  )
}

export default BookCard
