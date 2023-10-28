const LoadAiData=async()=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url)
    const data= await res.json()
    displayAiData(data.data.tools)
  
}

const displayAiData=(datas)=>{
      const aiDataContainer=document.getElementById("container")
      for (const data of datas){
        const aiDiv=document.createElement("div")
        aiDiv.classList.add("col")
        aiDiv.innerHTML=`
                    <div class="card h-100">
                        <img src="${data.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Feature</h5>
                          <ol>
                           <li>${data.features[0]}</li>
                           <li>${data.features[1]}</li>
                           <li>${data.features[2]}</li>
                         
                          </ol>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <div>
                                <h5>${data.name}</h5>
                                 <p>Date:${data.published_in}</p>
                             </div>
                            <button class="btn btn-primary">Detail</button>
                        </div>
                    </div>
        `
        aiDataContainer.append(aiDiv)
        console.log(data)
      }
}
LoadAiData()