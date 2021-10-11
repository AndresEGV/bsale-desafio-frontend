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
  const contenedor = document.querySelector("#product-container");

  products.forEach(
    ({ name, url_image, price, discount }) =>
      (contenedor.innerHTML += `
    <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Sale badge-->
                            ${
                              discount > 0
                                ? `<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${discount}%</div>
                                <h4 class="badge bg-danger text-white position-absolute" style="top: 0.5rem; left: 0.5rem">oferta</h4>
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
     `)
  );
};
