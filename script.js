const api = "https://api.jikan.moe/v4/anime/1/news";

let movieArray = [];
let buyers = [];

const fetchAPI = async () => {
  const response = await fetch(api);
  const JsonFile = await response.json();
  movieArray = JsonFile.data;
  movieArray.forEach((item, i) => {
    let getRandomPrice = Math.floor(Math.random() * (10 - 5 + 1) + 5);
    if (i === 5)
      item.images.jpg.image_url =
        "https://m.media-amazon.com/images/M/MV5BMDI3ZDY4MDgtN2U2OS00Y2YzLWJmZmYtZWMzOTM3YWFjYmUyXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg";
    if (i === movieArray.length - 1)
      item.images.jpg.image_url =
        "https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg";
    item.day = "";
    item.price = getRandomPrice;
  });

  console.log(movieArray);
  displayAnime();
};
fetchAPI();

const displayAnime = () => {
  const getCardField = document.getElementById("animeCard");
  let elem = "";
  movieArray.forEach((item, i) => {
    elem += `<div class="col col-md-4 h-50">
    <div class="card mt-3" style="width: 20rem;">
          <img src="${item.images.jpg.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
         <p class="card-text">${item.excerpt}</p>
         <p><i class="fa-solid fa-user"> ${item.author_username}</i></p>
         <p>price $${item.price}</p>
         <button class="bg-success bg-gradient text-light" onclick="setDay('${item.mal_id}','monday')">Monday</button>
         <button class="bg-success bg-gradient text-light"onclick="setDay('${item.mal_id}','tuesday')">Tuesday</button>
         <button class="bg-success bg-gradient text-light"onclick="setDay('${item.mal_id}','wednesday')">Wednesday</button>
         <button class="bg-success bg-gradient text-light mt-2"onclick="setDay('${item.mal_id}','thursday')">Thursday</button>
         <button class="bg-success bg-gradient text-light mt-2"onclick="setDay('${item.mal_id}','friday')">Friday</button>
         <button class="bg-success bg-gradient text-light mt-2"onclick="setDay('${item.mal_id}','saturday')">Saturday</button>
         <button class="bg-success bg-gradient text-light mt-2"onclick="setDay('${item.mal_id}','sunday')">Sunday</button>
        </div>
     </div>
    </div>`;
  });
  getCardField.innerHTML = elem;
};

