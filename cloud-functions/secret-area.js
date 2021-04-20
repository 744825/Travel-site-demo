exports.handler = function(event, context, callback){
    const secretContent = `
    <h3>Welcome to the Karan</h3>
    <p> Here we can tell you that skt is bule that is <strong>Karan</strong></p>`
    
    let body
    
    if(event.body){
        body =JSON.parse(event.body)
    } else{
        body = {}
    }

    if (body.password == "karan") {
        
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
