const problemKey  = "ProblemD";
const numDisplay  = document.getElementById('numDisplay');
const judgeResult = document.getElementById('judge-result');

document.querySelectorAll('.alph-btn').forEach(button => {
    button.addEventListener('click', function() {
        alphDisplay.value += this.textContent;
    });
});

document.querySelector('.alph-send').addEventListener('click', function() {
    judgeResult.innerHTML = "";
    if(alphDisplay.value === "")
        return;

    judgeResult.innerHTML = generate("info");
    axios.post('/axios/test', {
        problem: problemKey,
        encrypt: alphDisplay.value
    })
    .then(function (response) {
        if(response.data.accept === true){
            judgeResult.innerHTML = generate("success");
            judgeResult.children[0].innerHTML += `<hr> <a href="/certificate?arg=${response.data.secret}&p=${problemKey}" class="alert-link">點擊查看</a>`
        }else{
            judgeResult.innerHTML = generate("danger");
        }
    })
    .catch(function (err) {
        console.error(err);
        judgeResult.innerHTML = generate('warning');
    });
    alphDisplay.value = "";
});

document.querySelectorAll('.alph-backspace').forEach(button => {
    button.addEventListener('click', function() {
        alphDisplay.value = alphDisplay.value.slice(0, -1);
    });
});

document.querySelectorAll('.alph-clear').forEach(button => {
    button.addEventListener('click', function() {
        alphDisplay.value = "";
    });
});

const judgeTable = {
    info : "等待系統回應...",
    success: "你感覺現場出現一絲異樣，就像什麼東西要破繭而出一般...",
    danger : "空氣寂靜得就像什麼都沒有發生一樣...<hr> 魔法筆記本對你的答案十分抗拒，建議你再試試看",
    warning: "Error! Please retry or ask the administrator"
};

function generate(property){
    const resultDisplay = `
        <div class="alert alert-${property}" role="alert">
            ${judgeTable[property]}
        </div>
    `;
    return resultDisplay;
}