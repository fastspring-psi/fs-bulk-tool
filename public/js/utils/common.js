function logout() {
    // Remove token from sessionStorage
    sessionStorage.removeItem('FS-token');
    // Redirect to login page
    window.location.href = '/login.html';
}

function forceLogout(errMessage) {
    alert(errMessage);
    logout();
}

/*  Retrieves private token to query API from sessionStorage.
 *  If token is not available we will redirect users back to login page.
 */
function getToken() {
    const token = JSON.parse(sessionStorage.getItem('FS-token'));
    if (!token) {
        forceLogout('Token not found, please login again!');
    } else {
        return token;
    }
}
