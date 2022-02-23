// data endpoints
const reposEndpoint = 'https://api.github.com/users/amaninders/repos?per_page=100&sort=updated&direction=asc'
const gistsEndpoint = 'https://api.github.com/users/amaninders/gists?per_page=100&sort=updated&direction=asc'

// animate scooter and load portfolio on window load
window.onload = function() {
    animateScooter('pablita');
    controlElementVisibility();
};

/**
 * Animates the scooter
 * 
 * @param {object} elementId The ID of the element containing the scooter png.
 */
const animateScooter = (elementId) => {
    const scooter = document.getElementById(elementId)
    wobbleAndMove(scooter, 40, 100);
}

/**
 * wobbles and moves the scooter
 *
 * @param {object} element The html element captured for DOM manipulation
 * @param {nubmer} centerPosition The centerPosition deemed for the element
 * @param {number} startingPosition The startingPosition deemed for the element
 */
const wobbleAndMove = (element, centerPosition = 40, startingPosition = 100) => {
    let wobblePosition = true
    element.style.left = 'auto';
    setInterval(function () {          
        // move to the center
        if (startingPosition > centerPosition ) {
            startingPosition -= 1;
            element.style.right = `${startingPosition}%`
        }
        // bumpy ride
        wobblePosition = !wobblePosition;
        element.style.bottom = wobblePosition ? '2px' : '0';            
    }, 100);
}


/**
 * Controls the visibility of certain components based on the main container in the viewport
 */
const controlElementVisibility = () => {
    const landing = document.getElementById('landing')
    const work = document.getElementById('work')

    document.addEventListener('scroll', function () {
        if (isInViewport(landing)) {
            scooter.style.visibility = 'visible'
            scooter.style.opacity = 1
        }
        if (!isInViewport(landing)) {
            scooter.style.visibility = 'hidden'
            scooter.style.opacity = 0
        }

        if (isInViewport(work)) {
            work.style.backgroundImage = "url('/images/ghost.png')";
        }

        if (!isInViewport(work)) {
            work.style.backgroundImage = "";
        }
    }, {
       
    });
}


/**
 * check the position of element in viewport against given conditions
 *
 * @param {object} el The html element you want to check in the viewport
 * @return {boolean}  true when the element is in the viewport as per conditions
 */
const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (rect.top <= 100 && rect.top >= -200 )
}

/**
 * Get data from github
 * 
 * @returns {array} returns repos and gists as first child last child of an array (in promise)
 */
async function fetchReposAndGists() {
  const [reposResponse, gistsResponse] = await Promise.all([
    fetch(reposEndpoint),
    fetch(gistsEndpoint)
  ]);

  const repos = await reposResponse.json();
  const gists = await gistsResponse.json();
  return [repos, gists];
}

fetchReposAndGists()
    .then(([repos, gists]) => {

        loadData('nav-top', repos, 'repos', true)
        loadData('nav-all', repos, 'repos', false)
        loadData('nav-gists', gists, 'gists', false)
    })
    .catch(error => {
        console.log(error)
    });

/**
 * Appends required data in the given HTML element
 * 
 * @param {string} id ID corresponding to the HTML element
 * @param {array}  dataType The data you want to append
 * @param {string} source The source of data you are passing
 * @param {boolean} conditions use conditions or not to filter the results
 */
const loadData = (id, data, dataType, conditions) => {    
    let html = ''
    let htmlContainer = document.getElementById(id)

    for (const item of data) {
        if (conditions) {
            if (item.stargazers_count) {
                html += htmlCardFor(item, dataType);
            }
        } else {
            html += htmlCardFor(item, dataType);
        } 
    }

    // append HTML
    htmlContainer.innerHTML = html
}

/**
 * @param {object} object
 * @param {string} contentType The expected output type for the HTML content
 * @returns {string} Generated html content from the raw data
 */
const htmlCardFor = (object, contentType) => {
    const dateCreated = humanDate(object.created_at)
    const dateUpdated = humanDate(object.updated_at)

    if (contentType === 'repos') {
        return `
            <div class="row g-0 border rounded overflow-hidden flex-md-row my-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static html-card">
                    <strong class="d-inline-block mb-2 text-success text-center">${object.language || 'Other'}</strong>
                    <h3 class="py-2">${object.name}</h3>
                    <div class="text-muted py-2 text-center">last updated on: ${dateUpdated}</div>
                    <p class="py-1 text-center">${object.description || 'No description available'}</p>
                    <a href="${object.html_url}" class="btn btn-dark text-center w-50 mx-auto">View on GitHub</a>
                </div>
            </div>`
    }

    if (contentType === 'gists') {
        const { files } = object;
        return `
            <div class="row g-0 border rounded overflow-hidden flex-md-row my-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static html-card">
                    <h3 class="py-2 text-center">${Object.keys(files)[0]}</h3>
                    <div class="text-muted py-2 text-center">${dateCreated}</div>
                    <p class="py-1 text-center">${object.description || 'No description available'}</p>
                    <a href="${object.html_url}" class="stretched-link text-center">View on GitHub</a>
                </div>
            </div>`
    }
}


const humanDate = (isoDate) => {
    date = new Date(isoDate);
    return (date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate());
}
