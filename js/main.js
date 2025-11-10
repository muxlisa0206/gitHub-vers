let users = document.querySelector(".users");
let pagination = document.getElementById("pagination");
let searchInput = document.getElementById("searchInput");
let search = "";
let limit = 12;
let activePage = 1;


async function getUsers() {
    try{
        let res = await fetch(`https://api.github.com/users?page=${activePage}&per_page=${limit}&q=${search}`);
        let usersData = await res.json();
        console.log(usersData);

        users.innerHTML = "";
        usersData?.map((el) =>{
            users.innerHTML += `
                <div class="flex flex-col gap-2 p-[15px] max-w-[505px] w-full border-1 border-[#30363D] rounded-[6px]">
                    <div class="flex items-center justify-between gap-3">
                        <div class="flex flex-col gap-1">
                            <a href="/pages/profile.html?userLogin=${el.login}" class="text-white font-400">${el.login}</a>
                            <div class="flex gap-1 items-center">
                                <p class="text-[#6E7681]">By github</p>
                                <img src="/assets/images/galochka.png" alt="">
                            </div>
                        </div>
                        <a href="/pages/profile.html?userLogin=${el.login}"><img class="w-[40px] h-[40px] rounded-[50%]" src="${el.avatar_url}" alt="usersProfileImage"></a>
                    </div>
                    <a href="/pages/profile.html?userLogin=${el.login}" class="text-[#C9D1D9] px-[20px] py-[6px] max-w-[145px] w-full border-1 border-[#F0F6FC1A] bg-[#21262D] rounded-[6px] text-[13px] font-[500]">Watch the profile</a>
                </div>
            `;
        })

        pagination.innerHTML="";
            pagination.innerHTML += `
                    <button 
                    onclick="prev()"
                    class="border-1 border-[gray]/30 text-[gray] w-[50px] h-[50px] flex items-center justify-center rounded-[50%] cursor-pointer py-2 "><<<</button>
                    <button
                    onClick="next()"
                    class="border-1 border-[gray]/30 text-[gray] w-[50px] h-[50px] flex items-center justify-center rounded-[50%] cursor-pointer py-2 ">>>></button>
            `;
    }catch(err){
        console.log(err);
    }
}
getUsers();

searchInput.addEventListener("input" , (e) => {
    search = e.target.value;
    getUsers();
})

function next(){
    activePage += limit;
    getUsers();
}

function prev(){
    activePage -= limit;
    if(activePage < 0){
        activePage = 0;
    }
    getUsers();
}