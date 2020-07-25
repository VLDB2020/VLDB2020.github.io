(() => {
    let timers = {};
    const DETAIL = true;
    const onLoadFn = () => {
        if (document.querySelectorAll(".programTimeTable") !== null) {
            let myUtcOffset = moment().utcOffset() / 60;
            console.log("My UTC Offset is " + myUtcOffset);
            let tzDivs = document.querySelectorAll(".utcTZ");
            tzDivs.forEach((tzDiv) => {
                let gap;
                if (tzDiv.hasAttribute("x-gap")) {
                    gap = Number(tzDiv.getAttribute("x-gap"));
                } else {
                    gap = 0;
                }
                if (gap >= -12 && gap <= 14) {
                    if (myUtcOffset == gap) {
                        tzDiv.classList.add("myTZ");
                    }
                    gap = moment()
                        .utcOffset(gap * 60)
                        .format("Z");
                    tzDiv.innerHTML =
                        '<a href="https://en.wikipedia.org/wiki/UTC' +
                        gap +
                        '">UTC' +
                        gap +
                        "</a>";
                }
            });
            tzDivs = document.querySelectorAll(".utcGap");
            tzDivs.forEach((tzDiv) => {
                let gap = Number(tzDiv.getAttribute("x-gap"));
                if (tzDiv.hasAttribute("x-gap")) {
                    let gap = Number(tzDiv.getAttribute("x-gap"));
                } else {
                    let gap = 0;
                }
                if (tzDiv.hasAttribute("x-block")) {
                    if (myUtcOffset == gap) {
                        tzDiv.classList.add("myTZ");
                    }
                    let start, end;
                    switch (tzDiv.getAttribute("x-block")) {
                        case "1":
                            start = moment("2020-09-01T08:00:00Z");
                            end = moment("2020-09-01T13:00:00Z");
                            break;
                        case "2":
                            start = moment("2020-09-01T15:00:00Z");
                            end = moment("2020-09-01T20:00:00Z");
                            break;
                        case "3":
                            start = moment("2020-09-01T21:00:00Z");
                            end = moment("2020-09-02T01:00:00Z");
                            break;
                        default:
                            start = moment("2020-09-02T03:00:00Z");
                            end = moment("2020-09-02T08:00:00Z");
                    }
                    if (gap >= -12 && gap <= 14) {
                        tzDiv.innerHTML =
                            '<span class="block' +
                            tzDiv.getAttribute("x-block") +
                            '">' +
                            tzDiv.getAttribute("x-block") +
                            "</span><span>" +
                            start.utcOffset(gap * 60).format("hh:mm a") +
                            ' <i class="fas fa-long-arrow-alt-right"></i> ' +
                            end.utcOffset(gap * 60).format("h:mm a") +
                            '</span><span class="block' +
                            tzDiv.getAttribute("x-block") +
                            '">&nbsp;&nbsp;</span>';
                    }
                }
            });
        }
        if (document.querySelectorAll(".VLDB2020Instructions") !== null) {
            let md = {
                atendee: "https://vldb2020.org/instructions/guide-attendee.md",
                presenter:
                    "https://vldb2020.org/instructions/guide-presenter.md",
                chair:
                    "https://vldb2020.org/instructions/guide-session-chair.md",
            };
            document
                .querySelectorAll(".VLDB2020Instructions")
                .forEach((instruction) => {
                    if (
                        instruction.getAttribute("x-for") &&
                        md.hasOwnProperty(instruction.getAttribute("x-for"))
                    ) {
                        console.log(
                            instruction.getAttribute("x-for"),
                            md[instruction.getAttribute("x-for")]
                        );
                        fetch(md[instruction.getAttribute("x-for")]).then(
                            (response) => {
                                console.log(response);
                                response.text().then((t) => {
                                    console.log("text", t);
                                    instruction.innerHTML = marked(t);
                                });
                            }
                        );
                    }
                });
        }
        if (document.querySelector("#programTimeCircle > svg") !== null) {
            document.getElementById("CircleBody").style.transformOrigin =
                "297.637795px 297.637795px";
            let start = () => {
                if (!document.getElementById("CircleBody")) {
                    clearInterval(timers["circle"]);
                    timers["circle"] = null;
                    return;
                }
                var h = new Date().getUTCHours();
                var m = new Date().getUTCMinutes();
                var r = (h * 60 + m) * (360 / (24 * 60));
                var o = 9 * (360 / 24);
                r = o + r > 360 ? o + r - 360 : o + r;
                document.getElementById("CircleBody").style.transform =
                    "rotate(-" + r + "deg)";
            };
            timers["circle"] = setInterval(start, 6000);
            start();
        } else {
            if (timers["circle"] && timers["circle"] != null) {
                console.log("Clear timer for disc");
                clearInterval(timers["circle"]);
                timers["circle"] = null;
            }
        }
        if (document.getElementById("programFrame") !== null) {
            const frBreak = 2;
            const frSession = 3;
            const frTime = 1;
            let createDuration = (timestamp) => {
                let target = moment(timestamp);
                let gap =
                    Number(document.getElementById("utcOffset").value) * 60;
                let now = moment().utcOffset(gap);
                return moment.duration(target.diff(now)).humanize(true, {
                    M: 12,
                    w: 8,
                    d: 28,
                    h: 24,
                    m: 60,
                    s: 60,
                });
            };
            let createDateTimeSpan = (timestamp, appendUTC = false) => {
                return (
                    '<span x-datetime="yes" x-timestamp="' +
                    timestamp +
                    '" x-timeutc="' +
                    (appendUTC ? "yes" : "no") +
                    '">' +
                    createDateTimeString(timestamp, appendUTC) +
                    "</span>"
                );
            };
            let createDateTimeString = (timestamp, appendUTC = false) => {
                let gap =
                    Number(document.getElementById("utcOffset").value) * 60;
                let localtime = moment(timestamp).utcOffset(gap);
                let utc = moment.utc(timestamp);
                let date =
                    localtime.format("DD") == utc.format("DD")
                        ? ""
                        : utc.format("ddd, MMM Do, ");
                let str =
                    localtime.format("dddd, MMMM Do YYYY, h:mm a") +
                    (appendUTC
                        ? " [" + date + utc.format("h:mm a") + " UTC]"
                        : "");
                return str;
            };
            let start = () => {
                let countdowns = document.querySelectorAll(".countdown");
                countdowns.forEach((cd) => {
                    cd.innerHTML =
                        "Start " +
                        createDuration(Number(cd.getAttribute("x-timestamp")));
                });
                let nowTime = document.querySelectorAll(".nowTime");
                let gap =
                    Number(document.getElementById("utcOffset").value) * 60;
                nowTime.forEach((nt) => {
                    nt.innerHTML = moment()
                        .utcOffset(gap)
                        .format("dddd, MMMM Do YYYY, h:mm a");
                });
            };
            let utcOffset = document.getElementById("utcOffset");
            utcOffset.addEventListener("change", (e) => {
                start();
                let dateTime = document.querySelectorAll(
                    "span[x-datetime='yes']"
                );
                dateTime.forEach((div) => {
                    let st = Number(div.getAttribute("x-timestamp"));
                    div.innerHTML = createDateTimeString(
                        st,
                        div.hasAttribute("x-timeutc") &&
                            div.getAttribute("x-timeutc") == "yes"
                    );
                });
                //e.stopPropagation();
            });
            if (utcOffset) {
                utcOffset.value = moment().utcOffset() / 60;
            }
            timers["session"] = setInterval(start, 30000);
            start();
            if (!document.getElementById("programFrameLess")) {
                var link = document.createElement("link");
                link.id = "programFrameLess";
                link.rel = "stylesheet/less";
                link.type = "text/css";
                link.href = "/assets/vldb2020-program.less";
                document.getElementsByTagName("HEAD")[0].appendChild(link);
                less.sheets.push(
                    document.querySelector(
                        'link[href="/assets/vldb2020-program.less"]'
                    )
                );
                less.refresh();
            } else {
                console.log("Skip load .less for a session table");
            }
            let files = [
                "https://s.vldb2020.org/VLDB2020session.json",
                "https://s.vldb2020.org/VLDB2020timeslot.json",
                "https://s.vldb2020.org/VLDB2020paper.json",
            ];
            Promise.all(
                files.map(async (file) => {
                    const response = await fetch(file);
                    return response.json();
                })
            ).then((response) => {
                let maxParallel = 0;
                let session = {};
                let series = {};
                let timeslotIdx = {};
                const timeslot = response[1].map((i, idx) => {
                    timeslotIdx[i.slot] = idx;
                    return {
                        slot: i.slot,
                        start: Date.parse(i.start),
                        day: i.day,
                        block: i.block,
                    };
                });
                let papers = {};
                response[2].forEach((p) => {
                    if (!papers.hasOwnProperty(p.session)) {
                        papers[p.session] = [];
                    }
                    papers[p.session].push(p);
                });
                let showModal = (id) => {
                    document.getElementById("detail_" + id).style.display =
                        "block";
                    let top = document
                        .getElementById("detail_" + id)
                        .getBoundingClientRect().top;
                    //document.getElementById("contents-body").scrollTo(0, document.getElementById("contents-body").scrollTop + top - 120);
                    var tl = anime.timeline({
                        easing: "easeInOutSine",
                        duration: 750,
                    });
                    tl.add({
                        targets: "#detail_" + id,
                        opacity: ["0%", "100%"],
                    }).add({
                        targets: "#contents-body",
                        scrollTop:
                            document.getElementById("contents-body").scrollTop +
                            top -
                            120,
                    });
                };
                let hideModal = (id) => {
                    document.getElementById(id).style.display = "none";
                };
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
                response[0].forEach((s) => {
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
                        url_inquiry: "",
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
                        duration:
                            s.inherit == "" || s.duration != ""
                                ? s.duration
                                : h.duration,
                        span: calculateSpan(
                            s.slot,
                            s.inherit == "" || s.duration != ""
                                ? s.duration
                                : h.duration
                        ),
                        inherit: s.inherit,
                        title:
                            s.inherit == "" || s.title != ""
                                ? s.title
                                : h.title + " (repeat)",
                        announce:
                            s.inherit == "" || s.announce != ""
                                ? s.announce
                                : h.announce,
                        chair:
                            s.inherit == "" || s.chair != ""
                                ? s.chair
                                : h.chair,
                        url_conference:
                            s.inherit == "" || s.url_conference != ""
                                ? s.url_conference
                                : h.url_conference,
                        url_chat:
                            s.inherit == "" || s.url_chat != ""
                                ? s.url_chat
                                : h.url_chat,
                        url_inquiry:
                            s.inherit == "" || s.url_inquiry != ""
                                ? s.url_inquiry
                                : h.url_inquiry,
                    };
                });
                let gridIdx = [];
                let templateRows = [];
                let i = 1;
                let block = "";
                let extra = [];
                let blockMask = [];
                let stackSlot = [];
                let curSlot = null;
                timeslot.forEach((t, idx) => {
                    curSlot = t.slot;
                    stackSlot.push(curSlot);
                    if (block != t.block) {
                        if (extra.length != 0) {
                            let s = stackSlot.pop();
                            stackSlot.forEach((slot) => {
                                blockMask[slot] = {
                                    gridRowStart:
                                        extra[extra.length - 1].gridRowEnd,
                                    gridRowEnd: i,
                                    gridColumnStart: 2,
                                    gridColumnEnd: maxParallel + 2,
                                };
                            });
                            extra.push({
                                gridRowStart:
                                    extra[extra.length - 1].gridRowEnd,
                                gridRowEnd: i,
                                gridColumnStart: 1,
                                gridColumnEnd: 2,
                                class: extra[extra.length - 1].class,
                                title: "",
                                anchor: false,
                            });
                            stackSlot = [s];
                        }
                        templateRows.push(frBreak + "fr");
                        i++;
                        let st = moment(t.start);
                        var duration = createDuration(t.start);
                        extra.push({
                            gridRowStart: i,
                            gridRowEnd: i + 1,
                            gridColumnStart: 1,
                            gridColumnEnd: maxParallel + 2,
                            class: t.block,
                            title:
                                "<div>" +
                                t.day +
                                " " +
                                t.block +
                                "</div><div>(" +
                                createDateTimeSpan(t.start) +
                                ')</div><div class="countdown" x-duration="yes" x-timestamp="' +
                                t.start +
                                '">Start ' +
                                duration +
                                "</div>",
                            anchor: true,
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
                if (i > 1) {
                    stackSlot.forEach((slot) => {
                        blockMask[slot] = {
                            gridRowStart: extra[extra.length - 1].gridRowEnd,
                            gridRowEnd: i,
                            gridColumnStart: 2,
                            gridColumnEnd: maxParallel + 2,
                        };
                    });
                    extra.push({
                        gridRowStart: extra[extra.length - 1].gridRowEnd,
                        gridRowEnd: i,
                        gridColumnStart: 1,
                        gridColumnEnd: 2,
                        class: extra[extra.length - 1].class,
                        title: "",
                    });
                    stackSlot = [];
                }
                console.log("maxParallel", maxParallel);
                const nSlots = Object.keys(series).length;
                console.log("numberOfSlots", nSlots);
                const base = document.getElementById("programFrame");
                base.style.display = "grid";
                base.style.width = "100%";
                base.style.xOverflow = "hidden";
                base.style.gap = "5px";
                base.style.gridTemplateColumns =
                    "20px " + "1fr ".repeat(maxParallel).trim();
                base.style.gridTemplateRows = templateRows.join(" ");
                extra.forEach((e) => {
                    let div = document.createElement("div");
                    div.style.gridRowStart = e.gridRowStart;
                    div.style.gridRowEnd = e.gridRowEnd;
                    div.style.gridColumnStart = e.gridColumnStart;
                    div.style.gridColumnEnd = e.gridColumnEnd;
                    div.classList.add(e.class);
                    if (e.anchor) {
                        let anchor = document.createElement("a");
                        anchor.setAttribute("neme", e.class);
                        div.appendChild(anchor);
                    }
                    let t = document.createElement("div");
                    t.classList.add("blockFolder");
                    t.innerHTML = e.title;
                    div.appendChild(t);
                    base.appendChild(div);
                });
                let ts = {};
                timeslot.forEach((t, idx) => {
                    let div = document.createElement("div");
                    div.style.gridRowStart = gridIdx[idx];
                    div.style.gridRowEnd = gridIdx[idx] + 1;
                    div.style.gridColumnStart = 2;
                    div.style.gridColumnEnd = maxParallel + 2;
                    div.classList.add("time");
                    let str = createDateTimeSpan(t.start, true);
                    div.innerHTML = str;
                    ts[t.slot] = {
                        str: str,
                    };
                    base.appendChild(div);
                });
                let maskStock = [];
                for (var id in session) {
                    let s = session[id];
                    let div = document.createElement("div");
                    div.id = s.id;
                    div.style.gridRowStart = gridIdx[s.timeslotIdx] + 1;
                    div.style.gridRowEnd =
                        gridIdx[s.timeslotIdx] +
                        2 +
                        (s.span > 2 ? (s.span - 1) * 2 : 0);
                    div.style.gridColumnStart = 1 + s.roomIdx;
                    div.classList.add(s.room);
                    div.classList.add("cell");

                    if (s.inherit != "") {
                        div.classList.add("repeat");
                    }
                    if (roomIdx[s.slot] > 1) {
                        div.style.gridColumnEnd = s.roomIdx + 2;
                    } else {
                        div.style.gridColumnEnd = maxParallel + 2;
                    }
                    if (DETAIL) {
                        div.addEventListener("click", (e) => {
                            showModal(e.currentTarget.id);
                            e.stopPropagation();
                        });
                    }
                    let span = document.createElement("div");
                    span.classList.add("sessionId");
                    span.appendChild(document.createTextNode(s.id));
                    div.appendChild(span);
                    div.appendChild(document.createTextNode(" " + s.title));
                    let dur = document.createElement("div");
                    dur.classList.add("sessionDuration");
                    dur.appendChild(
                        document.createTextNode(
                            moment
                                .duration(Number(s.duration), "minutes")
                                .humanize(false, { m: 500 })
                        )
                    );
                    div.appendChild(dur);
                    base.appendChild(div);
                    let mask = document.createElement("div");
                    mask.id = "detail_" + s.id;
                    mask.style.gridRowStart = blockMask[s.slot].gridRowStart;
                    mask.style.gridRowEnd = blockMask[s.slot].gridRowEnd;
                    mask.style.gridColumnStart =
                        blockMask[s.slot].gridColumnStart;
                    mask.style.gridColumnEnd = blockMask[s.slot].gridColumnEnd;
                    mask.classList.add(s.room);
                    mask.classList.add("mask");
                    let maskTime = document.createElement("div");
                    maskTime.classList.add("time");
                    let d = document.createElement("div");
                    let i = document.createElement("i");
                    i.setAttribute("target", "detail_" + s.id);
                    i.classList.add("fas");
                    i.classList.add("fa-window-close");
                    if (DETAIL) {
                        i.addEventListener("click", (e) => {
                            hideModal(e.target.getAttribute("target"));
                            e.stopPropagation();
                        });
                    }
                    d.appendChild(i);
                    maskTime.appendChild(d);
                    let t = document.createElement("div");
                    t.innerHTML =
                        ts[s.slot].str + " " + s.duration + " minutes";
                    maskTime.appendChild(t);
                    let maskTitle = document.createElement("div");
                    maskTitle.classList.add("title");
                    maskTitle.appendChild(
                        document.createTextNode("[" + s.id + "] " + s.title)
                    );

                    let maskDescription = document.createElement("div");
                    maskDescription.classList.add("description");
                    let description = "<p><b>Chair:</b> " + s.chair + "</p>";
                    if (s.description && s.description != "") {
                        description += "<p>" + s.description + "</p>";
                    }
                    if (s.announce && s.announce != "") {
                        description +=
                            "<p><b>Announce:</b> " + s.announce + "</p>";
                    }
                    maskDescription.innerHTML = description;

                    let maskButtons = document.createElement("div");
                    //"url_conference":"#","url_chat":"#","url_inquiry"
                    maskButtons.classList.add("buttons");
                    //maskButtons.appendChild(document.createTextNode(s.url_inquiry));
                    let btnConference = document.createElement("a");
                    btnConference.classList.add("btn");
                    btnConference.classList.add("btn-green");
                    btnConference.href = s.url_conference;
                    btnConference.appendChild(
                        document.createTextNode("Virtual Conference Room")
                    );
                    maskButtons.appendChild(btnConference);
                    let btnChat = document.createElement("a");
                    btnChat.classList.add("btn");
                    btnChat.classList.add("btn-orange");
                    btnChat.href = s.url_chat;
                    btnChat.appendChild(document.createTextNode("Chat Room"));
                    maskButtons.appendChild(btnChat);
                    let btnInquiry = document.createElement("a");
                    btnInquiry.classList.add("btn");
                    btnInquiry.classList.add("btn-pink");
                    btnInquiry.href = s.url_inquiry;
                    btnInquiry.appendChild(document.createTextNode("Inquiry"));
                    maskButtons.appendChild(btnInquiry);
                    mask.appendChild(maskTime);
                    mask.appendChild(maskTitle);
                    mask.appendChild(maskDescription);
                    mask.appendChild(maskButtons);
                    if (papers[s.id] && papers[s.id].length > 0) {
                        let maskPapers = document.createElement("div");
                        maskPapers.classList.add("paperbox");
                        let paperCard = (paper) => {
                            let pDiv = document.createElement("div");
                            pDiv.classList.add("paper");
                            let pButton = document.createElement("div");
                            pButton.classList.add("button");
                            let pTitle = document.createElement("div");
                            pTitle.classList.add("title");
                            let pAbstract = document.createElement("div");
                            pAbstract.classList.add("abstract");

                            let btnVideo = document.createElement("a");
                            btnVideo.classList.add("btn");
                            btnVideo.classList.add("btn-red");
                            btnVideo.appendChild(
                                document.createTextNode("Prerecorded Video")
                            );
                            btnVideo.href = paper.url_video;

                            pButton.appendChild(btnVideo);
                            pTitle.appendChild(
                                document.createTextNode(paper.title)
                            );
                            pAbstract.appendChild(
                                document.createTextNode(paper.description)
                            );

                            pDiv.appendChild(pButton);
                            pDiv.appendChild(pTitle);
                            pDiv.appendChild(pAbstract);
                            return pDiv;
                        };
                        papers[s.id].forEach((paper) => {
                            maskPapers.appendChild(paperCard(paper));
                        });
                        mask.appendChild(maskPapers);
                    } else {
                        //console.log("No Paper", s.id);
                    }
                    if (DETAIL) {
                        mask.addEventListener("click", (e) => {
                            e.stopPropagation();
                        });
                    }
                    maskStock.push(mask);
                }
                maskStock.forEach((mask) => {
                    const base = document.getElementById("programFrame");
                    base.appendChild(mask);
                });
            });
        } else {
            if (timers["session"] && timers["session"] != null) {
                console.log("Clear timer for session table");
                clearInterval(timers["session"]);
                timers["session"] = null;
            }
        }
    };
    Barba.Dispatcher.on("transitionCompleted", onLoadFn);
    document.addEventListener("DOMContentLoaded", onLoadFn);
})();
