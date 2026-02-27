window.addEventListener('DOMContentLoaded', () => {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.getElementById('mainProductImage');
  
  // Ensure image 1 is selected and displayed by default
  if (thumbnails.length > 0) {
    // Remove 'selected' from all, just in case
    thumbnails.forEach(t => t.classList.remove('selected'));
    thumbnails[0].classList.add('selected');
    if (mainImage) mainImage.src = thumbnails[0].src;
  }
  
  // Clicking a thumbnail shows it as the main image and highlights it
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      document.querySelector('.thumbnail.selected').classList.remove('selected');
      thumb.classList.add('selected');
      if (mainImage) mainImage.src = thumb.src;
    });
  });

  const writeReviewBtn = document.querySelector('.write-review');
  if (writeReviewBtn) {
    writeReviewBtn.addEventListener('click', function() {
      alert('Redirecting to write a review!');
    });
  }
});
