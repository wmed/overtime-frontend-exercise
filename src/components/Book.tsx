import React from 'react';
import type { Book } from './Main';
import noimage from '../no-image.png';

interface BookProps {
    bookObject: Book
}

const BookObject = ({ bookObject }: BookProps) => {
    return (
        <div>
            <div className="grid grid-cols-4 gap-4 py-10 ">
                <div className="sm:h-48 h-28 m-auto">
                    {bookObject.coverImage ?
                        <img className="max-h-full max-w-full" src={bookObject.coverImage} alt="Book Cover" />
                        : <img src={noimage} alt="No Cover Uploaded" className="border border-gray-200" />
                    }
                </div>
                <div className="text-left text-lg col-span-3">
                    <h2 className="text-2xl"><i>{bookObject.title}</i></h2>
                    <h4 className="mb-5">by <b>{bookObject.author}</b></h4>
                    <h4>ISBN: {bookObject.isbn}</h4>
                </div>
            </div>
        </div>
    )
}

export default BookObject;