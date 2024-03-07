// 초기값
const 정답 = "APPLE";
let attempts = 0;
let index = 0;
let timer;
const 정답색 = "rgb(106, 170, 100)";
const 보조색 = "rgb(201, 180, 88)";
const 오답색 = "rgb(120, 124, 126)";

//앱 시작
function appStart() {
  //게임오버 출력
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "GAME OVER";
    div.style =
      "display: grid; place-items: center; position: absolute; top:calc(50% - 128px); left:calc(50% - 101px);background-color:white; width: 200px; height: 200px; border: 1px solid black;";
    div.style.fontFamily = "'DM Serif Display', serif;";
    div.style.fontweight = "400";
    div.style.fontstyle = "normal";
    div.style.fontSize = "30px";
    document.body.appendChild(div);
  };
  // 게임오버
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  // 다음줄로 넘어가기
  const nextLine = () => {
    attempts += 1;
    index = 0;
    if (attempts === 6) return gameover();
  };

  // EnterKey 입력함수
  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 키보드 = document.querySelector(
        `.keyboard-column[data-key='${입력한_글자}']`
      );
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = 정답색;
        키보드.style.background = 정답색;
      } else if (정답.includes(입력한_글자)) {
        block.style.background = 보조색;
        if (키보드.style.background != 정답색) 키보드.style.background = 보조색;
      } else {
        block.style.background = 오답색;
        if (
          키보드.style.background != 정답색 ||
          키보드.style.background != 보조색
        )
          키보드.style.background = 오답색;
      }

      // console.log("입력한 글자 : ", 입력한_글자, "정답 글자 : ", 정답_글자);
    }

    if (맞은_갯수 === 5) {
      document.querySelector(`.board-row-${attempts}`).animate(
        {
          transform: ["rotateX(360deg)"],
        },
        {
          duration: 800, // 밀리초 지정
          fill: "forwards", // 종료 시 속성을 지님
          easing: "linear", // 가속도 종류
        }
      );
      gameover();
    } else {
      document.querySelector(`.board-row-${attempts}`).animate(
        {
          transform: [
            "translateX(5px)",
            "translateX(-5px)",
            "translateX(5px)",
            "translateX(-5px)",
            "translateX(0px)",
          ],
        },
        {
          duration: 800, // 밀리초 지정
          fill: "forwards", // 종료 시 속성을 지님
          easing: "linear", // 가속도 종류
        }
      );
    }
    nextLine();
  };

  // 백스페이스 입력
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  // 마우스 입력
  const handleMousedown = () => {
    const 테스트 = document.querySelector(".keyboard-column:hover");
    if (테스트 != null) {
      const mousekey = 테스트.getAttribute("data-key");
      const mousekeyCode = 테스트.getAttribute("data-key").charCodeAt();
      handlejudge(mousekey, mousekeyCode);
    }
  };

  // 키 입력
  const handleKeydown = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;
    handlejudge(key, keyCode);
  };

  //판단
  const handlejudge = (key, keyCode) => {
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90 && key != "Enter") {
      thisBlock.innerText = key.toUpperCase();
      index = index + 1;
    }
  };
  //타이머
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString();
      const 초 = 흐른_시간.getSeconds().toString();
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
    }

    timer = setInterval(setTime, 1000);
    // console.log(timer);
  };

  // 메인
  startTimer();
  window.addEventListener("click", handleMousedown);
  window.addEventListener("keydown", handleKeydown);
}

appStart();
