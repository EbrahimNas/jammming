// create Code Verifier and Challenge
function generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
  
async function generateCodeChallenge(code_verifier) {
    const data = new TextEncoder().encode(code_verifier);
    const hashed = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
}
  

// Redirect User to Spotify Authorization URL
const clientId = 'b56ee1c9bda344348948a3a45e1b5d3c';
const redirectUri = 'http://localhost:3000'; // Update with your redirect URI
const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

export async function redirectToSpotifyAuthorize() {
  const code_verifier = generateRandomString(128);
  const code_challenge = await generateCodeChallenge(code_verifier);

  // Store the code_verifier in localStorage for later use
  localStorage.setItem('code_verifier', code_verifier);

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('scope', scope);
  authUrl.searchParams.append('code_challenge_method', 'S256');
  authUrl.searchParams.append('code_challenge', code_challenge);

  // Redirect the user to Spotify's authorization page
  window.location.href = authUrl.toString();
}


// Handle the Authorization Callback
export function getAuthCode() {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
}

// Exchange Authorization Code for Access Token
export async function exchangeCodeForToken(authCode) {
    const code_verifier = localStorage.getItem('code_verifier'); // Retrieve the stored code_verifier
  
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: redirectUri,
        code_verifier: code_verifier,
      }),
    });
  
    const data = await response.json();
    
    // Store the access token and refresh token in localStorage
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('expires_in', data.expires_in);
    localStorage.setItem('expires_at', Date.now() + data.expires_in * 1000); // Set expiration time
  
    return data;
}

// Refresh the Token When Expired

async function refreshToken() {
  const refresh_token = localStorage.getItem('refresh_token');
  
  if (!refresh_token) {
      console.error('No refresh token available');
      return null; // Handle no refresh token case
  }
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error refreshing token:', errorData);
    return null; // Return null if token refresh fails
  }

  const data = await response.json();
  
  // Store the new access token
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('expires_in', data.expires_in);
  localStorage.setItem('expires_at', Date.now() + data.expires_in * 1000);

  return data.access_token;
}

  
export async function getAccessToken() {
  const expires_at = localStorage.getItem('expires_at');
  
  // Check if the token has expired
  if (!expires_at || Date.now() > expires_at) {
    console.log('Access token has expired, attempting to refresh...');
    const newAccessToken = await refreshToken();
    
    if (!newAccessToken) {
      console.error('Failed to refresh token, redirecting to authorization.');
      // Optionally, redirect the user to reauthorize if refreshing fails
      redirectToSpotifyAuthorize();
      return null; // Handle failure to refresh token
    }
    
    return newAccessToken; // Return the refreshed token
  }
  
  // Token is still valid
  return localStorage.getItem('access_token');
}

/*// Make Spotify API Requests with Access Token
async function fetchSpotifyData() {
    const accessToken = await getAccessToken(); // Ensure you have a valid token
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  
    const data = await response.json();
    console.log(data);
}*/