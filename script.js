function QueryStringToJSON(splitType) {
  var pairs = location.search.slice(1).split(splitType);

  var result = {};
  pairs.forEach(function (pair) {
    pair = pair.split("=");
    result[pair[0]] = decodeURIComponent(pair[1] || "");
  });

  return JSON.parse(JSON.stringify(result));
}

getQueryParamsInJSON = () => {
  let url = new URL(window.location.href);
  if (url && url.searchParams && url.searchParams.has("jsondata")) {
    let jsonString = url.searchParams.get("jsondata");
    try {
      console.log(jsonString);
      return JSON.parse(jsonString);
    } catch (err) {
      return null;
    }
  }
  return null;
};

var b1 = document.getElementById("b1");
b1.addEventListener("click", function () {
  document.querySelector(".items-page").style.display = "none";
  document.querySelector(".payments-page").style.display = "block";
});

b2.addEventListener("click", function () {
  var cardNum = document.getElementById("cardnum").value;
  console.log(cardNum);
  var expMon = document.getElementById("expireMM").value;
  console.log(expMon);
  var expYear = document.getElementById("expireYY").value;
  console.log(expYear);
  console.log(res);
  res =
    res.substring(0, res.length - 1) +
    `,"cardNumber":"${cardNum}","exp":"${expMon}/${expYear}"}`;
  console.log(res);
  console.log(JSON.parse(res));
  // console.log(eval(res));
  // postinformation();
  document.querySelector(".payments-page").style.display = "none";
  document.querySelector(".processing-page").style.display = "block";
  const sendRequest = new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(xhr.responseText);
        resolve(xhr.responseText);
      }
    });

    xhr.open("POST", "https://awesome-lake-28963.pktriot.net");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(res);
  });
  sendRequest.then((res) => {
    renderResult(res);
  });
});

var resultResponse;
function renderResult(res) {
  resultResponse = res;
  console.log(res);
  if (res == "Approved") {
    document.querySelector("#resText").textContent = "Approved";
    document.querySelector("#resText").style.color = "green";
  } else {
    document.querySelector("#resText").textContent = "Declined";
    document.querySelector("#resText").style.color = "red";
  }
  document.querySelector(".processing-page").style.display = "none";
  document.querySelector(".response-page").style.display = "block";
}

var query_string = getQueryParamsInJSON();
var res = JSON.stringify(query_string);
console.log(res);

document.getElementById(
  "storeName"
).textContent = `Welcome to ${query_string["MerchantName"]} Store`;

var table = document.getElementById("myTable");

console.log(query_string);
for (let y in query_string["LineItems"][0]) {
  var row = `<tr> 
  <td>${query_string["LineItems"][0][y]["Description"]}</td>
  <td class="left-align">${query_string["LineItems"][0][y]["ExAmt"].toFixed(
    2
  )}</td>
  </tr>`;
  table.innerHTML += row;
}
var total = 0.0;
for (let z in query_string["LineItems"][0]) {
  y = parseFloat(query_string["LineItems"][0][z]["ExAmt"]);
  console.log(y);
  console.log(total);
  total = total + y;
}
var row = `<tr> 
  <td>Total</td>
  <td class="left-align">${total.toFixed(2)}</td>
  </tr>`;
table.innerHTML += row;

// WARNING: For POST requests, body is set to null by browsers.
var data = JSON.stringify({
  name: "Surya",
});

console.log(resText);
resText.addEventListener("animationend", function () {
  if (document.getElementById("resText").textContent != "Approved") {
    document.getElementById("resText1").style.color = "red";
    console.log(resultResponse);
    document.getElementById("resText1").textContent = resultResponse
      ? resultResponse
      : "Please contact Operator";
    document.getElementById("resText1").style.display = "block";
  }
});
