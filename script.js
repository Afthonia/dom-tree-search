async function bfsPrintDiv(maxLevel) {
    const visited = new Set();

    const url = "https://yazilim.mu.edu.tr"; // the web site whose data will be fetched

    // queue with base values
    const nodes = [{ url, depth: 0 }];

    // as long as nodes is not empty
    while (nodes.length > 0) {
        // a temporary node with the current url and depth will store the removed value from the queue
        const { url: currentUrl, depth } = nodes.shift();

        // if depth is equal or greater that the requested
        if (depth >= maxLevel) {
            continue;
        }

        // or the url is already visited
        if (visited.has(currentUrl)) {
            continue; // the loop will be broken for one cycle
        }

        // or else, the url will be added to the visited url set
        visited.add(currentUrl);

        // the response from the requested url will be stored as a text
        const resp = await fetch(currentUrl, {
            method: 'GET',
            mode: 'no-cors',
            headers: { 'Access-Control-Allow-Origin': '*', }
        });
        const htmlContent = await resp.text();

        // and will be parsed as an html document
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        // in every page,
        const aTags = doc.querySelectorAll('a');

        // <a> html tags will be traversed and href attributes will link to the deeper level
        aTags.forEach((aTag) => {

            const href = aTag.getAttribute('href');

            if (href) {
                const absUrl = new URL(href, currentUrl).href;
                nodes.push({ url: absUrl, depth: depth + 1 });
            }
        });

        // and the div tags inside of the page will be printed out to the console
        const divTags = doc.querySelectorAll('div');

        divTags.forEach((divTag) => {

            console.log(divTag.outerHTML);
        });
    }
}

async function dfsPrintDiv(maxLevel) {
    const visited = new Set();

    const url = "https://yazilim.mu.edu.tr"; // the web site whose data will be fetched

    // stack with base values
    const nodes = [{ url, depth: 0 }];

    // as long as nodes is not empty
    while (nodes.length > 0) {
        // a temporary node with the current url and depth will store the removed value from the stack
        const { url: currentUrl, depth } = nodes.pop();

        // if depth is equal or greater that the requested
        if (depth >= maxLevel) {
            continue;
        }

        // or the url is already visited
        if (visited.has(currentUrl)) {
            continue; // the loop will be broken for one cycle
        }

        // or else, the url will be added to the visited url set
        visited.add(currentUrl);

        // the response from the requested url will be stored as a text
        const resp = await fetch(currentUrl, {
            method: 'GET',
            mode: 'no-cors',
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
        const htmlContent = await resp.text();

        // and will be parsed as an html document
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        // each div tags will be printed out and,
        const divTags = doc.querySelectorAll('div');

        divTags.forEach((divTag) => {
            console.log(divTag.outerHTML);
        });

        // the <a> tags will be traversed
        const aTags = doc.querySelectorAll('a');

        // to dive into a deeper level of web page
        aTags.forEach((aTag) => {
            const href = aTag.getAttribute('href');

            if (href) {
                const absUrl = new URL(href, currentUrl).href;
                nodes.push({ url: absUrl, depth: depth + 1 });
            }
        });
    }
}