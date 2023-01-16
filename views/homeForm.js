const getData = async () => {
    const productsResponse = await fetch('/products')
    const products = await productsResponse.json()
    return products
}

async function putData() {

    const data = await getData()
    const productEle = document.getElementById('products')

    const arr = [];
    data.map((product) => {
        const newEle = document.createElement('div')
        newEle.className = "card m-5 "
        newEle.style = "width: 21rem;"


        //    product Image start
        const imageTag = document.createElement(`img`)
        imageTag.src = product.imageUrl
        imageTag.className = "card-img "
        newEle.appendChild(imageTag)
        // const divType = document.createElement('div')
        // divType.style = 'position: absolute;right: 16px;top:10px'
        // const imgType = document.createElement('img')
        // // imgType.src = cate
        // imgType.height = "40"
        // imgType.width = "40"
        // divType.appendChild(imgType)
        // newEle.appendChild(divType)
        //    product Image end
        const divEle = document.createElement('div')

        divEle.className = "card-body"





        //    product.name
        const headerName = document.createElement('h5')
        headerName.className = "card-title"
        headerName.id = `${product._id}name`
        headerName.innerHTML = `${product.name}`
        divEle.appendChild(headerName)

        //product.price
        const Cost = document.createElement('div')
        Cost.className = "card-title mt-2 aman"
        Cost.id = `${product._id}`
        Cost.innerText = `Price: ${product.price}`
        divEle.appendChild(Cost)

        const Rating = document.createElement('div')
        Rating.className = "card-title mt-2"
        Rating.id = `${product._id}dishPrice`
        Rating.innerText = `Rating: ${product.rating}`
        divEle.appendChild(Rating)


        // const cart = document.createElement('button')
        // cart.className = "btn-outline-danger mt-2 btn-dark"
        // cart.id = product._id
        // // cart.innerText = "Add to Cart"
        // divEle.appendChild(cart)

        newEle.appendChild(divEle)

        productEle.appendChild(newEle)

        // const dish = document.getElementById(`${product._id}dishName`)
        // const price = document.getElementById(`${product._id}dishPrice`)
        // const CartBtn = document.getElementById(product._id)
        // CartBtn.addEventListener('click', () => {
        //     let qty = 1
        //     let foundIdx = arr.findIndex(elment => elment.productId == product._id);


        //     if (foundIdx >= 0) {
        //         console.log(arr[foundIdx].Quantity, 'value');
        //         arr[foundIdx].Quantity = parseInt(arr[foundIdx].Quantity) + 1

        //         console.log(arr);
        //     }
        //     else {
        //         arr.push({ Quantity: qty, productId: product._id, Dish_name: dish.innerText, price: price.innerText });
        //     }
        //     const cartadd = (arr) => {
        //         const cartEle = document.getElementById('cartForm')
        //         cartEle.innerHTML = " "
        //         var table = document.createElement('table')

        //         arr.map((data) => {
        //             var row = document.createElement('tr');
        //             var cell1 = document.createElement('td');
        //             cell1.appendChild(document.createTextNode(data.Dish_name));
        //             row.appendChild(cell1);

        //             var cell2 = document.createElement('td');
        //             cell2.appendChild(document.createTextNode(data.  Quantity));
        //             row.appendChild(cell2);

        //             var cell3 = document.createElement('td');
        //             cell3.appendChild(document.createTextNode(data.price));
        //             row.appendChild(cell3);


        //             // const dishName = document.createElement('input')
        //             // dishName.value = data.Dish_name
        //             // dishName.disabled = true
        //             // cell.appendChild(dishName)


        //             // const dishQty = document.createElement('input')
        //             // dishQty.value = data.Quantity
        //             // dishQty.disabled = true
        //             // cell.appendChild(dishQty)

        //             // const dishPrice = document.createElement('input')
        //             // dishPrice.value = data.price
        //             // dishPrice.disabled = true
        //             // cell.appendChild(dishPrice)

        //             table.appendChild(row)
        //         })
        //         cartEle.appendChild(table)


        //     }

        //     cartadd(arr)



        // })

    })



}


putData()


