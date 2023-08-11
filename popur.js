const save = document.getElementById("save");
const clear = document.getElementById("clear");
const noteInput = document.getElementById("noteInput");

// set default items
(function checkOldData() {
  getData(function (data) {
    noteInput.value = data
  });
  console.log(1);
})();

// saved on keydown
noteInput.addEventListener('keyup', async function() {
  if (noteInput.value === "") return;
  chrome.storage.local.set({ myData: noteInput.value });
})


//add item
save.addEventListener("click", async () => {
  if (noteInput.value === "") return;
  chrome.storage.local.set({ myData: noteInput.value });
});

//clear all item
clear.addEventListener("click", async () => {
  if (confirm("clear data ?")) {
    chrome.storage.local.clear(function () {
      noteInput.value = "";
    });
  }
});

//get item to storage
async function getData(callback) {
  chrome.storage.local.get(["myData"], function (result) {
    let savedData = result.myData || "";
    if (callback) {
      callback(savedData);
    }
  });
}