const displayTable = () => {
  let getMondayTable = document.getElementById("monday");
  let getTuesdayTable = document.getElementById("tuesday");
  let getWednesdayTable = document.getElementById("wednesday");
  let getThursdayTable = document.getElementById("thursday");
  let getFridayTable = document.getElementById("friday");
  let getSaturdayTable = document.getElementById("saturday");
  let getSundayTable = document.getElementById("sunday");
  let strMon = "";
  let strTues = "";
  let strWed = "";
  let strThur = "";
  let strFri = "";
  let strSat = "";
  let strSun = "";
  //total price each day
  let totalMonday = document.getElementById("mondayTotal");
  let getTotalMon = displayDayTotalPrice("monday");
  let totalTuesday = document.getElementById("tuesdayTotal");
  let getTotalTues = displayDayTotalPrice("tuesday");
  let totalWednesday = document.getElementById("wednesdayTotal");
  let getTotalWed = displayDayTotalPrice("wednesday");
  let totalThursday = document.getElementById("thursdayTotal");
  let getTotalThurs = displayDayTotalPrice("thursday");
  let totalFriday = document.getElementById("fridayTotal");
  let getTotalFri = displayDayTotalPrice("friday");
  let totalSaturday = document.getElementById("saturdayTotal");
  let getTotalSat = displayDayTotalPrice("saturday");
  let totalSunday = document.getElementById("sundayTotal");
  let getTotalSun = displayDayTotalPrice("sunday");
  movieArray.forEach((item, i) => {
    if (item.day === "monday") {
      strMon += `<tr>
         <td>${item.title}</td>
         <td>$ ${item.price}</td>
       </tr>`;
    } else if (item.day === "tuesday") {
      strTues += `<tr>
         <td>${item.title}</td>
         <td>$ ${item.price}</td>
       </tr>`;
    } else if (item.day === "wednesday") {
      strWed += `<tr>
         <td>${item.title}</td>
         <td>$ ${item.price}</td>
       </tr>`;
    } else if (item.day === "thursday") {
      strThur += `<tr>
         <td>${item.title}</td>
         <td>$ ${item.price}</td>
       </tr>`;
    } else if (item.day === "friday") {
      strFri += `<tr>
         <td>${item.title}</td>
         <td>$ ${item.price}</td>
       </tr>`;
    } else if (item.day === "saturday") {
      strSat += `<tr>
         <td>${item.title}</td>
         <td>$ ${item.price}</td>
       </tr>`;
    }
    if (item.day === "sunday") {
      strSun += `<tr>
        <td>${item.title}</td>
        <td>$${item.price}</td>
      </tr>`;
    }
  });
  getMondayTable.innerHTML = strMon;
  getTuesdayTable.innerHTML = strTues;
  getWednesdayTable.innerHTML = strWed;
  getThursdayTable.innerHTML = strThur;
  getFridayTable.innerHTML = strFri;
  getSaturdayTable.innerHTML = strSat;
  getSundayTable.innerHTML = strSun;
  //displaying total price
  totalSunday.innerText = getTotalSun;
  totalMonday.innerText = getTotalMon;
  totalTuesday.innerText = getTotalTues;
  totalWednesday.innerText = getTotalWed;
  totalThursday.innerText = getTotalThurs;
  totalFriday.innerText = getTotalFri;
  totalSaturday.innerText = getTotalSat;
};

const displayDayTotalPrice = (day) => {
  let sum = 0;
  movieArray.forEach((item, i) => {
    if (item.day === day) sum += item.price;
  });
  return sum;
};
const setDay = (id, day) => {
  movieArray.forEach((item, i) => {
    if (item.mal_id === +id) item.day = day;
  });
  console.log(movieArray);
  displayTable();
};

const addBooking = (e) => {
  const encapForm = new FormData(e);
  const getName = encapForm.get("name");
  const getEmail = encapForm.get("email");
  let tempArr = [];
  let sumPrice = 0;

  const tempObj = {
    name: getName,
    email: getEmail,
    booking: tempArr,
    totalcost: 0,
  };
  const checkBooked = movieArray.filter((item) => item.day !== "");

  if (checkBooked.length === 0) {
    alert("please booked a ticket");
    return;
  }

  movieArray.map((item, i) => {
    if (item.day) {
      tempArr.push(item.title);
      sumPrice += item.price;
    }
  });
  tempObj.totalcost = sumPrice;
  if (checkDuplicate(getName) || buyers.length === 0) {
    buyers.push(tempObj);
  }

  console.log(buyers);
  document.getElementById("nameinput").value = "";
  document.getElementById("emailinput").value = "";
  displayBookingList();
  refreshMovieDay();
  displayTable();
};

const checkDuplicate = (Obj) => {
  let ToF = true;
  buyers.forEach((item) => {
    if (item.name === Obj) {
      alert("Can not have duplicate name");
      ToF = false;
    }
  });
  return ToF;
};

const displayBookingList = () => {
  const getBLId = document.getElementById("bookingList");
  let str = "";
  buyers.forEach((item, i) => {
    str += `
        <tr>
         <td>${item.name}</td>
         <td>$${item.totalcost}</td>
         <td><ul>${displayListBooked(item.booking)}</ul></td>
         </tr>
      `;
  });

  getBLId.innerHTML = str;
};
//to count how many movies was booked by buyers
function displayListBooked(list) {
  let lists = "";
  list.map((item, i) => {
    lists += `
        <li>${item}</li>
        `;
    return;
  });
  return lists;
}

const refreshMovieDay = () => {
  movieArray.forEach((item) => {
    item.day = "";
  });
};
