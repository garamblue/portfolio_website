// main
/* typeIt 
new TypeIt("#slogan", {
        speed: 50,
        waitUntilVisible: true,
        loop: false
      })
      .type("JONNN") // 타이핑
      .pause(100) //멈춤
      .move(-3) // 이동(글자수)
      .pause(500)
      .type("HN")
      .pause(1000)
      .move(3)
      .delete(3) // 지우기
      .pause(100)
      .type(" Computer")
      .pause(1000)
      .move(1)
      .go(); // 실행

    new TypeIt("#example2", {
      strings: ["John Computer.", "여행을 좋아하는 개발자 블로그."],
      speed: 50,
    }).go();
    // go 시작 / String (,)콤마 줄바꿈
*/
document.addEventListener('DOMContentLoaded', () => {
  new TypeIt('#mainImg', {
    speed: 50,
    waitUntilVisible: true,
    loop: true
  })
    .pause(2000)
    .type("인생은 영원하지 않고 우리의 시간표는 생각보다 짧습니다.")
    .pause(4000)
    .delete(31)
    .pause(1000)
    .type("나에게 약 30년간의 시간이 주어졌다고 생각하고")
    .pause(4000)
    .delete(30)
    .pause(1000)
    .type("풀 스택 개발자로 남은 인생을 열정적으로 살아가기를")
    .pause(1000)
    .break()
    .type("꿈꿔봅니다 ~ !")
    .pause(4000)
    .delete(40)
    .pause(1000)
    .type("Fighting!!! (🔥__🔥)/")
    .pause(3000)
    .delete(30)
    .go();
  /*

  .type("안녕하세요, TypeIt 예제입니다.")
.pause(500)
.break()
.type("좋은 하루 되세요.")
.go();

  new TypeIt('#slogan1')
    .pause(2000)
    .go();
  new TypeIt('#slogan2')
    .pause(3000)
    .go();
  new TypeIt('#slogan3')
    .pause(4000)
    .go();
  new TypeIt('#slogan4')
    .pause(5000)
    .go();
  */
});

/* text sliding */
let mainText = document.querySelector('.mainText');
console.log(`mainText: ${mainText}`);
window.addEventListener('scroll', () => {
  let yValue = window.scrollY;
  //console.log(yValue);
  if(yValue > 150) {
    mainText.style.animation = 'slideOut 2s ease-out forwards';
  } else {
    mainText.style.animation = 'slideIn 2s ease-out';
  }
});

