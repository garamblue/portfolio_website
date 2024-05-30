// main
/* 
typeIt 
*/
document.addEventListener('DOMContentLoaded', () => {
  new TypeIt('#mainImg1', {
    speed: 50,
    waitUntilVisible: true,
    loop: false
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
    .type("생각보다")
    .break()
    .type("짧습니다.")
    .pause(3000)
    .go();

  new TypeIt('#mainImg2', {
    speed: 50,
    waitUntilVisible: true,
    loop: false
  })
    .pause(1000)
    .type("나에게")
    .break()
    .type("약 30년간의")
    .break()
    .type("시간이")
    .break()
    .type("주어졌다고")
    .break()
    .type("생각하고")
    .pause(4000)
    .go();

  new TypeIt('#mainImg3', {
    speed: 50,
    waitUntilVisible: true,
    loop: false
  })  
    .pause(1000)
    .type("개발자로")
    .break()
    .type("엔지니어로")
    .break()
    .type("남은 인생을")
    .break()
    .type("늘 배우는 자세로")
    .break()
    .type("겸손하게 살아가기를")
    .break()
    .type("다짐해 봅니다!")
    .pause(9000)
    .go();
  
  new TypeIt('#mainImg4', {
    speed: 50,
    waitUntilVisible: true,
    strings: ["Fighting!!!", "🔥_🔥/"],
    loop: true
  })
    .pause(1500)
    .go();
});

/* text sliding */
let mainText = document.querySelector('.mainText');
console.log(`mainText: ${mainText}`);
window.addEventListener('scroll', () => {
  let yValue = window.scrollY;
  //console.log(yValue);
  if(yValue > 150) {
    mainText.style.animation = 'slideOut 3s ease-out forwards';
  } else {
    mainText.style.animation = 'slideIn 3s ease-out';
  }
});

/* menu toggle button */
const toggleBtn = document.querySelector('.menuBtnLink');
const menu = document.querySelector('.menuList');
const icons = document.querySelector('.menuBtnLink');

toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
});



/* slider */
function initSlider() {
  const sliderContainer = document.getElementById('slider');
  const pageContainer = document.createElement('div');

  //페이지 생성
  pageContainer.className = 'pagination';
  sliderContainer.prepend(pageContainer);

  //슬라이드 개수 파악
  const slideCount = document.querySelectorAll('.slide').length;
  //console.log(slideCount);

  for(let i = slideCount; i>0; i--) {
    let radioBtn = document.createElement('input');
    radioBtn.type = 'radio';
    radioBtn.name = 'slideRadios';
    radioBtn.className = 'slideRadio';
    radioBtn.id = `slra${i}`;

    if(i==1) radioBtn.checked = true;
    sliderContainer.prepend(radioBtn);

    //label create
    let label = document.createElement('label');
    label.setAttribute('for', `slra${i}`);
    label.innerHTML = '';
    pageContainer.prepend(label);
  }

  //자동 슬라이드
  let autoRun = setInterval(changeSlide, 5000);

  function changeSlide() {
    const radioBtns = [...document.querySelectorAll('.slideRadio')];
    
    const currentIndex = radioBtns.findIndex(rb => rb.checked);
    console.log(currentIndex);
    //1 / 5
    radioBtns[(currentIndex + 1) % radioBtns.length].checked = true;
  }

  pageContainer.addEventListener('mouseenter', () => clearInterval(autoRun));
  pageContainer.addEventListener('mouseleave', () => autoRun = setInterval(changeSlide, 5000));
}

initSlider();