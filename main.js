// Mouse trail effect removed.

// 控制 section 显示/隐藏
function showSection(sectionId) {
  // 包含 Publication（注意大小写，与 HTML 中 id="Publication" 保持一致）
  const sections = ['about', 'work', 'publication', 'contact'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return; // 防止找不到元素时报错
    if (id === sectionId) {
      el.style.display = 'block';
      // 只有 work 和 contact （以及 Publication）应单独展示并把 hero 设置为 show-alone
  if (id === 'work' || id === 'contact' || id === 'publication') {
        el.classList.add('show-alone');
        const hero = document.querySelector('.hero-section');
        if (hero) hero.classList.add('show-alone');
      } else {
        el.classList.remove('show-alone');
        const hero = document.querySelector('.hero-section');
        if (hero) hero.classList.remove('show-alone');
      }
    } else {
      el.style.display = 'none';
      el.classList.remove('show-alone');
    }
  });
}

// 初始显示：如果 URL 带有 hash（例如 index.html#work），优先显示对应 section；否则默认 about
(function initInitialSection() {
  const allowed = ['about', 'work', 'publication', 'contact'];
  const hash = (window.location.hash || '').replace('#', '');
  if (hash && allowed.includes(hash)) {
    // 当通过外部链接带 hash 打开时，显示单个 section 模式
    showSingleSection(hash);
  } else {
    showSection('about');
  }
})();

// 注意：导航点击监听器在下方被替换为 showSingleSection 以控制 body 类

// 让 logo 点击时显示全部 section
document.querySelector('.nav-logo').addEventListener('click', function() {
  ['about', 'work', 'publication', 'contact'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = 'block';
    el.classList.remove('show-alone');
  });
  const hero = document.querySelector('.hero-section');
  if (hero) hero.classList.remove('show-alone');
  // 给 body 添加一个类，表示当前显示全部（用于 CSS 调整圆角）
  document.body.classList.add('all-visible');
});

// 在导航点击显示单个 section 时移除 body 的 all-visible 类
const originalShowSection = showSection;
function showSingleSection(sectionId) {
  // remove full view class when switching to a single section
  document.body.classList.remove('all-visible');
  originalShowSection(sectionId);
}

// 替换 nav-link 的事件处理：仅拦截以 # 开头的内部锚点，外部链接（如 CV.pdf）正常打开
document.querySelectorAll('.nav-link').forEach(link => {
  link.removeEventListener && link.removeEventListener('click', function(){});
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href') || '';
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = href.replace('#', '');
      showSingleSection(target);
    }
    // otherwise allow default behavior (open PDF/external link)
  });
});

// Meteor shower removed.

// Ensure fixed header doesn't cover content: set body padding-top to nav height
function updateBodyPaddingForNav() {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;
  // get computed height including padding/border
  const navRect = nav.getBoundingClientRect();
  const computedStyle = getComputedStyle(nav);
  const height = navRect.height + parseFloat(computedStyle.marginBottom || 0);
  document.body.style.paddingTop = height + 'px';
}

window.addEventListener('resize', updateBodyPaddingForNav);
window.addEventListener('load', updateBodyPaddingForNav);
document.addEventListener('DOMContentLoaded', updateBodyPaddingForNav);

document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // 清空输入框
  this.querySelectorAll('.form-input').forEach(input => input.value = '');
  // 弹窗提示
  alert('Your message has been sent successfully!');
});