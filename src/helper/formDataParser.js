export function getFormElements(e) {
    const formData = Array.from(e.target.elements);
    const serverData = {};
    for (const obj of formData) {
        if (obj.name) {
            serverData[obj.name] = obj.value;
        }
    }
    console.log('server data', serverData);
    return serverData;
}