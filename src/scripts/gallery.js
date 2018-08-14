const socket = io();
socket.on('init', function(data) {
  const galleryData = getData(data);
  let currentPage = 1;
  let visiblePages = generatePages(currentPage, galleryData);
  paginationInit(galleryData.nrOfPages);
  showPages(visiblePages);
  activePageToggle(currentPage);
  showGalleryOfSelectedPage(currentPage, galleryData);
  switchPage(galleryData);
});

let getData = (data) => {
  return dane = {
    imageList: data.imageList,
    nrOfPages: data.nrOfPages,
    nrOfImages: data.nrOfImages
  };
}

let paginationInit = (nrOfPages) => {
  $(".pagination").append('<a href="#"><p>&laquo; Previous</p></a>');
  $(".pagination").append('<a class="pageNr" aria-label="page ' + 1 + '" href="#" id="p' + 1 + '"><p>' + 1 + '</p></a>');
  $(".pagination").append('<div class="pagination-interactive"</div>');
  $(".pagination").append('<p>of ' + nrOfPages + '</p>');
  $(".pagination").append('<a href="#"><p>Next &raquo;</p></a>');
}

let clearGallery = () => {
  $('.gallery').find('.card').each(function() {
    $(this).remove();
  });
}

let showGalleryOfSelectedPage = (currentPage, galleryData) => {
  let i = (currentPage * 10) - 10;
  let c = 0;
  while (c < 10) {
    if (i < galleryData.nrOfImages) {
      $(".gallery").append('<figure class="card"><img class="card-image" src="static/' + galleryData.imageList[i] + '" alt="Image: ' + i + '"><figcaption class="card-caption">' + galleryData.imageList[i] + '</figcaption></figure>');
      i++;
      c++;
    } else {
      c = 10;
    }
  }
}

let activePageToggle = (id) => {
  $('.pagination').find('a').each(function() {
    $(this).removeClass('pagination-active');
  })
  $('#p' + id).toggleClass('pagination-active');
}

let generatePages = (currentPage, galleryData) => {
  let i = 0;
  let j = currentPage - 2;
  let k = Number(currentPage) + 2;
  let visiblePages = [];
  for (j; j <= k; j++) {
    if (j > 1 && j <= galleryData.nrOfPages) {
      visiblePages[i] = j;
      i++;
    }
  }
  return visiblePages;
}

let showPages = (visiblePages) => {
  $('.pagination-interactive').find('.interactiveElement').each(function() {
    $(this).remove();
  });
  if (visiblePages.length > 2) {
    $(".pagination-interactive").append('<p class="interactiveElement">...</p>');
  }
  for (let i = 0; i <= visiblePages.length - 1; i++) {
    $(".pagination-interactive").append('<a class="pageNr interactiveElement" aria-label="page ' + visiblePages[i] + '" href="#" id="p' + visiblePages[i] + '"><p>' + visiblePages[i] + '</p></a>');
  }
}

let switchPage = (galleryData) => {
  $('.pageNr').click(function(e) {
    let id = e.currentTarget.attributes.id.textContent;
    let currentPage = id.substring(1, 2);
    let visiblePages = generatePages(currentPage, galleryData);
    clearGallery();
    showPages(visiblePages);
    activePageToggle(currentPage);
    showGalleryOfSelectedPage(currentPage, galleryData);
    return false;
  });
}
