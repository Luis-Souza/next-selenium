type ItemTodoProps = {
    id: number
    nameItem: string
}

export const ItemTodo = ({id, nameItem}: ItemTodoProps): JSX.Element => {
    return (
        <li id={`todo${id}`}>
            {nameItem}
        </li>
    )
}