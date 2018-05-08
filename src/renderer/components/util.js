export function createClassNames(props) {
    const classes = props.className ? ` ${props.className}` : '';
    delete props.className;
    return classes;
}