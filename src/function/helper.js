//  A promise-based HTTP Client for node.js fot fetching data from 
const axios = require('axios');
let url = ['https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/authors.csv', 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv', 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv'];

//creating function to trigger url incase of multiple use case

const fetch = async (url) => {
    let data = await axios.get(url)
        .then((res) => { return { 'data': res.data, 'status': true } })
        .catch((err) => { return { 'data': "Try again later.", 'status': false } });
    return data;
};

/* 
 * Here csv string can be input and delimiter will help to seperate the csv
 */

let csv_to_json = (csv_string, delimiter, separator) => {
    let jsonArray = [];
    delimiter != undefined ? delimiter : ',';
    separator != undefined ? separator : '\n';
    let split_of_fetch = csv_string.trim().split(separator);
    let table_header = split_of_fetch.shift().split(delimiter);
    for (let i = 0; i < split_of_fetch.length; i++) {
        let value = split_of_fetch[i].split(';');
        const obj = {};
        table_header.forEach((element, index) => {
            obj[element] = value[index];
        });
        jsonArray.push(obj);
    }
    return jsonArray;
}

// function to print both book and magazine in json data structure
async function print_all_books_and_magazines() {
    const books = await fetch(url[1]);
    const magazines = await fetch(url[2]);
    if (books.status == true && magazines.status == true) {
        let json_books = csv_to_json(books.data, ';', '\n');
        const json_magazine = csv_to_json(magazines.data, ';', '\n');
        json_books = json_books.concat(json_magazine);
        // console.log(json_books);
        return json_books
    }
}

// function to find  book and magazine by isbn and email
/* unit test case for this would be 
 * case-1. when the user enter non existing isbn or wrong isbn format
 * case-2  when the user enter non existing isbn or wrong email format
 */

async function find_by({ type, value }) {
    if (type == 'isbn') {
        if (!value) {
            console.log('Please enter ISBN.');
            return
        }
        const query = await print_all_books_and_magazines();
        let obj = query.filter(o => o.isbn == value);
        if (obj.length < 1) {
            console.log('ISBN not found');
            return
        }
        // console.log(obj)
        return obj
    }
    else if (type == 'email') {
        if (!value) {
            console.log('Please enter email');
            return
        }
        const query = await print_all_books_and_magazines();
        let obj = query.filter(o => o.authors == value);
        if (obj.length < 1 || obj == undefined) {
            console.log('Email not found');
            return
        }
        // console.log(obj)
        return obj
    }
    else {
        console.log('Unknown search parameter');
    }

}

// function to sort book and magazine combined
// this function contain both accending and decending
async function sort_by(obj, value) {
    if (value == -1) {
        obj.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        });

    }
    else if (value == 1) {
        obj.sort((b, a) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        });
    }
    else {
        console.log('Please enter 1 for ascending and -1 for decending')
    }
};

module.exports ={
    find_by,
    sort_by,
    print_all_books_and_magazines,
    csv_to_json,
    fetch
}