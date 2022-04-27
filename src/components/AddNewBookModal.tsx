import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { v4 as uuid } from 'uuid';
import type { Book } from './Main';

interface BookProps {
    addNewBookEvent: (value: Book) => void;
};

interface Errors {
    errorTitle: string;
    errorAuthor: string;
    errorISBN: string;
};

const AddNewBookModal = ({ addNewBookEvent }: BookProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState<Errors>();
    const [imageURL, setImageURL] = useState("");
    const [newBook, setNewBook] = useState<Book>({
        id: "",
        title: "",
        author: "",
        isbn: "",
        coverImage: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBook({ ...newBook, [event.target.name]: event.target.value });
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        let file = event.currentTarget.files ? event.currentTarget.files[0] : null;

        if (!file) {
            return;
        }

        let reader = new FileReader();

        reader.onload = (function (theFile) {
            return function (e: any) {
                setImageURL(e.target.result); //set to display image
                setNewBook({ ...newBook, coverImage: e.target.result });
            };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) {
            return;
        };

        const unique_id = uuid();
        const book: Book = {
            id: unique_id,
            title: newBook.title,
            author: newBook.author,
            isbn: newBook.isbn,
            coverImage: newBook.coverImage
        };

        addNewBookEvent(book);
        closeModal();
    }

    const validate = (): boolean => {
        let newErrors: Errors = {
            errorTitle: "",
            errorAuthor: "",
            errorISBN: ""
        };

        let valid: boolean = true;

        if (newBook.title.length === 0) {
            newErrors.errorTitle = "Title is required";
            valid = false;
        }

        if (newBook.author.length === 0) {
            newErrors.errorAuthor = "Author is required";
            valid = false;
        }

        if (newBook.isbn.length === 0) {
            newErrors.errorISBN = "ISBN is required";
            valid = false;
        }

        setErrors(newErrors);

        return valid;
    }

    function clearErrors() {
        setErrors({
            errorTitle: "",
            errorAuthor: "",
            errorISBN: ""
        });
    }

    function clearBook() {
        setNewBook({
            id: "",
            title: "",
            author: "",
            isbn: "",
            coverImage: ""
        })
    }

    function closeModal() {
        setIsOpen(false);
        setImageURL('');
        clearErrors();
        clearBook();
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <button className="btn-primary text-lg" type="button" onClick={openModal}>Add Book</button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                            leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <form onSubmit={(e) => handleSubmit(e)} className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-2xl font-bold text-center mb-3 text-gray-900">
                                    Add A New Book
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className='border border-gray-300 w-full'>
                                        {/* Add New Book */}
                                        <div className='sm:grid sm:grid-cols-3 sm:gap-6 p-6'>
                                            {/* Add Image */}
                                            <div className='text-center sm:h-full sm:bg-gray-200 flex content-around flex-wrap p-2'>
                                                <div className="block w-full margin-auto sm:h-44">
                                                    <input id="fileUpload" name="newBookCover" type="file" accept="image/*" onChange={handleFileSelect} hidden />
                                                    {imageURL.length > 0 &&
                                                        <img className="sm:h-full md:h-48 lg:h-56 h-32 max-h-full max-w-full m-auto" src={imageURL} alt="Book Cover" />
                                                    }
                                                </div>
                                                <div className="p-2 text-center block w-full">
                                                    <label htmlFor="fileUpload" className="cursor-pointer btn-primary inline-flex items-center mx-auto">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="md:hidden lg:inline-block h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                        <span>Upload Image</span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Add Inputs */}
                                            <div className='text-left col-span-2'>
                                                <div className='relative mb-5'>
                                                    <label className="form-label" htmlFor="newBookTitle">
                                                        Book Title
                                                        <span className="ml-2 error-label">{errors?.errorTitle}</span>
                                                    </label>
                                                    <input id="newBookTitle" type="text" placeholder="Title" name="title" onChange={handleChange} className="input-primary" />
                                                </div>
                                                <div className='relative my-5'>
                                                    <label className="form-label" htmlFor="newBookAuthor">
                                                        Author
                                                        <span className="ml-2 error-label">{errors?.errorAuthor}</span>
                                                    </label>
                                                    <input id="newBookAuthor" type="text" placeholder="Author" name="author" onChange={handleChange} className="input-primary" />
                                                </div>
                                                <div className='relative my-5'>
                                                    <label className="form-label" htmlFor="newBookISBN">
                                                        ISBN
                                                        <span className="ml-2 error-label">{errors?.errorISBN}</span>
                                                    </label>
                                                    <input id="newBookISBN" type="text" placeholder="ISBN" name="isbn" onChange={handleChange} className="input-primary" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 align-right flex justify-end">
                                    <button className='btn-primary mr-3'>
                                        Add Book
                                    </button>
                                    <button type="button" className="btn-cancel" onClick={closeModal}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}


export default AddNewBookModal