import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export let currentUser = null;

export async function initAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  currentUser = session?.user || null;

  supabase.auth.onAuthStateChange((event, session) => {
    currentUser = session?.user || null;
    updateAuthUI();
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user: currentUser, session } }));
  });

  updateAuthUI();
}

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

function updateAuthUI() {
  const authBtn = document.getElementById('auth-btn');
  const userMenu = document.getElementById('user-menu');

  if (!authBtn) return;

  if (currentUser) {
    authBtn.style.display = 'none';
    if (userMenu) userMenu.style.display = 'flex';
    const userEmail = document.getElementById('user-email');
    if (userEmail) userEmail.textContent = currentUser.email;
  } else {
    authBtn.style.display = 'inline-flex';
    if (userMenu) userMenu.style.display = 'none';
  }
}
