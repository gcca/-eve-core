import { ServiceLocator } from './index';  // './service.locator';

describe('ServiceLocator', () => {
  describe('on construction', () => {
    interface Book {
      author: string;
      title: string;
    }

    interface BookFinder {
      find(filename: string): Book[];
    }

    interface BookReader {
      read(filename: string): string;
    }

    interface BookFinderLocator {
      bookFinder: BookFinder;
    }

    interface BookReaderLocator {
      bookReader: BookReader;
    }

    class BookServiceLocator
        extends ServiceLocator
        implements BookFinderLocator,
                   BookReaderLocator {

      constructor(public bookFinder: BookFinder,
                  public bookReader: BookReader) { super(); }
    }

    class HorrorBookFinder implements BookFinder {
      find(filename: string) {
        const locator = BookServiceLocator.locator<BookServiceLocator>();
        const reader = locator.bookReader
        const books = reader.read(filename);
        return books.split('\n').map(line =>
          (([author, title]) => ({ author, title }))(line.split(':')));
      }
    }

    class ColonBookReader implements BookReader {
      read(filename: string): string {
        if ('books' == filename) {
          return ('H.P. Lovecraft:The Dunwich Horror\n' +
                  'Stephen King: DOCTOR SLEEP');
        }
        throw new Error(`File ${filename} not found`);
      }
    }

    class BookLister {
      booksWrittenBy(author: string): Book[] {
        const locator = BookServiceLocator.locator<BookServiceLocator>();
        const finder = locator.bookFinder;
        const books = finder.find('books');
        return books.filter(book => author == book.author);
      }
    }

    it('should locate finder and reader to list', () => {
      BookServiceLocator.load(new BookServiceLocator(new HorrorBookFinder,
                                                     new ColonBookReader));
      const bookLister = new BookLister();
      const books = bookLister.booksWrittenBy('H.P. Lovecraft');
      expect('The Dunwich Horror').to.equal(books[0].title);
    });
  });
});
