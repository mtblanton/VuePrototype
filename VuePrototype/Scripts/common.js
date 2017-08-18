const jsonHeaders = new Headers({
        'Content-Type': 'application/json'
});

function getJSONPostOptions(body) {
    const jsonPostOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: jsonHeaders
    }

    return jsonPostOptions;
}

function getFriendlyName(string) {
    let newString = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    newString = newString.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    return newString;
}

function getLabelWithColon(label, id) {
    let newLabel = label;
    if (!label) {
        newLabel = getFriendlyName(id);
    }
    return newLabel + ':';
}

