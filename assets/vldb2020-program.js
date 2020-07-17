(() => {
    const onLoadFn = () => {
        if (document.getElementById("programTimeCircle") !== null) {
            setInterval(start, 6000);
            start();
        }
        if (document.getElementById("programFrame") !== null) {
            const frBreak = 2;
            const frSession = 3;
            const frTime = 1;
            var link = document.createElement('link');
            link.rel = 'stylesheet/less';
            link.type = 'text/css';
            link.href = '/assets/vldb2020-program.less';
            document.getElementsByTagName('HEAD')[0].appendChild(link);
            less.sheets.push(document.querySelector('link[href="/assets/vldb2020-program.less"]'));
            less.refresh();
            let files = [
                'https://s.vldb2020.org/VLDB2020session.json',
                'https://s.vldb2020.org/VLDB2020timeslot.json'
                /*,
                                'https://s.vldb2020.org/VLDB2020paper.json'
                                */
            ];
            Promise.all(
                files.map(async(file) => {
                    const response = await fetch(file);
                    return response.json();
                })
            ).then((response) => {
                let maxParallel = 0;
                let session = {};
                let series = {};
                let timeslotIdx = {}
                const timeslot = response[1].map((i, idx) => {
                    timeslotIdx[i.slot] = idx;
                    return { slot: i.slot, start: Date.parse(i.start), block: i.block }
                });

                let calculateSpan = (slot, duration) => {
                    let span = 0;
                    let end = 0;
                    for (let i = 0; i < timeslot.length; i++) {
                        if (span > 0) {
                            if (end <= timeslot[i].start) {
                                break;
                            } else {
                                span++;
                            }
                        } else if (timeslot[i].slot == slot) {
                            span = 1;
                            end = timeslot[i].start + duration * 60000;
                        }
                    }
                    return span;
                };
                let roomIdx = {};
                response[0].forEach(s => {
                    if (!series.hasOwnProperty(s.slot)) {
                        series[s.slot] = [];
                        roomIdx[s.slot] = 0;
                    }
                    series[s.slot].push(s.id);
                    roomIdx[s.slot]++;
                    maxParallel = Math.max(series[s.slot].length, maxParallel);
                    let h = {
                        duration: "",
                        title: "",
                        announce: "",
                        chair: "",
                        url_conference: "",
                        url_chat: "",
                        url_inquiry: ""
                    };
                    if (s.inherit != "") {
                        if (session.hasOwnProperty(s.inherit)) {
                            h = session[s.inherit];
                        } else {
                            console.warn("No Original Session", s.inherit);
                        }
                    }
                    session[s.id] = {
                        id: s.id,
                        slot: s.slot,
                        room: s.room,
                        timeslotIdx: timeslotIdx[s.slot],
                        roomIdx: roomIdx[s.slot],
                        duration: (s.inherit == "" || s.duration != "") ? s.duration : h.duration,
                        span: calculateSpan(s.slot, (s.inherit == "" || s.duration != "") ? s.duration : h.duration),
                        inherit: s.inherit,
                        title: (s.inherit == "" || s.title != "") ? s.title : (h.title + " (repeat)"),
                        announce: (s.inherit == "" || s.announce != "") ? s.announce : h.announce,
                        chair: (s.inherit == "" || s.chair != "") ? s.chair : h.chair,
                        url_conference: (s.inherit == "" || s.url_conference != "") ? s.url_conference : h.url_conference,
                        url_chat: (s.inherit == "" || s.url_chat != "") ? s.url_chat : h.url_chat,
                        url_inquiry: (s.inherit == "" || s.url_inquiry != "") ? s.url_inquiry : h.url_inquiry,
                    };
                });
                console.log(session);
                for (let slot in roomIdx) {
                    let nRoom = roomIdx[slot];
                    if (nRoom == 1) {
                        console.log("Prenary: ", slot, nRoom);
                    }
                }
                let gridIdx = [];
                let templateRows = [];
                let i = 1;
                let block = "";
                let extra = [];
                timeslot.forEach((t, idx) => {
                    console.log(t);
                    if (block != t.block) {
                        if (extra.length != 0) {
                            extra.push({
                                gridRowStart: extra[extra.length - 1].gridRowEnd,
                                gridRowEnd: i,
                                gridColumnStart: 1,
                                gridColumnEnd: 2,
                                class: extra[extra.length - 1].title,
                                title: ""
                            });

                        }
                        templateRows.push(frBreak + "fr");
                        i++;
                        extra.push({
                            gridRowStart: i,
                            gridRowEnd: i + 1,
                            gridColumnStart: 1,
                            gridColumnEnd: maxParallel + 2,
                            class: t.block,
                            title: t.block
                        });
                        templateRows.push(frTime + "fr");
                        i++;
                        block = t.block;
                    }
                    gridIdx[idx] = i;
                    templateRows.push(frTime + "fr");
                    i++;
                    templateRows.push(frSession + "fr");
                    i++;
                });
                console.log("maxParallel", maxParallel);
                const nSlots = Object.keys(series).length;
                console.log("numberOfSlots", nSlots);
                const base = document.getElementById("programFrame");
                base.style.display = "grid";
                base.style.width = "100%";
                base.style.gap = "5px";
                base.style.gridTemplateColumns = "20px " + ("1fr ").repeat(maxParallel).trim();
                base.style.gridTemplateRows = templateRows.join(" ");
                extra.forEach(e => {
                    let div = document.createElement("div");
                    div.style.gridRowStart = e.gridRowStart;
                    div.style.gridRowEnd = e.gridRowEnd;
                    div.style.gridColumnStart = e.gridColumnStart;
                    div.style.gridColumnEnd = e.gridColumnEnd;
                    //div.style.backgroundColor = ;
                    div.classList.add(e.class);
                    div.appendChild(document.createTextNode((e.title)));
                    base.appendChild(div);
                });
                timeslot.forEach((t, idx) => {
                    let div = document.createElement("div");
                    div.style.gridRowStart = gridIdx[idx];
                    div.style.gridRowEnd = gridIdx[idx] + 1;
                    div.style.gridColumnStart = 2;
                    div.style.gridColumnEnd = maxParallel + 2;
                    div.classList.add("time");
                    let st = moment(t.start);
                    let utc = moment.utc(t.start);
                    div.appendChild(document.createTextNode(st.format("dddd, MMMM Do YYYY, h:mm a Z") + " [" + utc.format("h:mm a") + " UTC]"));
                    base.appendChild(div);
                });
                for (var slot in session) {
                    let s = session[slot];
                    let div = document.createElement("div");
                    div.style.gridRowStart = gridIdx[s.timeslotIdx] + 1;
                    div.style.gridRowEnd = gridIdx[s.timeslotIdx] + 2 + ((s.span > 2) ? (s.span - 1) * 2 : 0);
                    div.style.gridColumnStart = 1 + s.roomIdx;
                    div.classList.add(s.room);
                    if (s.inherit != "") {
                        div.classList.add("repeat");
                    }
                    if (roomIdx[s.slot] > 1) {
                        div.style.gridColumnEnd = s.roomIdx + 2;
                    } else {
                        div.style.gridColumnEnd = maxParallel + 2;
                    }
                    let span = document.createElement("div");
                    span.classList.add("sessionId");
                    span.appendChild(document.createTextNode(s.id));
                    div.appendChild(span);
                    div.appendChild(document.createTextNode(" " + s.title));
                    base.appendChild(div);
                }
            });
        }
    };
    Barba.Dispatcher.on('transitionCompleted', onLoadFn);
    document.addEventListener("DOMContentLoaded", onLoadFn);
})();