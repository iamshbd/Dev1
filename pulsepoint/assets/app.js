// Shared helpers: cookie management and auth guard
function setCookie(name, value, days){
  let expires = "";
  if (days){
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name){
  const v = document.cookie.match('(^|;)\\s*'+name+'\\s*=\\s*([^;]+)');
  return v ? decodeURIComponent(v.pop()) : null;
}

function deleteCookie(name){
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// Security guard used on protected pages. roleRequired: 'Nurse' or 'Admin'
function checkAuth(roleRequired){
  const role = getCookie('active_role');
  if (!role) {
    window.location.replace('error.html');
    return false;
  }
  if (roleRequired === 'Admin' && role !== 'Admin'){
    window.location.replace('error.html');
    return false;
  }
  return true;
}

// Simple display helper for logout buttons
function attachLogout(btnId){
  const b = document.getElementById(btnId);
  if (!b) return;
  b.addEventListener('click', ()=>{
    deleteCookie('active_role');
    window.location.replace('index.html');
  });
}

// Password strength checker helper returns count of rules met
function passwordRulesCount(pw){
  let count = 0;
  if (pw.length >= 8) count++;
  if (/[0-9]/.test(pw)) count++;
  if (/[^A-Za-z0-9]/.test(pw)) count++;
  return count;
}

// Export to global
window.PP = { setCookie, getCookie, deleteCookie, checkAuth, attachLogout, passwordRulesCount };
