const url = 'https://crudcrud.com/api/234f0fe96d0645bd94682e2cdcfb5a80/product';
const listItems = document.querySelector('ul');
var sum = 0;
document.addEventListener('DOMContentLoaded', function () {
    axios.get(url)
        .then((res) => {
            console.log(res)

            for (let i = 0; i < res.data.length; i++) {
                displayDataOnScreen(res.data[i])
                sum += Number(res.data[i].product_price);
            }
            console.log(sum)
            sumOfProducts(sum);
        })
        .catch((error) => { console.log(error) })
})
function handleFormSubmit(event) {
    event.preventDefault();
    const information = {
        product_name: event.target.product_name.value,
        product_price: event.target.product_price.value
    }
    axios
        .post(url, information)
        .then((response) => {
            console.log(response.data);
            displayDataOnScreen(response.data);
            sum = sum + Number(response.data.product_price);
            sumOfProducts(sum)
        })
        .catch((error) => { console.log(error) })
}

function displayDataOnScreen(data) {
    const listItem = document.createElement('li');
    listItem.appendChild(
        document.createTextNode(
            `${data.product_name} - ${data.product_price}  `
        )
    )
    const deleteBtn = document.createElement("button");
    deleteBtn.className = 'deleteBtn';
    deleteBtn.appendChild(document.createTextNode("Delete"));
    listItem.appendChild(deleteBtn);

    listItems.appendChild(listItem);

    deleteBtn.addEventListener('click', function (event) {
        listItems.removeChild(event.target.parentElement);
        axios.delete(url + '/' + data._id);
        sum = sum - Number(data.product_price);
        sumOfProducts(sum);
    })
}

function sumOfProducts(sum) {
    const sum_of_products = document.getElementById('sum');
    sum_of_products.innerHTML = ''
    sum_of_products.appendChild(
        document.createTextNode(
            `Total value worth of products :- ${sum}`
        )
    )
}