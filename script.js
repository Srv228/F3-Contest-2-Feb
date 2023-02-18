// Get the menu items from the API and display them
function getMenu() {
    fetch('https://free-food-menus-api-production.up.railway.app/burgers')
      .then(response => response.json())
      .then(data => {
        const menuContainer = document.getElementById('menu-container');
        data.forEach(item => {
          const menuItem = document.createElement('div');
          menuItem.classList.add('menu-item');
  
          const id = document.createElement('i');
          id.textContent = `ID: ${item.id}`;
  
          const img = document.createElement('img');
          img.src = item.img;
          img.alt = item.name;
  
          const name = document.createElement('h3');
          name.textContent = item.name;
  
          const dsc = document.createElement('p');
          dsc.textContent = item.dsc;
  
          const price = document.createElement('b');
          price.textContent = `$${item.price.toFixed(2)}`;
  
          const rate = document.createElement('p');
          rate.textContent = `Rating: ${item.rate}`;
  
          const country = document.createElement('p');
          country.textContent = `Country: ${item.country}`;
  
          menuItem.appendChild(id);
          menuItem.appendChild(img);
          menuItem.appendChild(name);
          menuItem.appendChild(dsc);
          menuItem.appendChild(price);
          menuItem.appendChild(rate);
          menuItem.appendChild(country);
          menuContainer.appendChild(menuItem);
        });
      })
      .catch(error => {
        console.error('Error fetching menu:', error);
      });
  }
  
  // Simulate the user placing an order
  function takeOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        fetch('https://free-food-menus-api-production.up.railway.app/burgers')
          .then(response => response.json())
          .then(data => {
            let burgers = data.sort(() => Math.random() - 0.5).slice(0, 3);
            let order = {};
            order.burgers = burgers;
            resolve(order);
          })
          .catch(error => {
            console.error('Error fetching menu:', error);
          });
      }, 2500);
    });
  }
  
  // Simulate the order preparation process
  function orderPrep() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }
  
  // Simulate the payment process
  function payOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
  }
  
  // Display a thank you message
  function thankyouFnc() {
    alert('Thank you for your payment!');
  }
  
  // Set up event listeners
  document.addEventListener('DOMContentLoaded', getMenu);
  
  document.addEventListener('DOMContentLoaded', () => {
    takeOrder()
      .then(order => {
        console.log('Order:', order);
        const burgerNames = order.burgers.map(burger => burger.name).join(', ');
        alert(`You ordered: ${burgerNames}`);
        return orderPrep();
      })
      .then(status => {
        console.log('Preparation:', status);
        return payOrder();
      })
      .then(status => {
        console.log('Payment:', status);
        if (status.paid) {
          thankyouFnc();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });