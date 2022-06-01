import { BooksProvider } from 'src/pages/books/BooksContext';
import BookForm from 'src/pages/books/BookForm';
import BookInventory from 'src/pages/books/BookInventory';

export default function InventoryPage() {
  return (
    <BooksProvider>
      <div className="container relative mx-auto my-10 lg:my-14 px-5 lg:px-8">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-16">
          <div className="col-span-12 lg:col-span-5">
            <BookForm />
          </div>
          <div className="col-span-12 lg:col-span-7">
            <BookInventory />
          </div>
        </div>
      </div>
    </BooksProvider>
  );
}
