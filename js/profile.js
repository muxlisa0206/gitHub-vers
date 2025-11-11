let path = new URLSearchParams(location.search);
let userLogin = path.get("login");

let userProfile = document.querySelector(".userProfile");

async function getUsersProfile() {
    try{
        let result = await fetch(`https://api.github.com/users`);
        let usersProfile = await result.json();
        let result2 = usersProfile.filter((el) => el.login === userLogin);
        console.log(result2);
    }catch(err){
        console.log(err);
    }
}