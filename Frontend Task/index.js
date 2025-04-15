const cards = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;

document.getElementById('prev').addEventListener('click', () => {
  cards[currentIndex].classList.remove('active');
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  cards[currentIndex].classList.add('active');
});

document.getElementById('next').addEventListener('click', () => {
  cards[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % cards.length;
  cards[currentIndex].classList.add('active');
});





var acc = document.getElementsByClassName("question");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle active */
    this.classList.toggle("active");

    /* Toggle hide show*/
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}