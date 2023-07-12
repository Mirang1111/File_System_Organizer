let fs = require("fs");
let path = require("path");
/*
tasks to do -> input is given as a directory path .
go inside that and create an organized folder
check categories of all the files present in that input directory 
Copy files to that organized directory inside of any of the category folder
*/
function organizefn(dirpath){
 // 1. input -> directory path 
 let destpath;
 // sometimes the path may be undefined so check for it
 if(dirpath==undefined)
 {
    destpath = process.cwd();
  //console.log("Kindly enter the path");
  return ;
 }
 else{
  // check if the path exists or not
    let doesexist = fs.existsSync(dirpath);
    if(doesexist)
    {
          // 2. create a directory of the name organize files if the directory path does not exist
     // creates the path and not the directory    
     destpath =  path.join(dirpath , "organized_files");
     // we run it once only , so keep a check already
     // only create if the folder corresponding to the path is not present
         if(fs.existsSync(destpath)==false)
         {
         fs.mkdirSync(destpath);
         }
    }
    else
    {
           console.log("Enter the correct path");
           return ;
    }
 }
 // very imp function
 // passsing the source and destination -> jisko organize karna hain aur jiske andar saari files put karni hain
 organizehelper(dirpath , destpath);

 

}

function organizehelper(src , dest)
{
   // 3. identify categories of all the files present in that input directory->
 // get all the files present in the src
 //childname has name of all the files present in the src path.
 // this is a problem as we need path and not the name only
  let childname =  fs.readdirSync(src);
 // console.log(childname);
 // why loop ?
 // for joining src with childname 
 for(let i = 0 ; i< childname.length ; i++)
 {
  // joins the src with childname and we get the path (address)
   let childpath =  path.join(src , childname[i]);
  // since we only deal with files and not the folder , check if it is a file or a folder
   let isFile  = fs.lstatSync(childpath).isFile();  // check whether it is a file or not 
   if(isFile)
   {
     // console.log(childname[i]);     
      let category = getcategory(childname[i]);   
      console.log(childname[i] , "belongs to -->" , category);
    // most imp function
    /*
    now send the file (childpath) to dest folder where the subfolder category is present
    (inside the dest folder)
    */
      sendfiles(childpath,dest, category);

   }
 }
  
}
// name of of the file is passed
function getcategory(name)
{
 // we get the extension of the file
   let ext = path.extname(name);
  // console.log(ext);
 // slice removes . from the extension -> eg .png changes to png
  ext = ext.slice(1);

 // working of the loop
 /*
 ek ek karke saare types aa jaenge
 simply the loop checks for the extension (ext)
 */
  for(let type in types )
  {
     let ctypearray = types[type];
     for(let i = 0 ; i< ctypearray.length ; i++)
     {
      // ext matches so return the type
        if(ext== ctypearray[i])
        {
           return type;
        }
     }
  }
 // if not , then return others
  return "others";
}

function sendfiles(srcfile , dest , category)
{
   let categorypath = path.join(dest , category);
   if(fs.existsSync(categorypath)==false)
   {
      fs.mkdirSync(categorypath);
   }
   let filename  = path.basename(srcfile);
   let destfilepath = path.join(categorypath , filename);
   fs.copyFileSync(srcfile , destfilepath);
}
module.exports={
 organizekey:organizefn
}
