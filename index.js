var countTitle=0;
var countDate=0;


var state={
    'page':1,
    'rows':10,
    'window':10
}


sortByTitleodd();
// say();


// *********************************************************************************************************************************
function pagination(querySet,page,rows){
    var trimStart=(page-1)*rows;
    var trimEnd=trimStart+rows;
    var TrimData=querySet.slice(trimStart,trimEnd);
    var pages=Math.ceil(querySet.length/rows);
    return {
        'querySet':TrimData,
        'pages':pages
    }
}
var count=1;

// *************************************************************************
function pageButton(pages){
    var wrapper=document.getElementById('pagination_wrapper')
    wrapper.innerHTML="";
    var maxLeft=(state.page-Math.floor(state.window/2))
    var maxRight=(state.page+Math.floor(state.window/2))
    if(maxLeft<1){
        maxLeft=1
        maxRight=state.window;
    }
    if(maxRight>pages){
        maxLeft=pages-(state.window-1);
        maxRight=pages;
        if(maxLeft<1){
            maxLeft=1;
        }
    }


    for(var page=maxLeft;page<=maxRight;page++){
        wrapper.innerHTML+=`<button value=${page} id=${page} class="page btn btn-sm" onclick="change()">${page}</button>`
    }

    if(state.page!=1){
        wrapper.innerHTML=`<button value=${state.page-1} id=${state.page-1} class="page btn btn-sm" onclick="change()"><i class="fas fa-chevron-left"></i></button>`+wrapper.innerHTML
    }
    if(state.page!=pages){
        wrapper.innerHTML+=`<button value=${state.page+1} id=${state.page+1} class="page btn btn-sm" onclick="change()"><i class="fas fa-chevron-right"></i></button>`
    }
    
     $("#"+count).addClass("active");
   
    // alert("3");
    $('.page').on('click',function(){
        $('#pagination_wrapper').empty();
        state.page=Number($(this).val());
        // alert("2")
        // console.log(count,"hello");
        count=$(this)[0].id;
        // console.log(count,"hello2");
        // sortByTitleodd();
        say();
    })
}
// *******************************************************************************************************************************
function change(){
    // console.log(document.querySelector(".pagination button.active"));
     document.querySelector(".pagination button.active").classList.add("active")
    // alert('1')
    
}



// $("#1").addClass("active");
// *******************************************************************************************************************************
fetch("./category.json")
.then(response => {
    datas='g';
   return response.json();
})
.then(
    data => {        
        html=``;
        for (let index = 0; index < data.length; index++) {
            html+=`<option value="${data[index].category}">${data[index].category}</option>`    
        }
        document.getElementById("cars").innerHTML=html;
    }
);
// pagination(data,state.page,state.rows)
// pageButton(datafound.pages)
// **********************************************************************************************************

function countchange(){
    // console.log(count);
    count =1;
    state.page=1;
    // console.log(count);
}

//************************************************************************************* */
function say(){
    fetch("./data.json")
.then(response => {
    datas='g';
   return response.json();
})
.then(
    data => {        
         html=``;
        var found=document.getElementById("cars").value;
        var datafound=[];
        var j=0;
        for (let index = 0; index < data.length; index++) {
            if(found==="Category"){
                datafound[j]=(data[index]);
                j+=1;
            }
            else if(data[index].category===found){                
                datafound[j]=data[index];
                j+=1;
        }
    }
    var datafoundcategory=pagination(datafound,state.page,state.rows)
    // console.log(datafoundcategory);
    datafound=datafoundcategory.querySet;
    for(let k=0;k<datafound.length;k++){
        html+=`<div class="card_row">
            <div class="row single_card_top_margin">
                    <div class="col-lg-6">                            
                        <div class="content_color_flex">
                            <span>${datafound[k].title}</span></div>
                    </div>
                    <div class="col-lg-3 date_card">${datafound[k].category}</div>
                    <div class="col-lg-3 download_view_div">
                                <a href="./files/${datafound[k].file_name}" target="_blank" class="view_div"><i class="far fa-eye"></i><span>View</span></a>
                                <a href="./files/${datafound[k].file_name}" download class="download_div"><i class="far fa-arrow-alt-circle-down"></i><span>Download</span></a>
                            </div>
                </div>                        
            </div>`   
    }
    console.log(datafound);
        document.getElementById("allcards").innerHTML=html;
    pageButton(datafoundcategory.pages)
    }
);
}



