async function addQuote() {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();
    const block = document.createElement("blockquote");
    const p = document.createElement("p");
    p.textContent = data.quote;
    const cite = document.createElement("cite");
    cite.textContent = "— " + data.author;
    block.append(p, cite);
    document.getElementById("quotes").append(block);
  } catch (e) {
    return;
  }
  observer.disconnect();
  observer.observe(document.querySelector("#quotes blockquote:last-child"));
}

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      addQuote();
    }
  },
  { rootMargin: "600px" }
);

addQuote().then(() => {
  observer.observe(document.querySelector("#quotes blockquote:last-child"));
});
