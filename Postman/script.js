//Utility functions
function getElementFromString(string){
    let div=document.createElement("div");
    div.innerHTML=string;
    return div.firstChild;
}

let paramBox=document.getElementById("parametersBox");
let jsonBox=document.getElementById("jsonBox");
paramBox.style.display="none";

let jsonRadio=document.getElementById("jsonRadio");
let customRadio=document.getElementById("customRadio");

jsonRadio.addEventListener("click",()=>{
    jsonBox.style.display="block";
    paramBox.style.display="none";
});

customRadio.addEventListener("click",()=>{
    jsonBox.style.display="none";
    paramBox.style.display="block";
});

var i=2;
let addParameter=document.getElementById("addParameter");
addParameter.addEventListener("click",(e)=>{
    let string=`<div class="form-group row my-3">
    <label for="inputPassword" class="col-sm-2 col-form-label"
        >Parameter ${i}</label
    >
    <div class="col-sm-10">
        <div class="row">
            <div class="col-sm-5">
                <input
                    type="text"
                    class="form-control paramKey"
                    placeholder="Enter Parameter ${i} Key"
                    aria-label="First name"
                />
            </div>
            <div class="col-sm-6">
                <input
                    type="text"
                    class="form-control paramValue"
                    placeholder="Enter Parameter ${i} Value"
                    aria-label="Last name"
                />
            </div>
            <div class="col">
                <button type="button" class="removeParam btn btn-primary">-</button>
            </div>
        </div>
    </div>
    </div>`
    let ele=document.getElementById("newParametersBox");

    ele.appendChild(getElementFromString(string));
    // console.log(e);
    i++;

    // event listener to remove param
    let removeParam=document.getElementsByClassName("removeParam");
    for(elem of removeParam){
        elem.addEventListener("click", (e)=>{
            e.target.parentElement.parentElement.parentElement.parentElement.remove();
        })
    }
})

// Event listener for submit button

document.getElementById("submit").addEventListener("click",(e)=>{
    e.preventDefault();
    let url=document.getElementById("url").value;
    let requestType=document.querySelector("input[name='requestType']:checked").value;
    let contentType=document.querySelector("input[name='contentType']:checked").value;

    let response=document.getElementById("responseBox");
    response.innerHTML="Fetching Response... Please Wait...";

    //data
    let data="";
    if(contentType=='customParameter')
    {
        data={};
        let paramKey=document.getElementsByClassName("paramKey");
        let paramValue=document.getElementsByClassName("paramValue");
        for(let j=0;j<paramKey.length;j++)
        {
            data[paramKey[j].value]=paramValue[j].value;
        }
        data=JSON.stringify(data);
    }
    else data=document.getElementById("jsonRequest").value;
    console.log(data);

    //request type
    if(requestType=='GET')
    {
        fetch(url).then(respons=>respons.text()).then(dat=>{
            response.innerHTML=dat;
            Prism.highlightAll();
            console.log(dat);
        }).catch(()=>{
            response.innerHTML='Warning: Invalid Request...';

        })
    }
    else{
        fetch(url,{
                method: 'POST',
                body:data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then(respons=>respons.text()).then(dat=>{
            response.innerHTML=dat;
            Prism.highlightAll();
            console.log(dat);
        }).catch(()=>{
            response.innerHTML='Warning: Invalid Request...';

        })
    }

    //reset form
    document.querySelector("form").reset();

})
