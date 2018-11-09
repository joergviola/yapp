
export default {
    allows(ressource, action) {
        let result = false;
        this.rights.forEach(right => {
          const regexp = new RegExp(right.ressource, 'i');
          if (ressource.match(regexp) && right.action.indexOf(action)!=-1) result = true;
        })
        return result;
    }
}
