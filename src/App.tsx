import { BookSearch } from './components/BookSearch';
import { Bookshelf } from './components/Bookshelf';

function OvertimeBookshelfApp() {
  return (
    <div className="ot-app p-2">
      <h1 className="text-2xl">Overtime Bookshelf</h1>
      <BookSearch />
      <div className="mb-2" />
      <Bookshelf />
    </div>
  );
}

export default OvertimeBookshelfApp;
