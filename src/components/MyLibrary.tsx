import React from 'react';
import type { Book } from './Main';
import BookObject from './Book';

interface IMyLibrary {
    myLibrary: Book[];
}

const MyLibrary = ({ myLibrary }: IMyLibrary) => {
    return (
        <div className="divide-y divide-gray-400">
            {myLibrary.map(bookObject =>
                <BookObject key={bookObject.id} bookObject={bookObject} />
            )}
        </div>
    )
}

export default MyLibrary;