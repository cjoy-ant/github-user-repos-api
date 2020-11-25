function getUserRepos() {
  let user = getUserHandle();
  let userApi = `https://api.github.com/users/${user}/repos`
  console.log(`API: ${userApi}`);
  fetch (userApi)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Something went wrong. Try again.`)
    })
}

function getUserHandle() {
  let userHandle = $('input[type=text][name=user-handle][id=input-user-handle]').val();
  return userHandle;
}

function displayResults(responseJson) {
  console.log(responseJson);
  let index = responseJson.length;
  $('#results-list').empty();
  if (responseJson.length > 0 ) {
    $('section h2').replaceWith(`
      <h2>GitHub User Handle: <a href="https://www.github.com/${getUserHandle()}">${getUserHandle()}</a></h2>
    `);
    for (let i=0; i < index; i++) {
      $('#results-list').append(
        `<li><p><a href="${responseJson[i].html_url}">${responseJson[i].description}</a></p>
        </li>
        `
      ); 
    }
    $('#js-results').removeClass('hidden');
  } else {
    $('#js-results').addClass('hidden');
    $('#js-error-message').text(`User handle '${getUserHandle()}' not found.`)
    $('#js-error-mesage').removeClass('hidden');

  }
}

function watchForm () {
  $('form').submit(event => {
    event.preventDefault();
    getUserRepos();
  });
}

$(watchForm);