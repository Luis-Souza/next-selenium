import { ItemTodo } from "../ItemTodo";

type ListTodoProps = {
    users: Array<any>
}

export const ListTodo = ({users}: ListTodoProps): JSX.Element => {
    if (!users.length) {
        return (<p>Nenhum item</p>)
    }

    return (
        <ul>
            {
                users.map((item) => <ItemTodo key={`todo${item.id}`} nameItem={item.name} id={item.id} />)
            }
        </ul>
    );
}