"use Strict";

const tableBody = document.querySelector(".tableBody");
const close = document.querySelector(".close");
const popup = document.querySelector(".popup");
let nomeri = 0;

function renderHTML(val, key) {
  let html = `<tr id="id_${key + 1}" class="suralar">
  <td>${val.number}</td>
  <td><p class="btn">${val.name.short} / ${val.name.transliteration.id}</p></td>
  <td>${val.numberOfVerses}</td>
  <td>${val.revelation.id}</td>
  </tr>`;
  tableBody.insertAdjacentHTML("beforebegin", html);

  const suralar = document.querySelector(".suralar");
  // console.log(suralar);
}
document.addEventListener("click", async (e) => {
  let target = e.target;
  let a = target.closest(".suralar");
  let num = Number(a.id.split("_")[1]);
  let obj = await (
    await fetch(`https://api.quran.sutanlab.id/surah/${num}`)
  ).json();
  console.log(obj.data);

  popup.style.display = "flex";

  popup.innerHTML = "";
  obj.data.verses.forEach((val, key) => {
    console.log(key, val.text.arab, val.text.transliteration.en);

    let innnerHtml = `<p class='popupEn'>${key + 1}. ${
      val.text.transliteration.en
    }</p>
    <p class='popupArab'>${val.text.arab}</p>
    <hr />`;
    popup.insertAdjacentHTML("beforeend", innnerHtml);
  });
});

window.addEventListener("click", () => {
  popup.style.display = "none";
});

async function fetchURL(val) {
  const data = await fetch("https://api.quran.sutanlab.id/surah");
  const dataJson = await data.json();
  console.log(dataJson.data);

  dataJson.data.forEach((el, key) => {
    renderHTML(el, key);
  });
}
fetchURL();

// "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.json"
// https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/uzb_muhammadsodikmu.json
