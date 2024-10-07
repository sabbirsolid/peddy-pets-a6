//loading all pets
const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
};
//loading pets for sorting
const loadPetsSorting = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => sortByPrice(data.pets))
    .catch((error) => console.log(error));
};
//loading main categories
const loadMainCategory = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    // .then((data) => console.log(data.categories))
    .then((data) => displayButtonsOnCategory(data.categories))
    .catch((error) => console.log(error));
};
//loading buttons category wise
const loadCategories = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        document.getElementById(id).classList.add('bg-bgPrimary');
        document.getElementById('pets').innerHTML = "";
        document.getElementById('pets').innerHTML = `<div id="loading" class="flex flex-col             justify-center items-center h-screen">
                  <span class="loading loading-bars loading-lg"></span>
                </div>`;
        setTimeout(() => {
            displayPets(data.data);
        }, 2000); 
    })
    .catch((error) => console.log(error));
};
//remove active buttons
function removeActive(){
    const buttons = document.getElementsByClassName('container-btn');
    for(let btn of buttons){
        btn.classList.remove('bg-bgPrimary');
    }
}

//loading modal info
const loadModalInfo = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => showModalInfo(data.petData))
    .catch((error) => console.log(error));
};
//liked images
const loadImages = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => likeImage(data.petData))
    .catch((error) => console.log(error));
};
//sorting porting
const sortByPrice = (petId) => {
    petId.sort((a, b) =>  b.price - a.price);
    displayPets(petId);
}
//pushing modal info
const showModalInfo = (petData) => {
    document.getElementById('modal-container').innerHTML = "";
    const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
        <div class="">
                    <figure class ="h-[200px] w-[300px] relative">
                      <img
                        src= ${petData.image}
                        alt="Pets" />
                    </figure>
                    <div class="">
                      <h2 class="card-title">${petData.pet_name}</h2>
                      <p>Breed: ${petData.breed === undefined || petData.breed === null? 'Not Available':petData.breed}</p>
                      <p>Birth: ${petData.date_of_birth === undefined||petData.date_of_birth===null? "Not Available": petData.date_of_birth}</p>
                      <p>Gender: ${petData.gender === undefined||petData.gender===null?'Not Available':petData.gender}</p>
                      <p>Price: ${petData.price===undefined||petData.price ===null?'Not Available':petData.price}</p>
                    </div>
                    <div class="">
                      <h2 class="text-xl font-bold">Details Information</h2>
                      <p>${petData.pet_details===undefined || petData.pet_details===null?'Not Available':petData.pet_details}</p>
                    </div>
                  </div>
        `;
        document.getElementById('modal-container').append(card);
    document.getElementById('showModalData').click();
}
//like images
const likeImage = (petData) => {
    const imageContainer = document.getElementById('liked-images');
    const card = document.createElement('div');
    card.classList = 'card card-compact p-2';
    card.innerHTML = `<div> <img class="h-[200px] w-[300px] p-3" src= ${petData.image} alt="Pets" /> </div>`;
    imageContainer.appendChild(card)

}

//displaying main categories
const displayButtonsOnCategory = (categories) =>{
    
    for( item of categories){
    const categoryContainer = document.getElementById('button-container');
    const btn = document.createElement('button');
    btn.classList = 'bg-slate-300 rounded-full'
    btn.innerHTML = `<button onclick="loadCategories('${item.category}')" id="${item.category}" class="flex justify-between rounded-full  px-4 py-3 items-center font-bold gap-2 container-btn"><img class="w-[20px]" src="${item.category_icon}"/> ${item.category}</button>`;
    categoryContainer.append(btn);
    }
}

//display Pets
const displayPets = (pets) => {
    const petsContainer = document.getElementById('pets');
    petsContainer.innerHTML = "";
    if(pets.length === 0){
        petsContainer.classList.remove("grid");
        petsContainer.innerHTML = `<div class="hero">
        <div class="hero-content text-center">
                <div class="flex flex-col justify-center items-center space-y-5">
                <img src="/assets/error.webp" alt="">
                <h1 class="text-4xl font-bold">No Information Available</h1>
                <p class="">This subject-related information is not available.</p>
                </div>
            </div>
        </div>

        `;
    }
    else{
        petsContainer.classList.add('grid');
    }
    pets.forEach((pet) => {
        const card = document.createElement('div');
        card.classList = 'card card-compact py-5';
        card.innerHTML = `
        <div class="card card-compact bg-base-100 w-3/4 mx-auto shadow-xl px-10 py-5">
                    <figure class ="w-full" relative">
                      <img
                        src= ${pet.image}
                        alt="Pets" />
                    </figure>
                    <div class="">
                      <h2 class="card-title">${pet.pet_name}</h2>
                      
                      <div class="flex"><img src="./assets/breed.png" alt=""><p> Breed: ${pet.breed ===undefined|| pet.breed === null ? 'Not Available':pet.breed}</p> </div>
                      
                      <div class="flex"><img src="./assets/birth.png" alt=""><p> Birth: ${pet.date_of_birth=== undefined|| pet.date_of_birth === null ?'Not Available':pet.date_of_birth}</p> </div>
                      
                      <div class="flex"><img src="./assets/gender.png" alt=""><p> Gender: ${pet.gender === undefined|| pet.gender === null ? 'Not Available':pet.gender}</p> </div>
                      
                      <div class="flex"><img src="./assets/price.png" alt=""><p> Price: ${pet.price=== undefined|| pet.price === null ? 'Not Available': pet.price}</p> </div>
                      
                      <div class="card-actions justify-center py-3">
                        <button onclick="loadImages(${pet.petId})" class="btn bg-bgPrimary text-white">Like</button>
                        <button onclick="modal()"class="btn bg-bgPrimary text-white">Adopt</button>
                        <button onclick="loadModalInfo(${pet.petId})" class="btn bg-bgPrimary text-white">Details</button>
                      </div>
                    </div>
                  </div>
        `
        petsContainer.append(card);
        
    })
}
//calling functions
loadPets();
loadMainCategory();

//congrats modal
const modal = () => {
    const congrats = document.getElementById('congrats');
    congrats.style.visibility = 'visible';
    congrats.showModal();
    setTimeout(function() {
        congrats.style.visibility = 'hidden'; 
        congrats.close(); 
    }, 3000);
};
document.getElementById('sort').addEventListener('click', function () {
    document.getElementById('pets').innerHTML = "";
    document.getElementById('pets').innerHTML = `<div id="loading" class="flex flex-col justify-center items-center min-h-screen">
              <span class="loading loading-bars loading-lg"></span>
            </div>`;

    setTimeout(() => {
        loadPetsSorting();
    }, 3000); 
}); 

