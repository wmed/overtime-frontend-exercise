/**
 * This is all based off of what Project Gutenberg returns, but since we
 * reference these interfaces in multiple files i split them out into a
 * util to keep things clean.
 */

export interface Author {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

export interface BookFormat {
  'text/html': string;
  'image/jpeg': string;
}

export interface Book {
  id: number;
  title: string;
  authors: Author[];
  formats: BookFormat;
  bookshelves: string[];
}

export interface BookResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
  download_count: number;
}
