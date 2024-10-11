//loading all pets
const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
        document.getElementById('pets').classList.remove('grid');
        document.getElementById('pets').innerHTML = "";
        document.getElementById('pets').innerHTML = `<div id="loading" class="flex         justify-center items-center py-20">
                  <span class="loading loading-spinner loading-lg"></span>
                </div>`;
        setTimeout(() => {
            displayPets(data.pets);
        }, 2000); 
    })
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
    .then((data) => displayButtonsOnCategory(data.categories))
    .catch((error) => console.log(error));
};
//loading buttons category wise
const loadCategories = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        document.getElementById(id).classList.add('bg-bgSecondary');
        document.getElementById('pets').classList.remove('grid');
        document.getElementById('pets').innerHTML = "";
        document.getElementById('pets').innerHTML = `<div id="loading" class="flex         justify-center items-center py-20">
                  <span class="loading loading-spinner loading-lg"></span>
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
        btn.classList.remove('bg-bgSecondary');
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
                    <figure class ="w-full ">
                      <img class="rounded-xl" src= ${petData.image} alt="Pets" />
                    </figure>
                    <div class="">
                      <h2 class="card-title">${petData.pet_name}</h2>
                      
                      <div class="flex items-center gap-1">
                      <img src="./assets/breed.png" alt="">
                      <p>Breed: ${petData.breed === undefined || petData.breed === null? 'Not Available':petData.breed}</p>
                      </div>
                      <div class="flex items-center gap-1">
                      <img src="./assets/birth.png" alt="">
                      <p>Birth: ${petData.date_of_birth === undefined||petData.date_of_birth===null? "Not Available": petData.date_of_birth}</p>
                      </div>
                      <div class="flex items-center gap-1">
                      <img src="./assets/gender.png" alt="">
                      <p>Gender: ${petData.gender === undefined||petData.gender===null?'Not Available':petData.gender}</p>
                      </div>
                      <div class="flex items-center gap-1">
                      <img src="./assets/gender.png" alt="">
                      <p>Vaccinated Status: ${petData.vaccinated_status === undefined||petData.vaccinated_status===null?'Not Available':petData.vaccinated_status}</p>
                      </div>
                      <div class="flex items-center gap-1">
                      <img src="./assets/price.png" alt="">
                      <p>Price: ${petData.price===undefined||petData.price ===null?'Not Available':petData.price}</p>
                      </div> 
                    </div>
                    <div class="">
                      <h2 class="font-bold">Details Information</h2>
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
    card.innerHTML = `<div class="p-4"> <img class=" mx-auto rounded-2xl" src= ${petData.image} alt="Pets" /> </div>`;
    imageContainer.appendChild(card)

}

//displaying main categories
const displayButtonsOnCategory = (categories) =>{
    
    for( item of categories){
    const categoryContainer = document.getElementById('button-container');
    const btn = document.createElement('button');
    btn.classList = ''
    btn.innerHTML = `<button onclick="loadCategories('${item.category}')" id="${item.category}" class="container-btn bg-slate-100 flex gap-2 rounded-lg p-3 items-center justify-center font-bold"><img class="w-[15px]" src="${item.category_icon}"/> ${item.category}</button>`;
    categoryContainer.append(btn);
    }
}

//display Pets
const displayPets = (pets) => {
    document.getElementById('pets').classList.add('grid');
    const petsContainer = document.getElementById('pets');
    petsContainer.innerHTML = "";
    if(pets.length === 0){
        petsContainer.classList.remove("grid");
        petsContainer.innerHTML = `<div class="hero">
        <div class="hero-content text-center">
                <div class="flex flex-col justify-center items-center space-y-5">
                <img src="./assets/error.webp" alt="">
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
                      <img class="rounded-xl" src= ${pet.image} alt="Pets" />
                    </figure>
                    <div class="">
                      <h2 class="card-title">${pet.pet_name}</h2>
                      
                      <div class="flex items-center gap-1"><img src="./assets/breed.png" alt=""><p> Breed: ${pet.breed ===undefined|| pet.breed === null ? 'Not Available':pet.breed}</p> </div>
                      
                      <div class="flex items-center gap-1"><img src="./assets/birth.png" alt=""><p> Birth: ${pet.date_of_birth=== undefined|| pet.date_of_birth === null ?'Not Available':pet.date_of_birth}</p> </div>
                      
                      <div class="flex items-center gap-1"><img src="./assets/gender.png" alt=""><p> Gender: ${pet.gender === undefined|| pet.gender === null ? 'Not Available':pet.gender}</p> </div>
                      
                      <div class="flex items-center gap-1"><img src="./assets/price.png" alt=""><p> Price: ${pet.price=== undefined|| pet.price === null ? 'Not Available': pet.price}</p> </div>
                      
                      <div class="card-actions justify-center py-3">
                        <button onclick="loadImages(${pet.petId})" class="btn btn-sm bg-bgPrimary text-white">Like</button>
                        <button onclick="modal(); this.disabled = true;" class="btn btn-sm bg-bgPrimary text-white">Adopt</button>
                        <button onclick="loadModalInfo(${pet.petId})" class="btn btn-sm bg-bgPrimary  text-white">Details</button>
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

//sorting
document.getElementById('sort').addEventListener('click', function () {
    document.getElementById('pets').classList.remove('grid');
    document.getElementById('pets').innerHTML = "";
    document.getElementById('pets').innerHTML = `<div id="loading" class="flex flex-col justify-center items-center py-20">
              <span class="loading loading-spinner loading-lg"></span>
            </div>`;

    setTimeout(() => {
        loadPetsSorting();
    }, 2000); 
}); 
// congrats modal
const modal = () => {
    const congrats = document.getElementById('congrats');
    const count = document.getElementById('countdown');
    let counter = 3;
    congrats.style.visibility = 'visible';
    congrats.showModal();
    count.textContent = counter;
    const countdown = setInterval(() => {
      counter--;
      count.textContent = counter;
      if (counter === 0) {
        clearInterval(countdown);
        congrats.style.visibility = 'hidden';
        congrats.close();
      }
    }, 1000);
  };
