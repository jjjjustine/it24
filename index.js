class AppletGallery {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.applets = [];
        this.init();
    }

    async init() {
        await this.fetchData();
        this.renderAppletGallery(this.applets); 
        this.bindSearchEvent();
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            this.applets = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderAppletGallery(applets) {
        const appletContainer = document.getElementById('appletContainer');
        appletContainer.innerHTML = applets.map(applet => 
            `<div class="card" style="width: 18rem;">
                <img src="${applet.image}" class="card-img-top" alt="${applet.title}">
                <div class="card-body">
                  <h5 class="card-title">${applet.title}</h5>
                  <p class="card-text">${applet.description}</p>
                  <a href="${applet.link}" class="btn btn-primary">Go to ${applet.title}</a>
                </div>
             </div>`
        ).join('');
    }

    bindSearchEvent() {
        const appletSearchBar = document.getElementById('appletSearchBar');

        appletSearchBar.addEventListener('input', () => {
            this.filterApplets(appletSearchBar.value);
        });
    }

    filterApplets(query) {
        const filteredApplets = this.applets.filter(applet => 
            applet.title.toLowerCase().includes(query.toLowerCase())
        );
        this.renderAppletGallery(filteredApplets);
    }
}

const appletGallery = new AppletGallery('index.json');

