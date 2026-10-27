const { sequelize, Author, Book } = require('./models');

async function main() {
  try {
    await sequelize.authenticate();
    console.log(' Подключение к базе данных успешно установлено.');

    await sequelize.sync({ force: true });
    console.log('Таблицы созданы (sync force: true).\n');

    const tolkien = await Author.create({ name: 'J. R. R. Tolkien', country: 'United Kingdom' });
    const rowling = await Author.create({ name: 'J. K. Rowling', country: 'United Kingdom' });
    console.log('Созданы авторы:');
    console.log(` - ${tolkien.name} (${tolkien.country})`);
    console.log(` - ${rowling.name} (${rowling.country})\n`);
    
    await tolkien.createBook({ title: 'The Hobbit', year: 1937, genre: 'Fantasy' });
    await tolkien.createBook({ title: 'The Fellowship of the Ring', year: 1954, genre: 'Fantasy' });
    await rowling.createBook({ title: "Harry Potter and the Philosopher's Stone", year: 1997, genre: 'Fantasy' });

    const tolkienCount = await tolkien.countBooks();
    console.log(`Специальный метод: у Толкина ${tolkienCount} книги.\n`);

    console.log('=== Жадная загрузка: Авторы и их книги ===');
    const authorsWithBooks = await Author.findAll({
      include: [{
        model: Book,
        as: 'books', 
      }],
    });

    for (const author of authorsWithBooks) {
      console.log(`Автор: ${author.name}`);
      for (const book of author.books) {
        console.log(`   «${book.title}» (${book.year})`);
      }
    }
    console.log();

    console.log('=== Жадная загрузка: Книги и их авторы ===');
    const booksWithAuthors = await Book.findAll({
      include: [{
        model: Author,
        as: 'author',
      }],
      order: [['year', 'ASC']],
    });

    for (const book of booksWithAuthors) {
      console.log(`Книга: «${book.title}» — Автор: ${book.author.name}`);
    }

  } catch (error) {
    console.error('Произошла ошибка:', error);
  } finally {
    await sequelize.close();
    console.log('\n Соединение с БД закрыто.');
  }
}

main();