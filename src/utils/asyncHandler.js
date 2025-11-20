/*1st method : promise me krke approach utltity function bna kr 
promise invoke kiya resolve kr diya, catch s reject/resolve kiya hai */

const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err) => next(err))
    }
}



export {asyncHandler}





/* 2nd method wraper fucntion 
steps for async fucchtion higher order
// const asyncHandler = () => {}
// const asyncHandler = (func) => {} //acpt as fucntion
// const asyncHandler = (func) => () => {} //futther ek or fucntion m pass kr diya
// const asyncHandler = (func) => async () => {} //agr async bnata ho to async pass krdo



const asyncHandler = (fn) => async (req, res, next) => {
    try{
        await fn(req,res,next) //fucntion jo liya hai usko execute krna h  ye ek wrapper fucntion bnata hai jo easy banata hai
    } catch(error){
        res.sattus(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}

*/
