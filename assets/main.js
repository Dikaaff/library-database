document.addEventListener("DOMContentLoaded", function () {
  renderBooks();
});

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const isComplete = document.getElementById("isComplete").checked;

  if (title === "" || author === "" || year === "") {
    alert("Harap isi semua kolom!");
    return;
  }

  const book = {
    id: +new Date(),
    title,
    author,
    year: parseInt(year),
    isComplete,
  };

  const books = getBooks();
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

function renderBooks() {
  const unfinishedList = document.getElementById("unfinishedList");
  const finishedList = document.getElementById("finishedList");
  unfinishedList.innerHTML = "";
  finishedList.innerHTML = "";

  const books = getBooks();
  books.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = `${book.title} - ${book.author} (${book.year})`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.onclick = () => deleteBook(book.id);
    li.appendChild(deleteButton);

    if (book.isComplete) {
      const moveButton = document.createElement("button");
      moveButton.textContent = "Pindahkan ke Rak Belum Selesai";
      moveButton.onclick = () => moveBook(book.id, false);
      li.appendChild(moveButton);
      finishedList.appendChild(li);
    } else {
      const moveButton = document.createElement("button");
      moveButton.textContent = "Pindahkan ke Rak Selesai";
      moveButton.onclick = () => moveBook(book.id, true);
      li.appendChild(moveButton);
      unfinishedList.appendChild(li);
    }
  });
}

function deleteBook(id) {
  const books = getBooks().filter((book) => book.id !== id);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

function moveBook(id, isComplete) {
  const books = getBooks();
  const index = books.findIndex((book) => book.id === id);
  books[index].isComplete = isComplete;
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

function getBooks() {
  return JSON.parse(localStorage.getItem("books")) || [];
}
