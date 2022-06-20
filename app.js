const product_form = document.getElementById('product_form');
const msg = document.querySelector('.msg');
const tbody = document.getElementById('tbody')
const edit_form =document.getElementById('edit_form');

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
    let final_price = 0;

    // map method loop 
    product.map((item,index)=>{
      final_price+=(item.price*item.quantity)
      list += `
    <tr class ="my-5 text-center">
    <td class="bg-danger">${index+1}</td>
    <td id="product_image" class="bg-success "><img style ="width:70px;height:70px" src="${item.image}" alt=""></td>
    <td id="product_name" class="bg-success"><h6>${item.name}</h6></td>
    <td id="product_price" class="bg-success"><h6>${item.price} BDT.</h6></td>
    <td id="product_quantity" class="bg-success">${item.quantity}</td>
    <td id="product_total_price" class="bg-success">${item.price*item.quantity} BDT.</td>
    <td class="bg-light">
     <a index ="${index}"  data-bs-toggle="modal" data-bs-target ="#view_product" class="btn btn-primary m-1"><i class="fas fa-eye"></i></a>
     <a index ="${index}"  data-bs-toggle="modal" data-bs-target ="#edit_product" class="btn btn-warning m-1"><i class="fas fa-edit"></i></a>
     <a index ="${index}"  class="btn btn-danger"><i class="fas fa-remove m-1"></i></a>
     </td>
    </tr>
      `
    })
    list+=`
    <tr>
    <td colspan="9" class ="text-center"><h6>Final Price is :
      ${final_price} BDT.</h6>
    </td>
    </tr>
    `
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





// view product 

tbody.onclick = (e)=>{
   e.preventDefault();
   let index_val = index_number(e.target);
   let lsdata = JSON.parse(localStorage.getItem('product'));
   let final_value =lsdata[index_val];
   let {image,name,price,quantity} = final_value;

    if(e.target.classList.contains('fa-eye')){
      let view =document.getElementById('view');
      view.innerHTML =`
      <div class="my-3">
      <img style="weight:auto;height:300px" src="${image}" alt="" class="w-100">
      </div>
      <div class="my-1">
      <h5>Product Name : ${name}</h5>
      </div>
      <div class="my-1">
        <h6>  Price : ${price} BDT</h6>
      </div>
      <div class="my-1">
      <h6> Quantity : ${quantity}</h6>
      </div>
      <div class="my-1">
      <h6> Total Price : ${quantity*price}</h6>
      </div>
      `
    }else if(e.target.classList.contains('fa-edit')){
     edit_form.innerHTML =`
     <div class="my-1">
     <input class="form-control" type="text" value ="${image}" name="image_edit">
     </div>
     <div class="my-1">
     <label for="">Product Name</label>
     <input class="form-control" type="text" value ="${name}" name="name_edit">
     </div>
     <div class="my-1">
     <label for="">Product Price</label>
     <input class="form-control" type="text" value ="${price}" name="price_edit">
     </div>
     <div class="my-1">
     <label for="">Product Quanity</label>
     <input class="form-control" type="text" value ="${quantity}" name="quantity_edit">
     </div>
     <div class="my-1">
     <button class="btn btn-warning w-100" type="submit">Submit</button>
     </div>
     `
    //  form submit 
      edit_form.addEventListener('submit',(e)=>{
        e.preventDefault();
          let edit_form_valu =new FormData(e.target);
          let edit_form_data = Object.fromEntries(edit_form_valu.entries());
          let {image_edit,name_edit,price_edit,quantity_edit} = Object.fromEntries(edit_form_valu.entries());
          lsdata[index_val] ={
                image:image_edit,
                name:name_edit,
                price:price_edit,
                quantity:quantity_edit
               };

      //  udate data in ls 
         updatalsdat('product',lsdata);
         allproduct();
        })
    }else if(e.target.classList.contains('fa-remove')){
   
    let itmes =lsdata.splice(index_val,1);

    updatalsdat('product',itmes);
    allproduct();
    }

}

