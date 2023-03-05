import {fetchMovieAvailability,fetchMovieList} from "./api.js"
// fetch data
fetchMovieList().then((data)=> {
    console.log(data);
	movieShow(data);
    
});

function movieShow(data){
document.getElementById("loader").remove();
    const main=document.getElementById("main");
    const div=document.createElement("div");
    div.className="movie-holder";
   main.append(div);
   for(let element of data){
    let a=document.createElement("a");
    a.className="movie-link";
    a.href=`/${element.name}`;
    a.innerHTML=`<div class="movie" data-d='${element.name}'>
    <div class="movie-img-wrapper" style="background-image:url('${element.imgUrl}');">
    </div>
    <h4>${element.name}</h4>
    </div`;
       a.addEventListener("click",movieShow2);
       div.append(a);
   }
}
// move available

function movieShow2(event){
    event.preventDefault();
    const div1=document.createElement("div");
    div1.id='loader';
    div1.textContent="Loading...";
    const bookergridholder=document.getElementById("booker-grid-holder")
bookergridholder.append(div1);
const movieName=event.target.querySelector(".movie");
fetchMovieAvailability(movieName).then((data)=>{
   createdGrid(data);
})
    

}

let flag=true;

function createdGrid(data){
    console.log("click");
    document.getElementById("loader").remove();
    if(flag) return;
    flag=true;
    const pNode=document.getElementById("booker-grid-holder");
    let h3=document.createElement("h3");
    h3.classList.toggle('v-none');
    let node=document.createElement("div");
    let node1=document.createElement("div");
    node.className="booking-grid";
    node1.className='booking-grid';
    pNode.append(node,node1);
    for(let i=0;i<=12;i++){
        const div=document.createElement("div");
        div.id=`booking-grid-${i}`;
        div.textContent=i;
        if(data.includes(i))
            div.className="unavailable-seat";
        else{
            div.className="available-seat";
            div.addEventListener("click",func1);

        }

       node.append(div);
    }
    for(let i=13;i<=24;i++){
        const div=document.createElement("div");
        div.id=`booking-grid-${i}`;
        if(data.includes(i))
            div.className="unavailable-seat";
        else{
            div.className="available-seat";
            div.addEventListener("click",func1);
        }
        div.textContent=i;
        node1.append(div);
    }

}

// function func1(event) {
//     console.log("click1");
// 	if (!event.currentTarget.className.includes('selected-seat'))
// 		event.currentTarget.classList.add('selected-seat');
// 	else event.currentTarget.classList.remove('selected-seat');
// 	if (document.getElementsByClassName('selected-seat').length > 0)
// 		document.getElementById('book-ticket-btn').className = '';
// 	else document.getElementById('book-ticket-btn').className = 'v-none';
// }

// const bookTicketButton=document.getElementById("book-ticket-btn");
// bookTicketButton.addEventListener("click",func2);
// let seat=[];
// function func2(){
//     console.log("click2");
//     let booker=document.getElementById("booker");
//     let selectedSeat=document.getElementsByClassName("selected-seat");
//     for(let element of selectedSeat){
//         seat.push(element.textContent);
//     }
//     booker.innerHTML="";
//     const div=document.createElement("div");
//     div.id="confirm-purchase";
//     booker.append(div);
//     let h3=document.createElement("h3");
//     h3.textContent=`Confirm your booking for seat numbers:${seat.join(',')}`;
//     div.append(h3);
//     const frm = document.createElement('form');
// 	frm.id = 'customer-detail-form';
// 	frm.setAttribute('onsubmit', 'event.preventDefault();');
// 	dv.append(frm);
// 	frm.innerHTML = `<div>Email <input type="email" required/> </div>
//     <div>Phone number <input type="tel" required/></div>
//     <div><button type="submit">Purchase</button> </div>`;
// 	document.querySelector('button').addEventListener('click', func3);

// }
// function func3(){
//     console.log("click3");
//     let inputData=document.getElementsByTagName("input");
//      let email=inputData[0].value;
//      let phoneNumber=document.inputData[1].value;
//      let booker=document.getElementById("booker");
//      booker.innerHTML=" ";
//      let div=document.createElement("div");
//      div.id="success";
//      booker.append(div);
//      div.innerHTML=`<h3>Booking details</h3>
//      <div>Seats: ${seat.join(', ')}</div>
//      <div>Phone number:${phoneNumber}</div>
//      <div>Email:${email}</div>`
// }
