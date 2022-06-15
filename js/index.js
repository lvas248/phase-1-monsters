document.addEventListener("DOMContentLoaded",()=>{
    
    //create input fields, 'create monster' button, set EL's, and POST new monsters
    let createMonsterDiv = document.querySelector('#create-monster')
    let monsterContainer = document.querySelector('#monster-container')
    createMonsterDiv.innerHTML = '<form id="monster-form"> <input id="name" placeholder="name"> <input id="age" placeholder="age"> <input id="description" placeholder="description"> <button id="createBtn">Create Monster</button> </form>'
   
    let form = document.querySelector('form')
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        let nameInput = document.querySelector('#name').value
        let ageInput = document.querySelector('#age').value
        let descInput = document.querySelector('#description').value
        form.reset()
        
    fetch("http://localhost:3000/monsters",{
        method: 'POST', 
        headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
        body: JSON.stringify({name: nameInput, age: ageInput, description: descInput})
    })
 
    })
    
   


    //Fetch the first 50 monsters and display them on the DOM
    fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
    .then(res => res.json())
    .then(data => {
        for(let monster of data){
            monsterContainer.innerHTML += `<div><h2>${monster.name}</h2><p>${monster.age}</p><p>${monster.description}</p></div>`
        }
    })

    //Add forward button functionality
    let page = 1
      document.querySelector('#forward').addEventListener('click', (e)=>{
        monsterContainer.innerHTML = ""
        page++
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(data => {
            for(let monster of data){
                monsterContainer.innerHTML += `<div><h2>${monster.name}</h2><p>${monster.age}</p><p>${monster.description}</p></div>`
            }
        })
    })
    //Add back button functionality
    document.querySelector('#back').addEventListener('click', (e)=>{
        if(page > 1){
        monsterContainer.innerHTML = ""
        page--
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(data => {
            for(let monster of data){
                monsterContainer.innerHTML += `<div><h2>${monster.name}</h2><p>${monster.age}</p><p>${monster.description}</p></div>`
            }
        })}
    })
})




