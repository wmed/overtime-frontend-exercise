import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';

import { useBooksContext } from 'src/pages/books/BooksContext';
import { BookInput } from 'src/pages/books/types';
import { Button, FormikTextInput } from 'src/components';

const BookSchema = yup.object().shape({
  title: yup.string().required('Required'),
  author: yup.string().required('Required'),
  isbn: yup
    .string()
    .required('Required')
    .matches(/^\d{3}-\d{1}-\d{2}-\d{6}-\d$/i, 'eg. 978-3-16-148410-0'),
  image: yup.string(),
});

const initialBook = {
  title: '',
  author: '',
  isbn: '',
  image: '',
};

export default function BookForm() {
  const { createBook, updateBook, deleteBook, bookToEdit, setBookToEdit } = useBooksContext();
  const [formError, setFormError] = React.useState<string>('');
  const [initialValues, setInitialValues] = React.useState<BookInput>(initialBook);
  const isEditMode = !!bookToEdit;

  React.useEffect(() => {
    if (bookToEdit) {
      setInitialValues(bookToEdit);
    } else {
      setInitialValues(initialBook);
    }
  }, [bookToEdit]);

  const handleSubmit = (values: BookInput, { setSubmitting, resetForm }: FormikHelpers<BookInput>) => {
    try {
      setFormError('');
      if (isEditMode) {
        updateBook(bookToEdit.uuid, values);
      } else {
        createBook(values);
      }
      resetForm({ values: initialBook });
    } catch (err: unknown) {
      console.error(err);
      let message = 'Something went wrong!';
      if (err instanceof Error) message = err.message;
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setBookToEdit('');
  };

  const handleDelete = () => {
    bookToEdit && deleteBook(bookToEdit.uuid);
  };

  const formikConfig = {
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: BookSchema,
    enableReinitialize: true,
  };

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-semibold mb-3 lg:mb-5">{isEditMode ? 'Edit Book' : 'Create Book'}</h1>

      <div className="lg:max-w-lg">
        <Formik {...formikConfig}>
          {({ isSubmitting }) => (
            <Form>
              <FormikTextInput type="text" name="title" label="Title" className="w-full" />
              <FormikTextInput type="text" name="author" label="Author" className="w-full" />
              <FormikTextInput
                type="text"
                name="isbn"
                label="ISBN"
                placeholder="978-3-16-148410-0"
                className="w-full"
              />
              <FormikTextInput type="text" name="image" label="Image URL" className="w-full" />

              {formError && <p className="text-red-500">{formError}</p>}
              <div className="flex flex-row flex-wrap justify-between">
                <div className="mb-4">
                  <Button type="submit" disabled={isSubmitting} className="w-32">
                    {isEditMode ? 'Save' : 'Create'}
                  </Button>
                  {isEditMode && (
                    <Button variant="ternary" className="w-32 ml-4" onClick={handleDelete}>
                      Delete
                    </Button>
                  )}
                </div>
                {isEditMode && (
                  <Button variant="secondary" className="mb-4" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
