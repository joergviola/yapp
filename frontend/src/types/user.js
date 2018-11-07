
export default {
    allows(ressource, action) {
        let result = false;
        this.rights.forEach(right => {
            if (ressource.match('/'+right.ressource+'/i') && right.action.indexOf(action)!=-1) result = true;
        })
        return result;
    }
}
