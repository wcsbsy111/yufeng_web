const emojis = ["🌸", "🌼", "✨", "💫", "🌻", "🌺", "🍀", "🌟", "❀"];

function createEmoji(x, y) {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = (x + 5) + "px";
  emoji.style.top = (y + 5) + "px";
  document.body.appendChild(emoji);
  emoji.addEventListener("animationend", () => emoji.remove());
}

let mouseX = 0, mouseY = 0;
let isMoving = false;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  isMoving = true;
});

function animate() {
  if (isMoving) {
    if (Math.random() < 0.15) {
      createEmoji(mouseX, mouseY);
    }
    isMoving = false;
  }
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// 控制 section 显示/隐藏
function showSection(sectionId) {
  const sections = ['about', 'work', 'contact'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (id === sectionId) {
      el.style.display = 'block';
      if ((id === 'work' || id === 'contact')) {
        el.classList.add('show-alone');
        document.querySelector('.hero-section').classList.add('show-alone');
      } else {
        el.classList.remove('show-alone');
        document.querySelector('.hero-section').classList.remove('show-alone');
      }
    } else {
      el.style.display = 'none';
      el.classList.remove('show-alone');
    }
  });
}

// 初始只显示 about
showSection('about');

// 监听导航点击
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = this.getAttribute('href').replace('#', '');
    showSection(target);
  });
});

// 让 logo 点击时显示全部 section
document.querySelector('.nav-logo').addEventListener('click', function() {
  ['about', 'work', 'contact'].forEach(id => {
    const el = document.getElementById(id);
    el.style.display = 'block';
    el.classList.remove('show-alone');
  });
});

function createMeteor() {
  for (let i = 0; i < 10; i++) {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    meteor.style.left = Math.random() * 100 + 'vw';
    meteor.style.animationDelay = '0s'; // 立即下落
    meteor.style.height = (80 + Math.random() * 80) + 'px';
    meteor.style.opacity = 0.5 + Math.random() * 0.5;
    document.querySelector('.meteor-shower').appendChild(meteor);
    setTimeout(() => meteor.remove(), 1500);
  }
}

// 每隔一段时间生成流星
setInterval(createMeteor, 80);

document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // 清空输入框
  this.querySelectorAll('.form-input').forEach(input => input.value = '');
  // 弹窗提示
  alert('Your message has been sent successfully!');
});