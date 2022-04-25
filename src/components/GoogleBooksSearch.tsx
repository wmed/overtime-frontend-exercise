import { IBook } from "../contexts/Books";

const GoogleBooksSearch = ({
  onSelect,
}: {
  onSelect: (book: IBook) => void;
}) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    //Should have a spinnner here and make sure were ignoring slow returns that don't match the latest search

    //Should extract a type from the google endpoint
    const { items }: { items: any[] } = await (
      await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          e.target.value
        )}`
      )
    ).json();

    //Eventually would want a dropdown here
    const item = items.shift();
    if (!item) {
      return;
    }
    onSelect({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors.shift(),
      isbn: item.volumeInfo.industryIdentifiers.shift()?.identifier,
      image: item.volumeInfo.imageLinks.thumbnail,
    });
  };

  return (
    <input
      type="search"
      placeholder="Search Google Books"
      onChange={onChange}
    />
  );
};

export default GoogleBooksSearch;
