// Menu data structure
var menuLinks = [
    { text: 'about', href: '/about' },
    { text: 'catalog', href: '/catalog' },
    { text: 'orders', href: '/orders' },
    { text: 'account', href: '/account' },
  ];

// import "./styles.css";

// Select and cache the <main> element in a variable named mainEl.
//1
let mainEl= document.querySelector('main');

console.log(mainEl);
//2 Set the background color of mainEl to the value stored in the --main-bg CSS custom property.

mainEl.style.backgroundColor= 'var(--main-bg)'
//3
let h1 =document.createElement('h1');
h1.textContent='dom manupulation';
mainEl.appendChild(h1);
//4Add a class of flex-ctr to mainEl.

mainEl.classList.add('flex-ctr');
//part2
let topMenu=document.getElementById('top-menu');
//step2-part2
topMenu.style.height='100%';
//step3-part2
topMenu.style.backgroundColor='var(--top-menu-bg)';

//step4
topMenu.classList.add('flex-around');
//part3


    menuLinks.forEach(link =>{

        let anchorEl =document.createElement('a');
        anchorEl.href=link.href;

        anchorEl.textContent=link.text;
        topMenu.appendChild(anchorEl);

    });

    //R-ALAB DOM Manipulation (part 2)

    var menuLinks = [
      {text: 'about', href: '/about'},
      {text: 'catalog', href: '#', subLinks: [
        {text: 'all', href: '/catalog/all'},
        {text: 'top selling', href: '/catalog/top'},
        {text: 'search', href: '/catalog/search'},
      ]},
      {text: 'orders', href: '#' , subLinks: [
        {text: 'new', href: '/orders/new'},
        {text: 'pending', href: '/orders/pending'},
        {text: 'history', href: '/orders/history'},
      ]},
      {text: 'account', href: '#', subLinks: [
        {text: 'profile', href: '/account/profile'},
        {text: 'sign out', href: '/account/signout'},
      ]},
    ];


//step 1. select the cache sub-menu
let subMenuEl = document.getElementById("sub-menu");

//step 2. select the height for submenu.
subMenuEl.style.height = "100%";

//step 3. select the background color.
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

//step 4. add the class of flex.
subMenuEl.classList.add('flex-around');

//step5. css position property to value.
//hide the submenu initially
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';


//part2 - part4
  //Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
  //Attach a delegated 'click' event listener to topMenuEl.
//The first line of code of the event listener function should call the event object's preventDefault() method.
//The second line of code of the function should immediately return if the element clicked was not an <a> element.
//Log the content of the <a> to verify the handler is working.
const topMenuEl = document.getElementById('top-menu');
const topMenuLinks = document.querySelectorAll('#top-menu a');

function buildSubmenu(subLinks) {
  // Clear current submenu items
  subMenuEl.innerHTML = '';
  
  // Check if there are subLinks to display
  if (subLinks && subLinks.length > 0) {
    subLinks.forEach(link => {
      // Create new anchor element
      let anchorEl = document.createElement('a');
      anchorEl.href = link.href;
      anchorEl.textContent = link.text;
      subMenuEl.appendChild(anchorEl);
    });
  }
}

// Event listener for top menu links (delegated)
topMenuEl.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default link behavior
  
  // If the clicked element is not an <a>, return
  if (event.target.tagName !== 'A') return;

  const clickedLink = event.target;
  const linkText = clickedLink.textContent.toLowerCase();
  
  // Toggle the active class for clicked link
  if (clickedLink.classList.contains('active')) {
    clickedLink.classList.remove('active'); // Remove active class if already there
  } else {
    clickedLink.classList.add('active'); // Add active class if not already there
  }

  // Remove the active class from all other top menu links
  topMenuLinks.forEach(link => {
    if (link !== clickedLink) {
      link.classList.remove('active'); // Remove active class from other links
    }
  });

  // Handle submenu visibility
  if (linkText !== 'about') {
    // Find the corresponding menu link from menuLinks
    const menuLink = menuLinks.find(link => link.text.toLowerCase() === linkText);
    if (menuLink && menuLink.subLinks) {
      // Show submenu by changing top property
      subMenuEl.style.top = '100%';  // Position submenu below the top menu
      buildSubmenu(menuLink.subLinks); // Build the submenu with subLinks
    }
  } else {
    // ABOUT has no submenu, so hide the submenu
    subMenuEl.style.top = '0'; // Reset submenu to its initial state
  }
});

// Event listener for submenu interactions
subMenuEl.addEventListener('click', (event) => { 
  event.returnValue = false;
  
  // If the clicked element is not an <a>, return
  if (event.target.tagName !== 'A') return; 
  // Log the content of the submenu link clicked
  console.log(`Clicked on submenu item: ${event.target.textContent}`);
  
  //Next, the event listener should set the CSS top property of subMenuEl to 0.
  subMenuEl.style.top = '0'; // Hide the submenu when an item is clicked
  
  // Remove active class for each <a> top menu links
  topMenuLinks.forEach(link => link.classList.remove('active'));

  // Update main content with in h1
  mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
});