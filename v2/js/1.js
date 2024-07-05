<script>
  const openPopupButton = document.getElementById("open-popup");
  const popup = document.getElementById("popup");
  const closeButton = document.querySelector(".close-button");

  openPopupButton.addEventListener("click", () => {
    popup.style.display = "block";
  });

  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
  });
</script>