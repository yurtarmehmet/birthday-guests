const readFromLocalFile = (filePath) => {
    return fetch(filePath, {mode: 'no-cors'})
        .then(response => response.text())
        .then(data=> {
            try{
                const parsed = data.split(/\r?\n/);
                return {error: false, partners: parsed.filter(line => !!line).map(line => JSON.parse(line))}
            }catch (e){
                return {error: true, errorMessage: "Cannot parse partners data"}
            }
        })
        .catch(error => {
            return Promise.reject({error: true, errorMessage: "Promise Rejected"})
        });
};

export default readFromLocalFile;
