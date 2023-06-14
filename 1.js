const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('results');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const query = input.value;

  // Limpiar resultados anteriores
  results.innerHTML = '';

  // Realizar la búsqueda utilizando la API de YouTube
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=AIzaSyAjsm_rxEOqdEbaCxLYXBn4nM2VAb-BHkk`)
    .then(response => response.json())
    .then(data => {
      // Mostrar los resultados
      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.default.url;

        const listItem = document.createElement('li');
        listItem.classList.add('song-item');

        const image = document.createElement('img');
        image.src = thumbnail;
        image.alt = title;

        const titleElement = document.createElement('span');
        titleElement.textContent = title;

        listItem.appendChild(image);
        listItem.appendChild(titleElement);

        listItem.addEventListener('click', function() {
          playSong(videoId);
        });

        results.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

function playSong(videoId) {
  const playerDiv = document.getElementById('player');
  playerDiv.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}