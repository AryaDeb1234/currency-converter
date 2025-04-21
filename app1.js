const base_url="https://v6.exchangerate-api.com/v6/ee512714d40cc837090fb20e/latest";

const dropdowns=document.querySelectorAll(".dropdown select");

let btn=document.querySelector("form button");

const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");

const msg=document.querySelector(".msg");

for(let select of dropdowns){
 for (currcode in countryList){
    // console.log(code,countryList[code]);
    let newoption=document.createElement("option");
    newoption.innerHTML=currcode;
    newoption.value=currcode;
    if (select.name==="from" && currcode==="USD") {
        newoption.selected="selected";
    }else if (select.name==="to" && currcode==="INR") {
        newoption.selected="selected";
    }
    select.append(newoption);
 }

 select.addEventListener("change",updateflg);
}

function updateflg(){
    let currcode=this.value;
    let countrycode=countryList[currcode];
    let newsrc="https://flagsapi.com/"+countrycode+"/flat/64.png";
    let img=this.parentElement.querySelector("img");
    img.src=newsrc;
}

 function btnfunc(event){
    event.preventDefault();
    updateexchangerate();
}

async function updateexchangerate(){
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval===""||amtval<1){
        amtval=1;
        amount.value="1";
    }
//    console.log(fromcurr.value,tocurr.value);
    const URL=base_url+"/"+fromcurr.value; 
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data.conversion_rates[String(tocurr.value)];
    // console.log(String(tocurr.value));
    console.log(rate);

    let finalamount= amtval *rate;
    msg.innerHTML=amtval+" "+fromcurr.value+" = "+finalamount+" "+tocurr.value;
}

window.addEventListener("load",updateexchangerate);

btn.addEventListener("click",btnfunc); 