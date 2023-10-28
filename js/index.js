const LoadAiData=async( sortFeature , limit)=>{
  toggleSpinner(true)
  const url=`https://openapi.programming-hero.com/api/ai/tools`
  const res = await fetch(url)
  const data= await res.json()
  displayAiData(data.data.tools,sortFeature,limit)

}

const displayAiData=(datas, sortFeature, limit)=>{
    const aiDataContainer=document.getElementById("container")
    aiDataContainer.innerHTML=``
    const btnSeeMore= document.getElementById("btn-see-more")
    const sortBtnSeeMore=document.getElementById("sort-btn-see-more")

     if(sortFeature ==="random data"){
      if(limit==='random-limit' && datas.length>6){
        datas=datas.slice(0,6)
        btnSeeMore.classList.remove("d-none")
      }
      else {
        btnSeeMore.classList.add("d-none")
       }
     }
     if(sortFeature ==="sort data"){
      btnSeeMore.classList.add("d-none")

      if(limit==="sort-limit" && datas.length>6){
        datas=datas.slice(0,6)
       sortBtnSeeMore.classList.remove("d-none")
      }
      else {
        sortBtnSeeMore.classList.add("d-none")
       }
     }
     
     

    for (const data of datas){
      const aiDiv=document.createElement("div")
      aiDiv.classList.add("col")
      aiDiv.innerHTML=`
                  <div class="card h-100">
                      <div> 
                      <img  src="${data.image }" class="card-img-top" alt="No picture Found">

                      </div>
                      <div class="card-body">
                        <h5 class="card-title">Feature</h5>
                        <ol>
                         <li  class="${data.features[0] ? '' : 'd-none'}">${data.features[0]}</li>
                         <li  class="${data.features[1] ? '' : 'd-none'}">${data.features[1]}</li>
                         <li  class="${data.features[2] ? '' : 'd-none'}">${data.features[2]}</li>
                         <li  class="${data.features[3] ? '' : 'd-none'}">${data.features[3]}</li>
                         <li  class="${data.features[4] ? '' : 'd-none'}">${data.features[4]}</li>
                       
                        </ol>
                      </div>
                      <div class="card-footer d-flex justify-content-between align-items-center ">
                          <div>
                              <h5>${data.name}</h5>
                               <p>Date:${data.published_in}</p>
                           </div>
                           <button onclick="loadAiDetail('${data.id}')"  class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#phone-detail">Detail</button>

                           </div>

                  </div>
      `
      aiDataContainer.append(aiDiv)
      // console.log(data)

    }

    toggleSpinner(false)
}

// <!-- see more btn function -->
document.getElementById("btn-see-more").addEventListener("click", function(){   
LoadAiData("random data", false)
})


document.getElementById("sort-btn-see-more").addEventListener("click", function(){
sortByDate("sort data",false)
})

// <!-- load spinner funtion -->
function toggleSpinner(isLoading){
 const loaderContainer=document.getElementById("loader")
  if(isLoading){
      loaderContainer.classList.remove("d-none")
  }
  else{
      loaderContainer.classList.add("d-none")
  }
}


// sort by date function
function sortByDate(sortFeature ,limit){
fetch('https://openapi.programming-hero.com/api/ai/tools')
.then(response => response.json())
.then(data => 
  
  
  {
 
  sortDataByDate(data.data.tools, sortFeature , limit);
})  

}
function sortDataByDate(datas, sortFeature,limit) {
datas.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));

displayAiData(datas, sortFeature,limit);
}


//  detail modal data load and display function

const loadAiDetail= async(id)=>{
  const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
  const res = await fetch(url)
  const data= await res.json()
  displayAiDetail(data.data)
  console.log(data)
  
}

const displayAiDetail=(data)=>{
const ModalDetailBody=document.getElementById("detail-body")
ModalDetailBody.innerHTML=`
          <div class="card">
             
              <div class="card-body">                        
                      <h4 class="card-text mb-5">${data.description}</h4>                        
                      <div class="d-flex justify-content-around mb-5">
                          <div style="height:100px" class="w-25 bg-light p-3 d-flex justify-content-center align-items-center text-center">
                           ${data.pricing[0].price ==0 ? "0$" :`${data.pricing[0].price }` }<br> 
                              ${data.pricing[0].plan}
                          </div>
                          <div style="height:100px" class="w-25 bg-light p-3 d-flex justify-content-center align-items-center text-center">
                              ${data.pricing[1].price} <br> 
                              ${data.pricing[1].plan}
                          </div>
                          <div style="height:100px" class="w-25 bg-light p-3 d-flex justify-content-center align-items-center text-center">
                              ${data.pricing[2].price} <br> 
                              ${data.pricing[2].plan}
                          </div>
                          
                      </div>
              </div>
              <div class="card-footer">
                  <div class =" d-flex justify-content-between">
                      <div>
                        <h3>Feature                          
                        </h3>
                        <ul>
                          <li>${data.features[1].feature_name}</li>
                          <li>${data.features[2].feature_name}</li>
                          <li>${data.features[3].feature_name}</li> 
                        </ul>
                      </div>
                      <div>
                        <h3>Integrations:                          
                        </h3>
                        <ul>
                          <li class="${data.integrations[0] ? '' : 'd-none'}">${data.integrations[0]}</li>
                          <li class="${data.integrations[1] ? '' : 'd-none'}">${data.integrations[1]}</li>
                          <li class="${data.integrations[2] ? '' : 'd-none'}">${data.integrations[2]}</li>                            
                        </ul>
                      </div>
                      
                  </div>
              </div>
          </div>

          <div class="card">
              <img src="${data.image_link[0]}" class="card-img-bottom p-2" alt="No Pictutre Found">
              <div class="card-body text-center ">
                   <h5 class="card-title">${data.input_output_examples[0].input}</h5>
                    <p class="card-text">${data.input_output_examples[0].output}</p>
              </div>
              <span class="position-absolute end-0 badge text-bg-danger w-30 ${data.accuracy.score ? '' : 'd-none'}">
              ${data.accuracy.score}% accuracy
            </span>
            
            
          </div>          

`
console.log(data.input_output_examples[0])

console.log(data)
}







LoadAiData("random data", 'random-limit')