// **********************************************************************************************************************

function toggleTitle(){
    countTitle++;
    if(countTitle%2==0){
        sortByTitleodd();
    }
    else{
        sortByTitleeven();
    }
}

// *********************************************************************************************************************
function sortByTitleodd(){
fetch("./data.json")
.then(response => {
    datas='g';
   return response.json();
})
.then(
    data => {        
        var datafound=pagination(data,state.page,state.rows)
        data=datafound.querySet;
        console.log();
        html=``;
        for (let index = 0; index < data.length; index++) {
            html+=`<div class="card_row">
            <div class="row single_card_top_margin">
                    <div class="col-lg-6">                            
                        <div class="content_color_flex">
                            <span>${data[index].title}</span></div>
                    </div>
                    <div class="col-lg-3 date_card">${data[index].category}</div>
                    <div class="col-lg-3 download_view_div">
                                <a href="./files/${data[index].file_name}" target="_blank" class="view_div"><i class="far fa-eye"></i><span>View</span></a>
                                <a href="./files/${data[index].file_name}" download class="download_div"><i class="far fa-arrow-alt-circle-down"></i><span>Download</span></a>
                            </div>
                </div>                        
            </div>`    
        }
        document.getElementById("allcards").innerHTML=html;
        pageButton(datafound.pages)
    }
);
}

// *****************************************************************************************************************************
function sortByTitleeven(){
    fetch("./data.json")
.then(response => {
    datas='g';
   return response.json();
})
.then(
    data => {        
        data.sort(function(a, b) {
            var nameA = a.title.toUpperCase(); // ignore upper and lowercase
            var nameB = b.title.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
        // console.log("clicked",data);
        html=``;
        for (let index = 0; index < data.length; index++) {
            html+=`<div class="card_row">
            <div class="row single_card_top_margin">
                    <div class="col-lg-6">                            
                        <div class="content_color_flex">
                            <span>${data[index].title}</span></div>
                    </div>
                    <div class="col-lg-3 date_card">${data[index].category}</div>
                    <div class="col-lg-3 download_view_div">
                                <a href="./files/${data[index].file_name}" target="_blank" class="view_div"><i class="far fa-eye"></i><span>View</span></a>
                                <a href="./files/${data[index].file_name}" download class="download_div"><i class="far fa-arrow-alt-circle-down"></i><span>Download</span></a>
                            </div>
                </div>                        
            </div>`    
        }
        document.getElementById("allcards").innerHTML=html;
    }
);
}
// *******************************************************************************************************************************
// function toggleDate(){
//     countDate++;
//     if(countDate%2==0){
//         sortByTitleodd();
//     }
//     else{
//         sortByDateeven();
//     }
// }

// function sortByDateeven(){
//     fetch("./data.json")
// .then(response => {
//     datas='g';
//    return response.json();
// })
// .then(
//     data => {        
//         // console.log("initial",data);
//         html=``;
//         for (let index = data.length-1; index >= 0; index--) {
//             html+=`<div class="card_row">
//             <div class="row single_card_top_margin">
//                     <div class="col-lg-6">                            
//                         <div class="content_color_flex">
//                             <span>${data[index].title}</span></div>
//                     </div>
//                     <div class="col-lg-3 date_card">${data[index].date}</div>
//                     <div class="col-lg-3 download_view_div">
//                                 <a href="./files/${data[index].file_name}" target="_blank" class="view_div"><i class="far fa-eye"></i><span>View</span></a>
//                                 <a href="./files/${data[index].file_name}" download class="download_div"><i class="far fa-arrow-alt-circle-down"></i><span>Download</span></a>
//                             </div>
//                 </div>                        
//             </div>`    
//         }
//         document.getElementById("allcards").innerHTML=html;
//     }
// );
// }


