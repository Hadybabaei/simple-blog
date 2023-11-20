
function errorMiddleware (
    error,
    req,
    res,
    next
){
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";
    console.log(error.message)
    res.status(status).send({
        status,
        message
    })
}

module.exports =  errorMiddleware;