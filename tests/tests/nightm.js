var info = {
   
};

nightmare.wait( () => {
    /* Return true when the iframe is loaded */
    var iframe = document.querySelector("iframe[name='wc']");

    if (!iframe) {
        return false;
    }

    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    return iframeDocument.querySelector("#account_number") != null;
}).evaluate( (info) => {
    var iframe = document.querySelector("iframe[name='wc']");
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    iframeDocument.querySelector("#account_number").value = info.account;
    iframeDocument.querySelector("#card_security_code").value = info.security;
    //also use DOM to set proper date
    

    iframeDocument.querySelector("span#hpp-form-submit").click();
}, info).then( () => {
    console.log("submit done!");
}).catch((error) => {
    console.error("Error in iframe magic", error);
});