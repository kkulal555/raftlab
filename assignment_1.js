// Please read readme to run this script

// imports 
const fs = require('fs');
const json2csv = require('json2csv').Parser;
const parser = new json2csv();
const { csv_to_json, fetch, find_by, print_all_books_and_magazines, sort_by } = require('./src/function/helper');

// reference urls in array
let url = ['https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/authors.csv', 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv', 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv'];

// ASSIGNMENT
// 1. Write software that reads the CSV data (of books, magazines, and authors) given on the next page.
const task1 = async () => {
    // This reads author csv from the url endpoint
    console.log('----------Assigment-1-----------\n');
    await fetch(url[0]).then((result) => {
        console.log('=========| task-1 |===============\n\n----------|author|---------\n', result.data);
    })
    // This reads books csv from the url endpoint
    await fetch(url[1]).then((result) => {
        console.log('--------------|books|---------------\n', result.data);
    })
    // This reads magazine csv from the url endpoint
    await fetch(url[2]).then((result) => {
        console.log('\n-------------|magazines|--------------\n', result.data, '\n=========| task-1 ends here |======\n');
    })
}


// 2. Print out all books and magazines (on either console UI) with all their details (with a meaningful output format).
const task2 = async () => {
    await print_all_books_and_magazines().then((r) => {
        console.log('=======| task 2 |===========\n', r, '\n===========| task-2 end here |=======')
    })
}

// 3. Find a book or magazine by its ISBN.
const task3 = async() =>{
    await find_by({type:'isbn',value:'1215-4545-5895'}).then((r)=>{
        console.log('=======| task 3 |===========\n', r, '\n===========| task-3 end here |=======');
    })
}
// task3();

// 4. Find a book or magazine by its email.
const task4 = async() =>{
    await find_by({type:'email',value:'null-walter@echocat.org'}).then((r)=>{
        console.log('=======| task 4 |===========\n', r, '\n===========| task-4 end here |=======');
    })
}
// task4();

// 5. Print out all books and magazines with all their details sorted by title. This sort should be done for books and magazines together.

const task5 = async() =>{
    // we are using same function as of task-1 
    await print_all_books_and_magazines().then((r)=>{
        sort_by(r,1);
        console.log('=======| task 5 ascending sort |===========\n', r );
    })
    await print_all_books_and_magazines().then((r)=>{
        sort_by(r,-1);
        console.log('\n=======| task 5 decending sort |===========\n', r, '\n===========| task-5 end here |=======');
    })
}

// 6. Add a book and a magazine to the data structure of your software and export it to a new CSV file.
// * Output file can be found in src > output after running this function
const task6 = async () => {
    print_all_books_and_magazines().then(async (respon) => {
        console.log('==============| task 6 |============\n')
        respon.push({
            title: 'Raftlab',
            isbn: '1323-4545-8875',
            authors: 'kkulal555@gmail.com',
            publishedAt: '23.07.1998'
        })
        respon.push({
            title: 'Raftlab_magazine',
            isbn: '13-12-2022',
            authors: 'letsHirehim@raftlab.com',
            description: 'Find your self a guy who can make this work in OUR way'
        })
        const csvData = parser.parse(respon);
        fs.writeFile('/src/output/raftlabs.csv', csvData,function (err,res){
            console.log('File saved in src > output\n\n==============| task6 ended here |============\n');
        });
    })
}
task6();