(() => {
    if (document.getElementById("programFrame") !== null) {
        document.addEventListener("DOMContentLoaded", () => {
            let files = [
                'https://s.vldb2020.org/VLDB2020session.json',
                'https://s.vldb2020.org/VLDB2020timeslot.json',
                'https://s.vldb2020.org/VLDB2020paper.json'
            ];
            Promise.all(
                files.map(async(file) => {
                    const response = await fetch(file);
                    return response.json();
                })
            ).then((response) => {
                const session = response[0];
                const timeslot = response[1].map((i) => {
                    return { slot: i.slot, start: Date.parse(i.start) }
                });
                const paper = response[2];
                console.log(timeselot);
            });
        });
    }
})();