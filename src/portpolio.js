// main
/* 
typeIt 
*/
document.addEventListener('DOMContentLoaded', () => {
  new TypeIt('#mainImg1', {
    speed: 50,
    waitUntilVisible: true,
    loop: true
  })
    .pause(2000)
    .type("인생은")
    .break()
    .type("영원하지 않고")
    .break()
    .type("우리의")
    .break()
    .type("시간표는")
    .break()
    .type("생각보다 짧습니다.")
    .pause(3000)
    .go();

  new TypeIt('#mainImg2', {
    speed: 50,
    waitUntilVisible: true,
    loop: true
  })
    .pause(1000)
    .type("나에게")
    .break()
    .type("약 30년간의 시간이")
    .break()
    .type("주어졌다고 생각하고")
    .pause(3000)
    .go();

  new TypeIt('#mainImg3', {
    speed: 50,
    waitUntilVisible: true,
    loop: true
  })  
    .pause(1000)
    .type("풀 스택")
    .break()
    .type("개발자로 남은 인생을")
    .break()
    .type("열정적으로 살아가기를")
    .break()
    .type("꿈꿔봅니다 ~ !")
    .pause(3000)
    .go();
  
  new TypeIt('#mainImg4', {
    speed: 50,
    waitUntilVisible: true,
    strings: ["Fighting!!!", "🔥_🔥/"],
    loop: true
  })
    .pause(1000)
    .go();
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

/* menu toggle button */
const toggleBtn = document.querySelector('.menuBtnLink');
const menu = document.querySelector('.menuList');
const icons = document.querySelector('.menuBtnLink');

toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
});