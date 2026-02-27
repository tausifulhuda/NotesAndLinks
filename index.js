let saveButton=document.getElementById("save_button")
let saveLink=document.getElementById("save_link")
let inputField=document.getElementById("input")
let infoList=document.getElementById('info')
let saved=[]

if(localStorage.getItem("items")){
    saved=localStorage.getItem("items")
    saved=JSON.parse(saved)
}

function print(item){ 
    let found=false

    for(let j=0;j<item.length-1;j++){
        if(item[j]=='.'){
            found=true
        }
    }

    if(found===true){
        if(item[0]=='h'&&item[1]=='t'&&item[2]=='t'&&item[3]=='p'){
            infoList.innerHTML += (`<li><a href='${item}' target=_blank>${item}</a></li>`)
        }
        else{
            infoList.innerHTML += (`<li><a href='http://${item}' target=_blank>${item}</a></li>`)
        }
    }
    else{
        infoList.innerHTML += (`<li>${item}</li>`)
    }
}
    
for(let i=0;i<saved.length;i++){   
    print(saved[i])
}

async function currentTab(){
    let queryOptions={active:true,  lastFocusedWindow: true}
    let [tab]=await chrome.tabs.query(queryOptions)
    return tab
}

saveLink.addEventListener('click', async function(){
    
    if(localStorage.getItem("items")){
        saved=localStorage.getItem("items")
        saved=JSON.parse(saved)
    }

    tab=await currentTab()

    if(tab.url!="" && tab.url!=saved[saved.length-1]){
        saved.push(tab.url)
        
        const lastItem=saved[saved.length-1]
        console.log(lastItem)
        console.log("Link saved")
        print(lastItem)
    }
    
    saved=JSON.stringify(saved)
    localStorage.setItem("items", saved)   
})

saveButton.addEventListener('click', function(){
   
    if(localStorage.getItem("items")){
        saved=localStorage.getItem("items")
        saved=JSON.parse(saved)
    }

    if(inputField.value!=""){
        saved.push(inputField.value)
        
        const lastItem=saved[saved.length-1]
        console.log(lastItem)
        console.log("Input saved")
        print(lastItem)
    }
    
    inputField.value=""

    saved=JSON.stringify(saved)
    localStorage.setItem("items", saved) 

})

clear.addEventListener('click', function(){
    localStorage.clear()
    inputField.value=""
    infoList.innerHTML=""
    saved=[]
})

