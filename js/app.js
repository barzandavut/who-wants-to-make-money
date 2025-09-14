const soruListesi = [
    new Soru("1- Psikanaliz kuramının kurucusu kimdir?", {A: "Alfred Adler", B: "Carl G. Jung", C: "Sigmund Freud", D: "Erich Fromm"}, "C"),
    new Soru(`2- Psikanaliz kuramı, "İnsanın ruhsal faaliyetlerinin esasını" neye dayandırmaktadır?`, {A: "Bilinç", B: "Bilinçöncesi", C: "Arketipler", D:"Bilindışı"}, "D"),
    new Soru("3- Aşırı yiyecek tüketiminin ardından fazla kaloriden kurtulmak adına telafi davranışlarının sergilenmesiyle karakterize bir yeme bozukluğu hangisidir?", {A: "Tıkınırcasına Yeme Bozukluğu", B: "Bulimia Nervoza", C: "Histerik Nevroz", D: "Obsesif Nevroz"}, "B"),
    new Soru("4- Arketip kavramı kime aittir?", {A: "Alfred Adler", B: "Sigmund Freud", C: "Carl G. Jung", D: "Viktor Frankl"}, "C"),
    new Soru("5- İstemsizce ve tekrarlayan biçimde sesler çıkarma ya da hareketlerde bulunma gibi tik olarak bilinen davranışlara neden olan nörolojik bozukluğun adı nedir?", {A: "Tourette Sendromu", B: "Rett Sendromu", C: "Asperger Sendromu", D: "Stockholm sendromu"}, "A")
];

const quiz = new Quiz(soruListesi);
const ui = new UI();

ui.btnStart.addEventListener("click", function() {
    startTimer(10);
    startTimerLine();
    ui.scoreBox.classList.remove("active");
    ui.quizBox.classList.add("active");
    ui.buttonBox.classList.remove("active");
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btnNext.classList.remove("show");
});

ui.btnNext.addEventListener("click", function() {
    if(quiz.sorular.length != quiz.soruIndex){
        startTimer(10);
        startTimerLine();
        ui.soruGoster(quiz.soruGetir());
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        ui.btnNext.classList.remove("show");
    } else {
        ui.scoreBox.classList.add("active");
        ui.quizBox.classList.remove("active");
        ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
    }
});
function optionSelected(e) {
    clearInterval(counter);
    clearInterval(counterLine);
    let selectedElement = e.target;

    if(selectedElement.nodeName == "SPAN") {
        selectedElement = selectedElement.parentElement;
    }

    const cevap = e.target.textContent[0];
    const soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi += 1;
        selectedElement.classList.add("correct");
        selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        selectedElement.classList.add("incorrect");
        selectedElement.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    quiz.soruIndex += 1;
    ui.disableAllOptions();
    ui.btnNext.classList.add("show");
}

ui.btnQuit.addEventListener("click", function() {
    window.location.reload();
});

ui.btnReplay.addEventListener("click", function() {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.scoreBox.classList.remove("active");
    ui.btnStart.click();
});

let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);
    
    function timer() {
        ui.timeSecond.textContent = time;
        time--;

        if(time < 0) {
            clearInterval(counter);
            ui.timeText.textContent = "Süre Bitti";

            ui.disableAllOptions();
            quiz.soruIndex += 1;
            ui.btnNext.classList.add("show");
        }
    }
}
let counterLine;

function startTimerLine() {
    let lineWidth = 0;
    counterLine = setInterval(timer, 20);

    function timer() {
        lineWidth += 1;
        ui.timeLine.style.width = lineWidth + "px";
        
        if(lineWidth > 549) {
            clearInterval(counterLine);
        }
    }
}