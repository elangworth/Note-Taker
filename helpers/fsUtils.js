const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
//function to write data to the JSON file

const writetoFile = (desination, content) => 
    fs.writeFile(desination, JSON.stringify(content, null, 4), (err) => {
        err ? console.error(err) : console.info(`\n Data written to ${desination}`)
    });

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data)
            parsedData.push(content);
            writetoFile(file, parsedData);
        }
    });
};  

module.exports = {
    readFromFile,
    writetoFile,
    readAndAppend
}