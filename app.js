const product_form = document.getElementById('product_form');
const msg = document.querySelector('.msg');
const tbody = document.getElementById('tbody')

const allproduct =()=>{
   let product = getitem('product');

// if product not exsist 

   if(!product){
    tbody.innerHTML= `
    <tr>
    <td colspan ='7' class ='text-center'>No Product Found</td>
    </tr>
     `
   }



//    if product data exist 
   if(product){
    let list = "";


    // map method loop 
    product.map((item,index)=>{
      list += `
    <tr class ="my-5 mb-0 text-center vertical-align-center">
    <td>${index}</td>
    <td id="product_image"><img style ="width:30px;height:30px" src="${item.image}" alt="">
    </td></td>
    <td id="product_name">${item.name}</td>
    <td id="product_price">${item.price}</td>
    <td id="product_quantity">${item.quantity}</td>
    <td id="product_total_price">${item.price*item.quantity}</td>
    <td id="view" class="bg-info"><i class="fas fa-eye"></i></td>
    <td id="edit" class ="bg-warning"><i class="fas fa-edit"></i></td>
    <td id="remove" class ="bg-danger"><i class="fas fa-remove"></i></td>
    </tr>
      `
    })
    tbody.innerHTML =list;
   }
}

allproduct();

product_form.addEventListener('submit',(e)=>{
    e.preventDefault();


    // get product data 
let product_data =new FormData(e.target);
let object_data = Object.fromEntries(product_data.entries());
let {image,name,price,quantity} = Object.fromEntries(product_data.entries());

let data= [];

if(!image || !name || !price || !quantity){
    msg.innerHTML = setAlert('All fields are required')
}else{

//  set data localStorage 

setlsdata('product', object_data);
e.target.reset();
}
allproduct();
})

