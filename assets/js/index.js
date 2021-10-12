document.addEventListener("DOMContentLoaded", async () => {
  try {
    const products = await getProducts();
    await fillProductsInCards(products);
  } catch (error) {
    console.log(error);
  }
});

const getProducts = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/products");
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

const fillProductsInCards = async (products) => {
  $(".product-card").remove();
  const contenedor = document.querySelector("#product-container");

  products.forEach(({ name, url_image, price, discount }) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add(
      "col-lg-3",
      "col-md-4",
      "col-sm-6",
      "mb-4",
      "product-card"
    );
    cardDiv.innerHTML += `
   
                        <div class="card h-100">
                            <!-- Sale badge-->
                            ${
                              discount > 0
                                ? `<h5><span class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem"> ${discount}%</span></h5>
                                <h5> <span class="badge bg-danger text-white position-absolute" style="top: 0.5rem; left: 0.5rem"> oferta</span></h5>
                            <!-- Product image-->`
                                : ""
                            }
                            
                            <img class="card-img-top" src="${url_image}" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${name}</h5>
                                    
                                    <!-- Product price-->
                                    <span class="text-muted text-decoration-line-through">${price}</span>
                                    
                                </div>
                            </div>
     `;
    contenedor.appendChild(cardDiv);
  });
};

const searchProducts = async () => {
  let searchInput = document.querySelector("#search-input").value;

  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${searchInput}`
    );
    console.log(data);
    await fillProductsInCards(data);
  } catch (error) {
    console.log("Error", error);
  }
};
