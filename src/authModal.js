import { signUp, signIn, signOut, currentUser } from './auth.js';

export function createAuthModal() {
  const modal = document.createElement('div');
  modal.id = 'auth-modal';
  modal.className = 'auth-modal';
  modal.innerHTML = `
    <div class="auth-modal-content">
      <button class="auth-modal-close" id="close-modal">&times;</button>

      <!-- Login Tab -->
      <div id="login-tab" class="auth-tab active">
        <h2>Вход</h2>
        <form id="login-form">
          <div class="form-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" placeholder="your@email.com" required>
          </div>
          <div class="form-group">
            <label for="login-password">Пароль</label>
            <input type="password" id="login-password" placeholder="••••••••" required>
          </div>
          <button type="submit" class="auth-btn primary">Вход</button>
          <p class="auth-switch">Нет аккаунта? <a href="#" id="switch-to-signup">Зарегистрироваться</a></p>
        </form>
      </div>

      <!-- Signup Tab -->
      <div id="signup-tab" class="auth-tab">
        <h2>Регистрация</h2>
        <form id="signup-form">
          <div class="form-group">
            <label for="signup-email">Email</label>
            <input type="email" id="signup-email" placeholder="your@email.com" required>
          </div>
          <div class="form-group">
            <label for="signup-password">Пароль</label>
            <input type="password" id="signup-password" placeholder="••••••••" required>
          </div>
          <div class="form-group">
            <label for="signup-confirm">Подтверждение пароля</label>
            <input type="password" id="signup-confirm" placeholder="••••••••" required>
          </div>
          <button type="submit" class="auth-btn primary">Зарегистрироваться</button>
          <p class="auth-switch">Уже есть аккаунт? <a href="#" id="switch-to-login">Войти</a></p>
        </form>
      </div>

      <div id="auth-error" class="auth-error" style="display: none;"></div>
      <div id="auth-success" class="auth-success" style="display: none;"></div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeBtn = document.getElementById('close-modal');
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-tab').classList.remove('active');
    document.getElementById('signup-tab').classList.add('active');
    clearErrors();
  });

  switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-tab').classList.remove('active');
    document.getElementById('login-tab').classList.add('active');
    clearErrors();
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      await signIn(email, password);
      modal.style.display = 'none';
      showSuccess('Успешный вход!');
      loginForm.reset();
    } catch (error) {
      showError(error.message);
    }
  });

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (password !== confirm) {
      showError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      showError('Пароль должен быть не менее 6 символов');
      return;
    }

    try {
      await signUp(email, password);
      modal.style.display = 'none';
      showSuccess('Регистрация успешна! Проверьте почту для подтверждения.');
      signupForm.reset();
    } catch (error) {
      showError(error.message);
    }
  });

  function clearErrors() {
    document.getElementById('auth-error').style.display = 'none';
    document.getElementById('auth-success').style.display = 'none';
  }

  function showError(message) {
    clearErrors();
    const errorDiv = document.getElementById('auth-error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }

  function showSuccess(message) {
    clearErrors();
    const successDiv = document.getElementById('auth-success');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
  }

  return modal;
}

export function openAuthModal() {
  let modal = document.getElementById('auth-modal');
  if (!modal) {
    modal = createAuthModal();
  }
  modal.style.display = 'flex';
}

export function createUserMenu() {
  const menu = document.createElement('div');
  menu.id = 'user-menu';
  menu.className = 'user-menu';
  menu.style.display = 'none';
  menu.innerHTML = `
    <div class="user-menu-content">
      <div class="user-info">
        <span id="user-email">user@email.com</span>
      </div>
      <button id="logout-btn" class="user-menu-btn">Выход</button>
    </div>
  `;

  document.body.appendChild(menu);

  const logoutBtn = document.getElementById('logout-btn');
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut();
      menu.style.display = 'none';
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  });

  return menu;
}
