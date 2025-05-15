function toggleSubmenu() {
    const usersButton = document.querySelector('.users');
    const submenu = document.querySelector('.submenu');
  
    usersButton.addEventListener('click', () => {
      submenu.classList.toggle('show');
    });
  }
  
  toggleSubmenu();