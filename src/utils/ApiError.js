class ApiError extends Error { //class create
    constructor(    //constructor liay and we will overwrite also
        statusCode, //statuscode zaruri h constructuror m
        message = "Something went wrong", //message jarori hai to ek likh diya
        errors = [], //errors agr multiple erro pass krni h to
        statck = "" //eror statck 
    ){
        super(message) //overwriting here
        this.statusCode = statusCode //overwrite here
        this.data = null //usually it will be null in nodejs --- read it
        this.message = message
        this.success = false //succes msg is false bcz here handling error , uska flag false jyega but msg jyega
        this.errors = errors

        if(statck){
            this.stack = statck
        } else{
            Error.captureStackTrace(this,this.construtor) //stacktrack me uska instance pas kr diya h
        }
    }
}

export { ApiError } //exporting apierror class