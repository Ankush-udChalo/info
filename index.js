var countTitle=0;
var countDate=0;
sortByTitleodd();
function toggleTitle(){
    countTitle++;
    if(countTitle%2==0){
        sortByTitleodd();
    }
    else{
        sortByTitleeven();
    }
}

function sortByTitleodd(){
fetch("./data.json")
.then(response => {
    datas='g';
   return response.json();
})
.then(
    data => {        
        // console.log("initial",data);
        html=``;
        for (let index = 0; index < data.length; index++) {
            html+=`<div class="card_row">
            <div class="row single_card_top_margin">
                    <div class="col-lg-6">                            
                        <div class="content_color_flex">
                            <span>${data[index].title}</span></div>
                    </div>
                    <div class="col-lg-3 date_card">${data[index].date}</div>
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
                    <div class="col-lg-3 date_card">${data[index].date}</div>
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

function toggleDate(){
    countDate++;
    if(countDate%2==0){
        sortByTitleodd();
    }
    else{
        sortByDateeven();
    }
}

function sortByDateeven(){
    fetch("./data.json")
.then(response => {
    datas='g';
   return response.json();
})
.then(
    data => {        
        // console.log("initial",data);
        html=``;
        for (let index = data.length-1; index >= 0; index--) {
            html+=`<div class="card_row">
            <div class="row single_card_top_margin">
                    <div class="col-lg-6">                            
                        <div class="content_color_flex">
                            <span>${data[index].title}</span></div>
                    </div>
                    <div class="col-lg-3 date_card">${data[index].date}</div>
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