// Display Announcements from localStorage
document.addEventListener("DOMContentLoaded", function() {
  displayAnnouncements();

  // Handle image preview for the Admin Portal
  document.getElementById('image-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById('image-preview');
    previewContainer.innerHTML = ''; // Clear previous preview

    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.maxWidth = '300px'; // Set max width for image preview
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });
});

document.getElementById('announcement-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const text = document.getElementById('announcement-text').value;
  const announcementType = document.getElementById('announcement-type').value;
  const image = document.getElementById('image-upload').files[0];
  const video = document.getElementById('video-upload').files[0];

  let announcement = {
    text: text,
    type: announcementType,
    image: image ? URL.createObjectURL(image) : null,
    video: video ? URL.createObjectURL(video) : null
  };

  let announcements = JSON.parse(localStorage.getItem('announcements')) || [];
  announcements.push(announcement);
  localStorage.setItem('announcements', JSON.stringify(announcements));

  displayAnnouncements();
  document.getElementById('announcement-form').reset();
});

function displayAnnouncements() {
  const announcementsContainer = document.getElementById('announcements-container');
  announcementsContainer.innerHTML = '';

  let announcements = JSON.parse(localStorage.getItem('announcements')) || [];

  announcements.forEach(function(announcement) {
    const div = document.createElement('div');
    div.classList.add('announcement');

    let content = `<h3>Announcement</h3><p>${announcement.text}</p>`;

    if (announcement.image) {
      content += `<img src="${announcement.image}" alt="Announcement Image">`;
    }

    if (announcement.video) {
      content += `<video controls><source src="${announcement.video}" type="video/mp4">Your browser does not support the video tag.</video>`;
    }

    div.innerHTML = content;
    announcementsContainer.appendChild(div);
  });
}
