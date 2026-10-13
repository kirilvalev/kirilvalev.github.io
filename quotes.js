const main = document.getElementById("quotes");
let busy = false;

async function fetchQuote() {
  const res = await fetch("https://dummyjson.com/quotes/random");
  const data = await res.json();
  const block = document.createElement("blockquote");
  const p = document.createElement("p");
  p.textContent = data.quote;
  const cite = document.createElement("cite");
  cite.textContent = "— " + data.author;
  block.append(p, cite);
  return block;
}

const bottomObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) loadBottom();
  },
  { rootMargin: "50px" }
);

const topObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && main.children.length > 1 && window.scrollY === 0) loadTop();
  },
  { rootMargin: "50px" }
);

async function loadBottom() {
  if (busy) return;
  busy = true;
  try {
    const block = await fetchQuote();
    bottomObserver.disconnect();
    main.append(block);
    bottomObserver.observe(main.lastElementChild);
  } catch (e) {}
  busy = false;
}

async function loadTop() {
  if (busy) return;
  busy = true;
  try {
    const block = await fetchQuote();
    topObserver.disconnect();
    main.prepend(block);
    window.scrollBy(0, block.offsetHeight);
    topObserver.observe(main.firstElementChild);
  } catch (e) {}
  busy = false;
}

(async () => {
  try {
    const block = await fetchQuote();
    main.append(block);
    bottomObserver.observe(block);
    topObserver.observe(block);
  } catch (e) {}
})();
