const application = {
    formatHtmlBody(body, data){
        return `
            <h1> New Application Submitted</h1> 
            <h5>Yes hello! ${data.name}</h5>
            <h3>Please email us at ${data.email}</h3>
        `
    }

}


module.exports = application;