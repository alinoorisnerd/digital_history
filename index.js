
  const searchInput = document.getElementById("searchInput");
  const resultsList = document.getElementById("searchResults");

  const paragraphs = Array.from(document.querySelectorAll(".paragraph")).map((p, index) => ({
    element: p,
    text: p.innerText,
    id: `para-${index}`
  }));

  // Add unique IDs to paragraph containers
  paragraphs.forEach(p => p.element.setAttribute("id", p.id));

  // Reset all highlights
  function clearHighlights() {
    paragraphs.forEach(p => {
      p.element.innerHTML = `<p>${p.text}</p>`;
    });
  }

  // Highlight matched term
  function highlightText(element, phrase) {
    const regex = new RegExp(`(${phrase})`, "gi");
    const highlighted = element.innerText.replace(regex, `<mark>$1</mark>`);
    element.innerHTML = `<p>${highlighted}</p>`;
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    resultsList.innerHTML = "";
    clearHighlights();

    if (!query) return;

    const matches = paragraphs.filter(p => p.text.toLowerCase().includes(query));

    matches.forEach(match => {
      const li = document.createElement("li");
      li.textContent = match.text.slice(0, 60) + "...";
      li.addEventListener("click", () => {
        clearHighlights();
        document.getElementById(match.id).scrollIntoView({ behavior: "smooth", block: "start" });
        highlightText(match.element, query);
        resultsList.innerHTML = "";
        searchInput.value = "";
      });
      resultsList.appendChild(li);
    });
  });

  document.addEventListener("click", (e) => {
    if (!document.querySelector(".search-container").contains(e.target)) {
      resultsList.innerHTML = "";
    }
  });


document.querySelectorAll(".collapsible-btn").forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });

  
  document.querySelectorAll(".trip-toggle-btn").forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isVisible = content.style.display === "block";
      content.style.display = isVisible ? "none" : "block";
    });
  });

  document.querySelectorAll('.clickable-image-bg').forEach(div => {
    div.addEventListener('click', () => {
      const imgUrl = div.getAttribute('data-img');
      if (imgUrl) {
        window.open(imgUrl, '_blank');
      }
    });
  });


