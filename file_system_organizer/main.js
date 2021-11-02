#!/usr/bin/env node
let inputArr = process.argv.slice(2); // as the first two arguments are node and the name of the file
let helpobj = require("./commands/help");
let treeobj = require("./commands/tree");
let organizeobj = require("./commands/orgnize");
//console.log(inputArr);
let fs = require("fs");
let path = require("path");
let command  = inputArr[0];
let types  = {
   media: ["mp4" , "mkv"] , 
   archives: ['zip' , '7z' , 'rar' , 'tar' , 'gz' , 'ar' , 'iso' , "xz"] , 
   documents: ['docx' , 'doc' , 'pdf' , 'xlsx' , 'xls' , 'odt' , 'ods' , 'odp' , 'odg' , 'odf' , 'txt ' , 'ps' , 'tex'] , 
   app: ['exe' , 'dmg' ,  'pkg' , "deb"] 
}
switch(command)
{
   case "tree" :
      treeobj.treekey(inputArr[1]);  // 0th index has the name of the command and the 1st index has the directory path
   break;
   case "organize" :
    organizeobj.organizekey(inputArr[1]);
   break;
   case "help" :
    helpobj.helpkey(inputArr[1]);
   break;
   default :
   console.log("Input the correct command");
   break;
}




