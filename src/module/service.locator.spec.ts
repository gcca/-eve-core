import { ServiceLocator } from './index';  // './service.locator';

describe('ServiceLocator', () => {
  describe('on construction', () => {
    interface Book {
      author: string;
      title: string;
    }

    interface BookFinder {
      find(): Book[];
    }

    interface BookReader {
      read(): string;
    }

    interface BookFilenameLocator {
      bookFilename: string;
    }

    interface BookFinderLocator {
      bookFinder: BookFinder;
    }

    interface BookReaderLocator {
      bookReader: BookReader;
    }

    class BookServiceLocator
        extends ServiceLocator
        implements BookFilenameLocator,
                   BookFinderLocator,
                   BookReaderLocator {

      constructor(public bookFilename: string,
                  public bookFinder: BookFinder,
                  public bookReader: BookReader) { super(); }
    }

    class HorrorBookFinder implements BookFinder {
      find() {
        const locator = BookServiceLocator.locator<BookServiceLocator>();
        const reader = locator.bookReader
        const books = reader.read();
        return books.split('\n').map(line =>
          (([author, title]) => ({ author, title }))(line.split(':')));
      }
    }

    class ColonBookReader implements BookReader {
      read(): string {
        const locator = BookServiceLocator.locator<BookServiceLocator>();
        const filename = locator.bookFilename;
        if ('colon_horror_books' == filename) {
          return ('H.P. Lovecraft:The Dunwich Horror\n' +
                  'Stephen King: DOCTOR SLEEP');
        }
        throw new Error(`File '${filename}' not found`);
      }
    }

    class BookLister {
      booksWrittenBy(author: string): Book[] {
        const locator = BookServiceLocator.locator<BookServiceLocator>();
        const finder = locator.bookFinder;
        const books = finder.find();
        return books.filter(book => author == book.author);
      }
    }

    it('should locate finder and reader to list', () => {
      BookServiceLocator.load(new BookServiceLocator('colon_horror_books',
                                                     new HorrorBookFinder,
                                                     new ColonBookReader));
      const bookLister = new BookLister();
      const books = bookLister.booksWrittenBy('H.P. Lovecraft');
      expect(books).not.to.be.null;
      expect('The Dunwich Horror').to.equal(books[0].title);
    });
  });
});
