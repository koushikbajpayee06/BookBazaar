const BOOKS_API_URL = "http://127.0.0.1:8000/api/books/";

export async function fetchBooks({
  search = "",
  category = "all",
  topRated = false,
  limit = 12,
  offset = 0,
  signal,
} = {}) {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (category !== "all") {
    params.set("category", category);
  }

  if (topRated) {
    params.set("min_rating", "4.7");
  }

  params.set("limit", String(limit));
  params.set("offset", String(offset));

  const response = await fetch(`${BOOKS_API_URL}?${params}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Could not load books (${response.status})`);
  }

  const data = await response.json();

  return data.map((book) => ({
    ...book,
    author: book.author_name,
    image: book.image_url,
  }));
}