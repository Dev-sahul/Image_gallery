const accessKey = `Sgq75ywuoergGne52phlMEx5nOFJTQGknxeYdf79pP0 `;

const gallery = document.querySelector(".images");
const search = document.getElementById("search-form");
const inputField = document.getElementById("search-field");
const close = document.querySelector(".close");
console.log(close);

async function getImages(query, currentPage) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&page=${currentPage}&per_page=12&client_id=${accessKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data.results;
  } catch (error) {
    console.error("eee");
    return [];
  }
}

// display images

const downloadImg = (imgUrl) => {
  fetch(imgUrl)
    .then((res) => res.blob())
    .then((file) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
      console.log(file);
    })
    .catch(() => alert("Failed to download images!"));
};

displayImages = (images) => {
  gallery.innerHTML += images.map(
    (image) =>
      ` <li class="card"> 
           
<img onclick="preView('${image.urls.full}')"  src="${image.urls.small}" alt="Image 1">
  <div class="details">
    <div class="photographer">
      <i class="uil uil-camera"></i>
      <span>${image.user.name}</span>
    </div>
    <button onclick="downloadImg('${image.urls.small}')">
      <i class="uil uil-import"></i>
    </button>
   
  </div>
</li>
</div>`
  );
};

preView = (imgUrl) => {
  const modal = document.getElementById("imageModal");
  const previewImage = document.getElementById("previewImage");

  previewImage.src = imgUrl;
  modal.style.display = "flex";
};
// Function to close the modal
close.addEventListener("click", () => {
  console.log("first");
  // const modal = document.getElementById("imageModal");
  // modal.style.display = "none";
});

// handling search

document.addEventListener("DOMContentLoaded", () => {
  const moreBtn = document.querySelector(".btn");
  let currentPage = 1;

  // moreImages function
  moreBtn.addEventListener("click", async (e) => {
    moreBtn.innerHTML = "Loading...";
    currentPage++;
    const page = await getImages(currentPage);
    displayImages(page);
    moreBtn.innerHTML = "Load more";
  });

  (async () => {
    const moreImages = await getImages();
    displayImages(moreImages);
  })();

  // default images
  (async () => {
    const defaultImages = await getImages();
    displayImages(defaultImages);
  })();
  // search function
  search.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = inputField.value;
    if (query.trim() !== "") {
      const images = await getImages(query);

      // make empty search bar after search
      // inputField.value = '';

      // to remove defaultimages
      gallery.innerHTML = "";
      displayImages(images);
    }
  });
});

//woking code
// document.addEventListener('DOMContentLoaded', () => {
//   const moreBtn = document.querySelector('.btn');
//   let currentPage = 1;

//   moreBtn.addEventListener('click', async (e) => {
//     currentPage++;
//     const page = await getImages(currentPage);
//     displayImages(page);
//   });

//   (async () => {
//     const moreImages = await getImages(); // Assuming getImages() function is defined
//     displayImages(moreImages); // Assuming displayImages() function is defined
//   })();

//   // default images
//   (async () => {
//     const defaultImages = await getImages(); // Assuming getImages() function is defined
//     displayImages(defaultImages); // Assuming displayImages() function is defined
//   })();
// });

// search.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const query = inputField.value;
//   if (query.trim() !== "") {
//     const images = await getImages(query);

//     // make empty search bar after search
//     inputField.value = '';

//     // to remove default images
//     gallery.innerHTML = "";
//     displayImages(images);
//   }
// });

// load more images
//   const loadMoreimages = () =>{
//     currentPage++;
//     let apiUrl = `https://api.unsplash.com/search/photos?query=${query}&page=${currentPage}&per_page=12&client_id=${accessKey}`;
//     getImages(apiUrl)
//   }

// moreBtn.addEventListener('click', loadMoreimages)

// Assuming 'moreBtn' and 'currentPage' are correctly defined.

// async function loadMoreImages() {
//   try {
//       currentPage++;
//       const images = await getImages(currentPage);
//       displayImages(images);
//   } catch (error) {
//       // Handle the error appropriately, e.g., show an error message or log it.
//       console.error("Error while loading more images:", error);
//   }
// }

// moreBtn.addEventListener('click', async () => {
//   await loadMoreImages();
// });
