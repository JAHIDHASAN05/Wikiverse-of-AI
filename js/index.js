const LoadAiData=async(limit)=>{
    toggleSpinner(true)
    const url=`https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url)
    const data= await res.json()
    displayAiData(data.data.tools,limit)
  
}

const displayAiData=(datas ,limit)=>{
      const aiDataContainer=document.getElementById("container")
      aiDataContainer.innerHTML=``

        if(limit === true){
            const btnSeeMoreContainer= document.getElementById("see-more-container")
            btnSeeMoreContainer.classList.add("d-none")
        }
        else{
            datas=datas.slice(0,6)

        }

      for (const data of datas){
        const aiDiv=document.createElement("div")
        aiDiv.classList.add("col")
        aiDiv.innerHTML=`
                    <div class="card h-100">
                        <img src="${data.image}" class="card-img-top" alt="No picture Found">
                        <div class="card-body">
                          <h5 class="card-title">Feature</h5>
                          <ol>
                           <li>${data.features[0]}</li>
                           <li>${data.features[1]}</li>
                           <li>${data.features[2]}</li>
                         
                          </ol>
                        </div>
                        <div class="card-footer d-flex justify-content-between ">
                            <div>
                                <h5>${data.name}</h5>
                                 <p>Date:${data.published_in}</p>
                             </div>
                             <button  class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#phone-detail">Detail</button>

                             </div>

                    </div>
        `
        aiDataContainer.append(aiDiv)

        console.log(data)
      }

      toggleSpinner(false)
}

// <!-- see more btn function -->
document.getElementById("btn-see-more").addEventListener("click", function(){
    LoadAiData(true)
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


LoadAiData()