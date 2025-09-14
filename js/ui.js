function UI() {
    this.quizBox = document.getElementById("quiz-box");
    this.body = document.querySelector("#quiz-box #body");
    this.correctIcon = '<i class="bi bi-check-circle"></i>';
    this.incorrectIcon = '<i class="bi bi-x-circle"></i>';
    this.btnNext = document.querySelector(".btn-next");
    this.btnStart = document.querySelector(".btn-start");
    this.btnReplay = document.querySelector(".btn-replay");
    this.btnQuit = document.querySelector(".btn-quit");
    this.scoreBox = document.getElementById("score-box");
    this.buttonBox = document.querySelector("#button-box");
    this.timeText = document.querySelector(".time-text");
    this.timeSecond = document.querySelector(".time-second");
    this.timeLine = document.querySelector(".time-line");
}

UI.prototype.soruGoster = function(soru) {
    this.body.innerHTML = "";
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("question-title");
    title.textContent = soru.soruMetni;

    const list_group = document.createElement("div");
    list_group.classList.add("list-group");

    for (let [key, value] of Object.entries(soru.cevapSecenekleri)) {
        const list_group_item = document.createElement("div");
        list_group_item.classList.add("list-group-item");
        list_group_item.addEventListener("click", optionSelected);
        
        const span = document.createElement("span");
        span.textContent = key + ") " + value;

        list_group_item.appendChild(span);
        list_group.appendChild(list_group_item);
}
    cardBody.appendChild(title);
    cardBody.appendChild(list_group);

    this.body.appendChild(cardBody);
}

UI.prototype.disableAllOptions = function() {
    const list_group_items = document.querySelectorAll(".list-group-item");
    for (let list_group_item of list_group_items) {
        list_group_item.classList.add("disabled");
    }
}

UI.prototype.soruSayisiniGoster = function(soruSirasi, toplamSoru) {
    const etiket = `<span class="badge text-bg-danger">${soruSirasi} / ${toplamSoru}</span>`;
    document.querySelector(".question-index").innerHTML = etiket;
}
UI.prototype.skoruGoster = function(dogruCevap, toplamSoru) {
    const sonuc = dogruCevap * 1000;
    const score_box = `Toplam ${toplamSoru} soruda ${dogruCevap} doğru yaptınız. <br>
    Ödülünüz: ${sonuc} TL`;
    document.querySelector(".score-text").innerHTML = score_box;
}

