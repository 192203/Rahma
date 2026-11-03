const modal = document.getElementById('messageModal');
const modalText = document.getElementById('modalText');
const modalTitle = document.getElementById('modalTitle');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
function openModal(message, title = 'إلى رحمة ❤️', icon = '💌') {
  modalText.textContent = message;
  modalTitle.textContent = title;
  document.getElementById('modalIcon').textContent = icon;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-close="true"]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

document.querySelectorAll('[data-letter]').forEach((card, i) => {
  card.addEventListener('click', () => openModal(card.dataset.letter, ['عن وجودك يا رحمة','أمنية من قلبي','حكايتنا الجميلة'][i], ['💌','🌷','📖'][i]));
});

function makeHearts(count = 12) {
  const symbols = ['♥','♡','✦','💗'];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-particle';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${10 + Math.random() * 80}%`;
    heart.style.top = `${45 + Math.random() * 40}%`;
    heart.style.animationDelay = `${Math.random() * .4}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1900);
  }
}
document.getElementById('surpriseBtn').addEventListener('click', () => {
  makeHearts(20);
  openModal('يا رحمة، يمكن الكلمات مهما كانت حلوة مش هتعرف توصف كل اللي جوايا، بس حبيت أعملك حاجة مختلفة تفضل تفكّرك إن فيه حد بيتمنالك الخير والفرحة من قلبه. ❤️', 'مفاجأة مخصوصة ليكي', '🎁');
});
document.getElementById('sparkleBtn').addEventListener('click', () => {
  makeHearts(10);
  showToast('أمنية صغيرة: يومك يكون حلو شبه قلبك يا رحمة ✨');
});
document.getElementById('storyBtn').addEventListener('click', () => {
  const ending = document.getElementById('storyEnding');
  ending.hidden = !ending.hidden;
  document.getElementById('storyBtn').textContent = ending.hidden ? 'كمّلي الحكاية ✨' : 'خبّي النهاية';
  if (!ending.hidden) ending.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
document.getElementById('wishBtn').addEventListener('click', function() {
  if (this.classList.contains('launched')) return;
  this.classList.add('launched');
  makeHearts(16);
  document.getElementById('wishResult').textContent = 'أمنيتك وصلت للسما ⭐ يا رب أيامك كلها فرحة وراحة بال يا رحمة.';
  setTimeout(() => this.classList.remove('launched'), 1200);
});
document.getElementById('finalBtn').addEventListener('click', () => {
  makeHearts(24);
  openModal('يا رحمة، شكرًا إنك الشخص اللي خلاني أحب أعمل حاجة حلوة بالشكل ده. أتمنى لك قلب مطمّن، وضحكة ما تغيبش، وأيام مليانة خير. ولو فيه حاجة واحدة عايزك تفتكريها، فهي إنك تستاهلي كل الحب والاحترام والفرح. ❤️', 'آخر رسالة.. وأصدقها', '💖');
});

const loveAudio = document.getElementById('loveAudio');
let musicPlaying = false;
async function toggleMusic() {
  try {
    if (!musicPlaying) {
      await loveAudio.play();
      musicPlaying = true;
      musicBtn.textContent = '♫ إيقاف الموسيقى';
      musicBtn.setAttribute('aria-pressed', 'true');
      showToast('بدأت الموسيقى الرومانسية لأميرتي 💗');
    } else {
      loveAudio.pause();
      musicPlaying = false;
      musicBtn.textContent = '♫ تشغيل الموسيقى';
      musicBtn.setAttribute('aria-pressed', 'false');
      showToast('تم إيقاف الموسيقى.');
    }
  } catch (error) {
    showToast('تعذر تشغيل الموسيقى. تأكدي من وجود music.mp3 بجوار ملفات الموقع.');
  }
}
musicBtn.addEventListener('click', toggleMusic);

const introSplash = document.getElementById('introSplash');
function dismissIntro() {
  if (!introSplash || introSplash.classList.contains('leaving')) return;
  introSplash.classList.add('leaving');
  document.body.style.overflow = '';
  setTimeout(() => introSplash.remove(), 1100);
}
if (introSplash) {
  document.body.style.overflow = 'hidden';
  document.getElementById('introSkip').addEventListener('click', dismissIntro);
  setTimeout(dismissIntro, 3600);
}

const photoInput = document.getElementById('photoInput');
const photoGrid = document.getElementById('photoGrid');
const defaultPhotoCards = `
  <div class="photo-placeholder"><span>🌷</span><strong>لحظة حلوة</strong><small>أضيفي صورة من اختيارك</small></div>
  <div class="photo-placeholder"><span>🌙</span><strong>ذكرى جميلة</strong><small>مكان لصورة بتحبيها</small></div>
  <div class="photo-placeholder"><span>💌</span><strong>كلام من القلب</strong><small>كل ذكرى ليها حكاية</small></div>`;
function addPhotoTile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = () => {
    const tile = document.createElement('div');
    tile.className = 'photo-tile';
    const img = document.createElement('img');
    img.src = reader.result;
    img.alt = 'ذكرى جميلة';
    const caption = document.createElement('div');
    caption.className = 'photo-caption';
    caption.textContent = 'ذكرى جميلة لأميرتي ❤️';
    const remove = document.createElement('button');
    remove.className = 'remove-photo';
    remove.type = 'button';
    remove.setAttribute('aria-label', 'إزالة الصورة');
    remove.textContent = '×';
    remove.addEventListener('click', () => tile.remove());
    tile.append(img, caption, remove);
    if (photoGrid.querySelector('.photo-placeholder')) photoGrid.innerHTML = '';
    photoGrid.appendChild(tile);
  };
  reader.readAsDataURL(file);
}
photoInput.addEventListener('change', event => {
  [...event.target.files].slice(0, 12).forEach(addPhotoTile);
  if (event.target.files.length > 12) showToast('تم اختيار أول 12 صورة فقط علشان الموقع يفضل سريع.');
  event.target.value = '';
});
document.getElementById('clearPhotosBtn').addEventListener('click', () => {
  photoGrid.innerHTML = defaultPhotoCards;
  showToast('اتمسحت الصور من العرض الحالي فقط.');
});
document.getElementById('heartRainBtn').addEventListener('click', () => {
  makeHearts(55);
  showToast('مطر قلوب مخصوص لأميرتي رحمة 💗');
});

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("copy", function (e) {
  e.preventDefault();
});

document.addEventListener("cut", function (e) {
  e.preventDefault();
});

document.addEventListener("selectstart", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  if (
    (e.ctrlKey || e.metaKey) &&
    ["c", "x", "a"].includes(e.key.toLowerCase())
  ) {
    e.preventDefault();
  }
});

(() => {
  const card = document.getElementById('timeChoiceCard');
  const message = document.getElementById('timeChoiceMessage');
  if (!card || !message) return;

  const fullMessage = 'لو رجع بيا الزمن هختارك في كل زمان ومكان';
  const letters = Array.from(fullMessage);
  let started = false;
  let index = 0;

  function typeNextLetter() {
    if (index >= letters.length) return;
    message.textContent += letters[index];
    index += 1;
    window.setTimeout(typeNextLetter, 115);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          typeNextLetter();
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.45 });
    observer.observe(card);
  } else {

    const checkPosition = () => {
      if (started) return;
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
        started = true;
        typeNextLetter();
        window.removeEventListener('scroll', checkPosition);
      }
    };
    window.addEventListener('scroll', checkPosition, { passive: true });
    checkPosition();
  }
})();

const envelopeButton = document.getElementById('openEnvelope');
if (envelopeButton) {
  envelopeButton.addEventListener('click', () => {
    makeHearts(18);
    openModal('يا رحمة، كتبتلك الجواب ده علشان أقولك إنك تستاهلي كل كلمة حلوة، وكل اهتمام صادق، وكل يوم مليان طمأنينة. أتمنى تفضلي دايمًا بخير، وتلاقي في أيامك أسباب كتير تضحكي من قلبك. ❤️', 'جواب مخصوص لأميرتي', '💌');
  });
}

(() => {
  const dateInput = document.getElementById('memoryStartDate');
  const counter = document.getElementById('timeCounter');
  const hint = document.getElementById('counterHint');
  if (!dateInput || !counter || !hint) return;

  let timerId;
  const updateCounter = () => {
    if (!dateInput.value) {
      counter.hidden = true;
      hint.textContent = 'اختار التاريخ اللي تحب تبدأ منه الحكاية.';
      if (timerId) clearInterval(timerId);
      return;
    }
    const start = new Date(`${dateInput.value}T00:00:00`);
    const now = new Date();
    const diff = now - start;
    if (!Number.isFinite(start.getTime()) || diff < 0) {
      counter.hidden = true;
      hint.textContent = 'اختار تاريخ النهارده أو تاريخ أقدم.';
      if (timerId) clearInterval(timerId);
      return;
    }
    const totalSeconds = Math.floor(diff / 1000);
    document.getElementById('countDays').textContent = Math.floor(totalSeconds / 86400).toLocaleString('ar-EG');
    document.getElementById('countHours').textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0');
    document.getElementById('countMinutes').textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    document.getElementById('countSeconds').textContent = String(totalSeconds % 60).padStart(2, '0');
    counter.hidden = false;
    hint.textContent = 'كل لحظة حلوة تستاهل نفتكرها ❤️';
  };
  dateInput.addEventListener('change', () => {
    updateCounter();
    if (timerId) clearInterval(timerId);
    if (dateInput.value) timerId = setInterval(updateCounter, 1000);
  });
})();

(() => {
  const button = document.getElementById('finalBtn');
  const message = document.getElementById('finalSurpriseMessage');
  if (!button || !message) return;
  button.addEventListener('click', () => {
    message.hidden = false;
    button.textContent = 'بحب أشوف ابتسامتك ❤️';
    makeHearts(28);
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();


(() => {
  const jar = document.getElementById('drawReason');
  const again = document.getElementById('anotherReason');
  const paper = document.getElementById('reasonPaper');
  const reasonText = document.getElementById('reasonText');
  if (!jar || !again || !paper || !reasonText) return;
  const reasons = [
    'بحب ضحكتك اللي بتخلّي اليوم العادي يوم جميل.',
    'بحب طريقتك في الكلام، حتى في أبسط التفاصيل.',
    'بحب إن وجودك لوحده بيخلّي الدنيا أهدى.',
    'بحب قلبك وروحك الحلوة.',
    'بحب كل مرة بتخلّيني أبتسم من غير ما أحس.',
    'بحب تفاصيلك الصغيرة اللي يمكن إنتِ مش واخدة بالك منها.',
    'بحب إنك مختلفة ومفيش حد شبهك.',
    'بحب كلامك اللي بيطمن قلبي.',
    'بحب عيونك والفرحة اللي بتبان فيها.',
    'بحب إن اسمك بقى مرتبط عندي بأجمل إحساس.',
    'بحب وجودك في يومي، حتى لو بكلمة صغيرة.',
    'بحب طيبتك وحنانك.',
    'بحب إنك بتخلّي للحاجات البسيطة معنى كبير.',
    'بحب أفتكر ضحكتك في وسط زحمة اليوم.',
    'بحب كل مرة أعرفك فيها أكتر، أكتشف سبب جديد لحبك.',
    'بحب عفويتك وتلقائيتك.',
    'بحب إنك أول حد ييجي في بالي لما أشوف حاجة حلوة.',
    'بحب تفاصيلك اللي مش بتتكرر.',
    'بحب إحساسي وأنا بتمنالك كل الخير.',
    'بحبك لأنك إنتِ، من غير أي سبب محتاج يتشرح.'
  ];
  let lastIndex = -1;
  function draw() {
    let index = Math.floor(Math.random() * reasons.length);
    if (reasons.length > 1 && index === lastIndex) index = (index + 1) % reasons.length;
    lastIndex = index;
    reasonText.textContent = reasons[index];
    paper.hidden = false;
    again.hidden = false;
    paper.classList.remove('paper-refresh');
    void paper.offsetWidth;
    paper.classList.add('paper-refresh');
  }
  jar.addEventListener('click', draw);
  again.addEventListener('click', draw);
})();
