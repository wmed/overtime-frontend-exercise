export type BookInput = {
  title: string;
  author: string;
  isbn: string;
  image: string;
};

export type Book = {
  uuid: string
} & BookInput;
