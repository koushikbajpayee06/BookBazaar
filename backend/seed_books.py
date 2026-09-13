from sqlalchemy import select

from app.database import SessionLocal
from app.models.user import User
from app.models.book import Book


# title, author, category, price, demo rating, ISBN
SAMPLE_BOOKS = [
    (
        "Atomic Habits",
        "James Clear",
        "Self Help",
        499,
        4.8,
        "9780735211292",
    ),
    (
        "The Psychology of Money",
        "Morgan Housel",
        "Finance",
        399,
        4.7,
        "9780857197689",
    ),
    (
        "Deep Work",
        "Cal Newport",
        "Productivity",
        450,
        4.6,
        "9781455586691",
    ),
    (
        "Clean Code",
        "Robert C. Martin",
        "Programming",
        699,
        4.7,
        "9780132350884",
    ),
    (
        "The Pragmatic Programmer",
        "Andrew Hunt and David Thomas",
        "Programming",
        749,
        4.8,
        "9780135957059",
    ),
    (
        "Ikigai",
        "Héctor García and Francesc Miralles",
        "Self Help",
        350,
        4.4,
        "9780143130727",
    ),
    (
        "Rich Dad Poor Dad",
        "Robert Kiyosaki",
        "Finance",
        299,
        4.5,
        "9781612681139",
    ),
    (
        "The Alchemist",
        "Paulo Coelho",
        "Fiction",
        299,
        4.6,
        "9780062315007",
    ),
    (
        "Effective Java",
        "Joshua Bloch",
        "Programming",
        899,
        4.9,
        "9780134685991",
    ),
    (
        "Designing Data-Intensive Applications",
        "Martin Kleppmann",
        "Programming",
        1299,
        4.9,
        "9781449373320",
    ),
    (
        "Essentialism",
        "Greg McKeown",
        "Productivity",
        449,
        4.5,
        "9780804137386",
    ),
    (
        "Getting Things Done",
        "David Allen",
        "Productivity",
        499,
        4.6,
        "9780143126560",
    ),
    (
        "The Richest Man in Babylon",
        "George S. Clason",
        "Finance",
        249,
        4.3,
        "9780451205360",
    ),
    (
        "The Midnight Library",
        "Matt Haig",
        "Fiction",
        399,
        4.4,
        "9780525559474",
    ),
    (
        "The Hobbit",
        "J. R. R. Tolkien",
        "Fiction",
        499,
        4.8,
        "9780547928227",
    ),
]


def seed_books():
    email = input("Existing admin email: ").strip()

    if not email:
        print("Email is required.")
        return

    with SessionLocal() as db:
        try:
            admin = db.scalar(
                select(User).where(User.email == email)
            )

            if admin is None:
                print("User not found. Check the registered email.")
                return

            if admin.role != "admin":
                print("This user does not have the admin role.")
                return

            added = 0
            skipped = 0

            for title, author, category, price, rating, isbn in SAMPLE_BOOKS:
                existing = db.scalar(
                    select(Book).where(
                        Book.title == title,
                        Book.author_name == author,
                    )
                )

                if existing is not None:
                    skipped += 1
                    print(f"Skipped: {title}")
                    continue

                book = Book(
                    title=title,
                    author_name=author,
                    category=category,
                    description=(
                        f"{title} by {author}. "
                        f"A sample listing in the {category} collection."
                    ),
                    price=price,
                    rating=rating,
                    image_url=(
                        "https://covers.openlibrary.org/b/isbn/"
                        f"{isbn}-L.jpg"
                    ),
                    stock=15,
                    created_by_id=admin.id,
                )

                db.add(book)
                added += 1

            db.commit()

            print(f"\nAdded: {added}")
            print(f"Skipped: {skipped}")
            print("Sample books saved successfully.")

        except Exception:
            db.rollback()
            print("Seeding failed. Changes were rolled back.")
            raise


if __name__ == "__main__":
    seed_books()