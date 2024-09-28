let booklist=[]
let currentPage=1
let itemsPerPage=5

const fetchbookss=document.querySelector('#fetchbooks')
let mainContainer=document.querySelector('#books-container')
let paginationcontainer=document.querySelector('#pagination-container')
let searchingInput=document.querySelector('#search')
let sortingItem=document.querySelector('#sorting')


fetchbooks.addEventListener('click',async()=>{
await fetch('https://api.nytimes.com/svc/books/v3/lists/2019-01-20/hardcover-fiction.json?api-key=QTd4H7HDVpLKhqIqtV42NmAthrt8ub4b')
.then((response)=>response.json())
.then((data)=>booklist=data.results.books)
.catch((error)=>console.error(error))
displayBooks()
})
function displayBooks(){
    mainContainer.innerHTML=""
    let filteredBooks=booklist.filter(book=>book.title.toLowerCase().includes(searchingInput.value.toLowerCase()))

if(sortingItem.value=='asc'){
    filteredBooks.sort((a, b)=>a.title.localeCompare(b.title))
}
else{
    filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
}

let paginatedBooks=filteredBooks.slice((currentPage-1)*itemsPerPage,(currentPage*itemsPerPage))

for(let i=0;i<paginatedBooks.length;i++){
    let bookimg=document.createElement('img')
    bookimg.src=paginatedBooks[i].book_image
    bookimg.height=100
    bookimg.width=100

    let title=document.createElement('div')
    title.textContent=paginatedBooks[i].title

    let description=document.createElement('div')
    description.textContent=paginatedBooks[i].description

    let container=document.createElement('div')
    container.appendChild(bookimg)
    container.appendChild(title)
    container.appendChild(description)
    mainContainer.appendChild(container)
}
displayPagination(filteredBooks.length)

}

searchingInput.addEventListener('input',()=>{
    currentPage=1
    displayBooks()
})

sortingItem.addEventListener('change',()=>{
    displayBooks()
})

function displayPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationcontainer = document.querySelector('#pagination-container');
    paginationcontainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayBooks();
        });
        paginationcontainer.appendChild(pageButton);
    }
}