(() => {
    const e = 'helpdesk';
    const mail = 'vldb2020.org';

    let currentPlaybackRate = { value: 1 };
    document.getElementById("toppage-toggle").addEventListener('change', (event) => {
        if (event.target.checked) {
            Cookies.set('focus', 'contents', {
                expires: 7
            });
            anime({
                targets: currentPlaybackRate,
                value: 0,
                easing: 'linear',
                duration: 3000,
                update: function () {
                    document.getElementById("toppage-video").playbackRate = (Math.round(currentPlaybackRate.value * 10)) / 10;
                }
            });
        } else {
            Cookies.remove('focus');
            anime({
                targets: currentPlaybackRate,
                value: 1,
                easing: 'linear',
                duration: 3000,
                update: function () {
                    document.getElementById("toppage-video").playbackRate = (Math.round(currentPlaybackRate.value * 10)) / 10;
                }
            });
            anime({
                targets: '#contents-body',
                scrollTop: 0,
                duration: 700,
                easing: 'easeInOutSine'
            });
        }
    });
    if (Cookies.get('focus') == "contents") {
        Cookies.set('focus', 'contents', {
            expires: 7
        });
        currentPlaybackRate = { value: 0 };
        document.getElementById("toppage-video").playbackRate = 0;
        document.getElementById('toppage-toggle').checked = true;
    }

    let submenuInAction = false;
    const submenuToggle = (before, after) => {
        before = before == 'conference' ? null : before;
        after = after == 'conference' ? null : after;
        if (before === null && after === null) {
            return;
        }
        submenuInAction = true;
        let sequence = [];
        if (before === after) {
            after = null;
        }
        if (after == null) {
            sequence.push(new Promise(resolve => {
                anime({
                    targets: "#submenu-mask",
                    opacity: 0.0,
                    duration: 300,
                    complete: () => {
                        document.getElementById("submenu-mask").style.display = "none";
                        resolve();
                    }
                });
            })
            );
        }
        if (before != null) {
            let panelID = 'submenu-panel-' + before;
            sequence.push(new Promise(resolve => {
                anime({
                    targets: '#' + panelID,
                    translateY: -(document.getElementById(panelID).offsetHeight) + 'px',
                    easing: 'easeOutExpo',
                    duration: 1000,
                    complete: () => {
                        resolve();
                    }
                });
            })
            );
        }
        if (after != null) {
            if (before == null) {
                document.getElementById("submenu-mask").style.display = "block";
                sequence.push(
                    new Promise(resolve => {
                        anime({
                            targets: "#submenu-mask",
                            opacity: 0.8,
                            duration: 300,
                            complete: () => {
                                resolve();
                            }
                        });
                    })
                );
            }
            let panelID = 'submenu-panel-' + after;
            sequence.push(new Promise(resolve => {
                document.getElementById(panelID).style.zIndex = 95;
                anime({
                    targets: '#' + panelID,
                    translateY: (document.getElementById(panelID).offsetHeight) + 'px',
                    easing: 'easeOutQuint',
                    duration: 1000,
                    complete: () => {
                        document.getElementById(panelID).style.zIndex = 90;
                        resolve();
                    }
                });
            })
            );
        }
        Promise.all(sequence).then(function (message) {
            submenuInAction = false;
        });
    }

    const maskClear = () => {
        if (submenuInAction) {
            return;
        }
        let before = null;
        if (document.querySelector('input[name="submenu-active"]:checked') !== null) {
            before = document.querySelector('input[name="submenu-active"]:checked').value;
        }
        let after = null;
        document.querySelector('input[name="submenu-active"]:checked').checked = false;
        submenuToggle(before, after);
    }

    let sublinks = document.querySelectorAll('.submenu-item:not(.link-disable)');
    for (var c = 0; c < sublinks.length; c++) {
        sublinks[c].addEventListener('click', maskClear);
    }
    document.getElementById('submenu-mask').addEventListener('click', maskClear);

    const pourContactEmailAddress = () => {
        const contacts = document.querySelectorAll('.contactaddress');
        for (var i = 0; i < contacts.length; i++) {
            contacts[i].innerHTML = '<a href="mai' + 'lto:' + e + '@' + mail + '">' + e + '@' + mail + '</a>';
        }
    }
    pourContactEmailAddress();

    const updateSocialShare = () => {
        const socialShare = document.getElementsByClassName('social-icon');
        for (let c = 0; c < socialShare.length; c++) {
            socialShare[c].attributes['href'].value = socialShare[c].attributes['x-href'].value.replace("{url}", location.href);
        }
    }
    updateSocialShare();

    const menuItem = document.getElementsByClassName('submenu-toggle');
    for (let c = 0; c < menuItem.length; c++) {
        menuItem[c].addEventListener('click', (e) => {
            if (submenuInAction) {
                e.stopPropagation();
                return;
            }
            let before = null;
            if (document.querySelector('input[name="submenu-active"]:checked') !== null) {
                before = document.querySelector('input[name="submenu-active"]:checked').value;
            }
            const checkID = 'submenu-' + e.currentTarget.attributes['x-category'].value;
            document.getElementById(checkID).checked = !document.getElementById(checkID).checked;
            let after = null;
            if (document.querySelector('input[name="submenu-active"]:checked') !== null) {
                after = document.querySelector('input[name="submenu-active"]:checked').value;
            }
            submenuToggle(before, after);
        });
    }

    document.onkeydown = (e) => {
        e = e || window.event;
        if (e.keyCode == '40') {
            let submenu = document.getElementsByClassName('submenu-active');
            for (let c = 0; c < submenu.length; c++) {
                if (submenu[c].checked) {
                    return;
                }
            }
            let el = document.getElementById('contents-body');
            let height = parseInt(window.getComputedStyle(el).getPropertyValue('height'));
            if (document.getElementById("toppage-toggle").checked && Math.ceil(el.scrollTop + height) < el.scrollHeight) {
                return;
            }
            //document.getElementById("toppage-toggle").checked = !document.getElementById("toppage-toggle").checked;
            document.getElementById('toppage-toggle').click();
        } else if (e.keyCode == '38') {
            let submenu = document.getElementsByClassName('submenu-active');
            for (let c = 0; c < submenu.length; c++) {
                if (submenu[c].checked) {
                    document.querySelector('input[name="submenu-active"]:checked').checked = false;
                    submenuToggle(submenu[c].value, null);
                    return;
                }
            }
        }
    };

    Barba.Pjax.start();
    Barba.Dispatcher.on('linkClicked', function () { });
    Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
        //eval(container.querySelector("script").innerHTML);
        const category = container.attributes['x-category'].value;
        document.getElementById('toppage-cnt').setAttribute('class', category);
        document.querySelector('input[name="category-active"][value="' + category + '"]').checked = true;
        document.getElementById("contents-body").scrollTop = 0;
        updateSocialShare();
        pourContactEmailAddress();
    });
    Barba.Prefetch.init();

    const categoryColors = {};

    const col = document.getElementsByClassName('menu-line');
    for (let c = 0; c < col.length; c++) {
        let color = window.getComputedStyle(col[c]).getPropertyValue('background-color');
        let category = col[c].parentNode.querySelector('label').attributes['x-category'].value;
        categoryColors[category] = color;
    }
    let links = document.querySelectorAll('a[href]');
    const cbk = function (e) {
        if (e.currentTarget.href === window.location.href) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', cbk);
    }
})();
