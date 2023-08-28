const process = require('process');
const fs = require('fs');
const path = require('path');

const availableCommands = `
  Use commands below to interact with the script:
  node app.js createdir (directory name) : creates directory
  node app.js createfile/editfile (filename).txt (file content) : creates or edits text file
  node app.js list : lists directory content
  node app.js readcontent (filename).txt
  node app.js deletecontent (filename.txt)
`;
console.log(availableCommands)
const inputCommand = process.argv[2];
//creating directory
// - when create-dir is called, it takes in one parameter(name of dir) and creates that
function createDir(dirname){
	const directory = path.join(__dirname, dirname);
	fs.mkdir(directory, {}, err => {
		if (err) throw err;
		console.log('directory created');
	})
}
//creating files
// - when createfile is run it creates a file
function createFile(filename, content){
	fs.writeFile(filename, content, 'utf8', err => {
		if(err) throw err;
		console.log('File Saved');
	} )
}
// //list contents 
function listContent(){
	fs.readdir(__dirname, {}, (err, files) => {
		console.log(files)
	})
}
//reading files
function readContent(filePath){
	fs.readFile(filePath, 'utf8', (err, data) => {
		console.log(data)
	})
}
//deleting files
function deleteContent(filePath){
	fs.unlink(filePath, err => {
		console.log('file deleted');
	})
}

if (inputCommand == 'createdir') {
		createDir(process.argv[3]);
} else if (inputCommand == 'createfile' || inputCommand == 'editfile'){
	createFile(process.argv[3], process.argv.splice(4, process.argv.length - 1).join(' '));
} else if (inputCommand == 'list') {
	listContent();
} else if (inputCommand == 'readcontent') {
	readContent(process.argv[3]);
} else if (inputCommand == 'deletecontent') {
	deleteContent(process.argv[3]);
} else if (inputCommand === '') {
  console.log(`Please provide a command.\n${availableCommands}`);
}


