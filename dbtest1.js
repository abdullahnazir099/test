
  function showOders() {
    // fetch('/.netlify/functions/allOrders')
    //   .then(response => response.json())
    //   .then(orders => {
    //     const orderList = document.getElementById('orders-list');
    //     orderList.innerHTML = '';
    //     orders.forEach(order => {
    //       const row = `
    //         <tr>
    //           <td>${order.id}</td>
    //           <td>${order.order_id}</td>
    //           <td>${order.username}</td>
    //           <td>${order.product_name}</td>
    //           <td>${order.quantity}</td>
    //           <td>${order.order_date}</td>
    //           <td>
    //           <button class="btn btn-sm btn-info" onclick="openEditModal(${order.id})">Edit</button>
    //           <button class="btn btn-sm btn-danger" onclick="confirmDelete(${order.id})">Delete</button>
              
    //         </td>
    //       </tr>
    //     `;
    //     orderList.innerHTML += row;
    //   });
    // })
    // .catch(error => console.error('Error:', error));


    fetch('/.netlify/functions/getOrders')
    .then(response => response.json())
    .then(orders => {
        const ordersContainer = document.getElementById('orders');
        const orderList = orders.map(order=> `
      
        <li class="order-item">
          <span class="order-id">ID:${order.order_id}</span>
          <span class="username">Name:${order.username}</span>
          <span class="product-name">Product name: ${order.product_name}</span>
          <span class="quantity">Quantity: ${order.quantity}</span>
          <span class="order_date">:Order date ${order.order_date}</span>  
          <button class="btn btn-sm btn-info" onclick="openEditModal(${order.id})">Edit</button>
         <button class="btn btn-sm btn-danger" onclick="confirmDelete(${order.id})">Delete</button>
                    
        </li>
      `).join('');
  ordersContainer.innerHTML = `<ul class="order-list">${orderList}</ul>`;
       
    })
    .catch(error => console.error('Error fetching orders:', error));
  }
  
  // Function to add a new order
  function addBook() {
    const order_id = document.getElementById('order_id').value;
    const username = document.getElementById('username').value;
    const product_name = document.getElementById('product_name').value;
    const publishedYear = document.getElementById('publishedYear').value;
    const order_date = document.getElementById('order_date').value;
  
    fetch('/.netlify/functions/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order_id, username, product_name, quantity: publishedYear, order_date }),
    })
    .then(response => {
      if (response.ok) {
        $('#addBookModal').modal('hide');
        showOders(); // Update the order list
      }
    })
    .catch(error => console.error('Error:', error));
  }
  
  // Function to open the edit modal with order details
  async function openEditModal(bookId) {
    try {
      const response = await fetch(`/.netlify/functions/readOrder?id=${bookId}`);
      const order = await response.json();
  
      document.getElementById('editBookId').value = order.id;
      document.getElementById('editorder_id').value = order.order_id;
      document.getElementById('editAuthor').value = order.username;
      document.getElementById('editproduct_name').value = order.product_name || '';
      document.getElementById('editPublishedYear').value = order.quantity;
      document.getElementById('editorder_date').value = order.order_date || '';
  
      $('#editBookModal').modal('show');
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  }
  
  // Function to update an existing order
  function updateBook() {
    const id = document.getElementById('editBookId').value;
    const order_id = document.getElementById('editorder_id').value;
    const username = document.getElementById('editAuthor').value;
    const product_name = document.getElementById('editproduct_name').value;
    const publishedYear = document.getElementById('editPublishedYear').value;
    const order_date = document.getElementById('editorder_date').value;
  
    fetch('/.netlify/functions/updateOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, order_id, username, product_name, quantity: publishedYear, order_date }),
    })
    .then(response => {
      if (response.ok) {
        $('#editBookModal').modal('hide');
        showOders(); // Update the order list
      }
    })
    .catch(error => console.error('Error:', error));
  }
  
  // Function to confirm and delete a order
  function confirmDelete(bookId) {
    if (confirm('Are you sure you want to delete this order?')) {
      fetch(`/.netlify/functions/deleteBook?id=${bookId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          showOders(); // Update the order list
        }
      })
      .catch(error => console.error('Error:', error));
    }
  }
  
  // Run the showOders function on page load
  document.addEventListener('DOMContentLoaded', showOders());