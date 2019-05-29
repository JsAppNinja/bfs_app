import $ from 'jquery'


/**
* When the user clicks on the button, scroll to the top of the document
*/
export function topFunctionButtonClick() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        if (navigator.userAgent.indexOf("Chrome") !== -1) {
            $('html,body').animate({ scrollTop: 0 }, 100);
        } else {
            $('html,body').animate({ scrollTop: 0 }, 1000);
        }
    }
    else {
        if (navigator.userAgent.indexOf("Chrome") !== -1) {
            $('html,body').animate({ scrollTop: 0 }, 100);
        } else {
            $('html,body').animate({ scrollTop: 0 }, 1000);
        }
    }
}

/**
 * Scroll to the Top of the page
 */
export function topFunction() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        let page = window.location.href.split("/");
        let exactUrl = page[3].slice(0, 18)
        if (!(page[3] === "products-services" || exactUrl === "construction-type#")) {
            if (navigator.userAgent.indexOf("Chrome") !== -1) {
                $('html,body').animate({ scrollTop: 0 }, 100);
            } else {
                $('html,body').animate({ scrollTop: 0 }, 1000);
            }
        }
    }
    else {
        let page = window.location.href.split("/");
        let exactUrl = page[3].slice(0, 18)
        if (!(page[3] === "products-services" || exactUrl === "construction-type#")) {
            if (navigator.userAgent.indexOf("Chrome") !== -1) {
                $('html,body').animate({ scrollTop: 0 }, 100);
            } else {
                $('html,body').animate({ scrollTop: 0 }, 1000);
            }
        }
    }
}

// When the user clicks on the button, scroll to the top of the document
export function scrollTopLeadershipModal() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        $('.leadership-modal').animate({ scrollTop: 0 }, 100);
        $('.aboutuser').animate({ scrollTop: 0 }, 100);

    }
    else {
        $('.leadership-modal').animate({ scrollTop: 0 }, 100);
        $('.aboutuser').animate({ scrollTop: 0 }, 100);

    }
}

/**
 * Get state Wise data
 * @param {*} locationsList 
 */
export function GetStatwiseData(locationsList) {
    var locationDataList = [];
    locationsList = locationsList.sort(function (a, b) { return (a.Name < b.Name) ? -1 : 1 }).groupBy("State");
    for (var data in locationsList) {
        locationDataList.push({ State: data, locationList: locationsList[data] });
    }
    return locationDataList.sort(function (a, b) { return (a.State < b.State) ? -1 : 1 });
}


Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        var val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {})
}

/**
 * Check the environment
 */
export function CheckOnMobile() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    } else {
        return false;
    }
}


/**
 * Check the environment
 */
export function CheckOnDesktop() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        return false;
    } else {
        return true;
    }
}
