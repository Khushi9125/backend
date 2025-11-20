import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {  //req come from user bode m json data, file - is on multer file aa rhi h to multer use hoga ,cb = callback
    cb(null, "./public/temp") //directory and folder and file
  },
  filename: function (req, file, cb) { //below is for file name
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) //commented bcz usko bhut jyda decode kr rha 
    //cb(null, file.fieldname + '-' + uniqueSuffix) //callback - file ka field name
    cb(null, file.originalname)  //user n jo name upload kiya hai use s upload kr denge for now only...but cons - agr kisi n same name s kiya to porblm hogoi but local m kch second k liye rhegi to idhr manageable hai short projct m
  }
})

export const upload = multer({ 
    storage, //storage: storage
 })
