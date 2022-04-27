import React from "react";
import MyLibrary from "./MyLibrary";
import AddNewBookModal from "./AddNewBookModal";

export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    coverImage: string;
};

interface LibraryState {
    myLibrary: Book[];
    filteredLibrary: Book[];
    searchInput: string;
};

export class Main extends React.Component {

    state: LibraryState = {
        myLibrary: [],
        filteredLibrary: [],
        searchInput: ""
    };

    // load My Library on start
    componentDidMount = () => {
        const myLibrary = JSON.parse(localStorage.getItem("myLibrary") ?? '[]');
        const filteredLibrary = myLibrary;
        this.setState({ myLibrary, filteredLibrary });
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        this.setState({ [input.name]: input.value });
    }

    addNewBook = (newBook: Book) => {
        this.state.myLibrary.unshift(newBook);
        try {
            localStorage.setItem("myLibrary", JSON.stringify(this.state.myLibrary));
        } catch (error) {
            console.error(`There was a problem setting 'myLibrary' key because: ${error}`)
        }


        this.setState({
            myLibrary: this.state.myLibrary
        });
    }

    searchLibrary = () => {
        const filteredLibrary =
            this.state.myLibrary.filter(
                book => {
                    return (
                        book.title.toLowerCase().includes(this.state.searchInput.toLowerCase())
                    );
                }
            )
        this.setState({ filteredLibrary });
    }

    clearSearch = () => {
        this.setState({
            searchInput: '',
            filteredLibrary: this.state.myLibrary
        });
    }

    render() {
        const libraryLength = this.state.myLibrary.length;
        const displayLibrary = libraryLength > 0;

        return (
            <div className="w-full">
                {/* Display if library is empty */}
                {!displayLibrary &&
                    <div>
                        <h3 className="text-gray-600 text-xl">The library is empty.</h3>
                        <h4 className="text-gray-500 text-base mb-5">Would you like to add a book?</h4>
                    </div>
                }

                {/* Add new book modal */}
                <AddNewBookModal addNewBookEvent={this.addNewBook} />

                {/* Search, display only when there is a library */}
                {displayLibrary &&
                    <div className="flex items-center border-b border-teal-500 py-2 my-10 sticky top-0 bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        <input name="searchInput" onChange={this.handleChange} type="text" placeholder="Search book titles..." value={this.state.searchInput}
                            className="appearance-none bg-transparent text-lg border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" />

                        {/* Clear search */}
                        {this.state.searchInput &&
                            <button onClick={this.clearSearch} className="text-red-500 mr-2" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </button>
                        }

                        <button onClick={this.searchLibrary} className="btn-primary" type="button">
                            Search
                        </button>
                    </div>
                }

                {/* Display collection count*/}
                {displayLibrary &&
                    <h3 className="text-base text-gray-700 mb-5">
                        Your collection contains {libraryLength} book{libraryLength > 1 && <span>s</span>}.
                    </h3>
                }

                {/* Display search result */}
                {this.state.filteredLibrary.length === 0 && displayLibrary &&
                    <h3 className="text-lg text-gray-600 italic">No title matches for "{this.state.searchInput}".</h3>
                }

                {/* Display Library */}
                <MyLibrary myLibrary={this.state.filteredLibrary} />
            </div>
        );
    }
}