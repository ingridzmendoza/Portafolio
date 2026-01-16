const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector(".accordion-icon");

        const isOpen = content.classList.contains("open");

        // cerrar acordion
        document.querySelectorAll(".accordion-content").forEach(c => {
            c.style.maxHeight = null;
            c.classList.remove("open");
        });

        document.querySelectorAll(".accordion-icon").forEach(i => {
            i.textContent = "+";
        });

        // abrir acordion
        if (!isOpen) {
            content.classList.add("open");
            content.style.maxHeight = content.scrollHeight + "px";
            icon.textContent = "–";
        }
    });
});


