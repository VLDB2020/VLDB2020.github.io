(() => {
    document.addEventListener("DOMContentLoaded", () => {
        let files = ['https://s.vldb2020.org/VLDB2020session.json', 'https://s.vldb2020.org/VLDB2020timeslot.json', 'https://s.vldb2020.org/VLDB2020paper.json'];
        Promise.all(
            files.map((file) => {
                return fetch(file).then((response) => { return response.json() });
            })
        ).then((response) => {
            console.log(response);
        });
    });
})();