exports.handler = function(event, context, callback){
    const secretContent = `
    <h3>Welcome to the secret area</h3>
    <p> Here we can tell you that skt is bule that is <strong>BLUE</strong></p>`
    
    let body
    
    if(event.body){
        body =JSON.parse()
    } else{
        body = {}
    }

    if (body.password == "javascript") {
        
    callback(null, {
        statusCode: 200,
        body: secretContent
    })
    } else {
        callback(null, {
            statusCode: 401
        })
    }



}