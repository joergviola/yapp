
export default {
    allows(ressource, action) {
        let result = false;
        this.rights.forEach(right => {
          const regexp = '/' + right.ressource + '/i';
          if (regexp.match(ressource) && right.action.indexOf(action)!=-1) result = true;
        })
        return result;
    }
}
