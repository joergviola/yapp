
/*
Sometimes we need events to bubble.
E.g. validation: the component sends its validation state to the recource.
We use native browser events for that.
 */
export default function bubble(element, name, detail) {
    element.dispatchEvent(new CustomEvent(name, {
        detail: detail,
        bubbles: true
    }))
}
