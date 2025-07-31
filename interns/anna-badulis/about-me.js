console.log('test');
<script>
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      dots[i].classList.remove('active');
    });
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    slideIndex = index;
  }

  function changeSlide(n) {
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  function currentSlide(n) {
    showSlide(n);
  }

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

</script>