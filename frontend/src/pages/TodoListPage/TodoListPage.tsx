import { TodoListTemplate } from "../../features/todos/components";
import { BaseLayout } from "../../shared/components/layouts";

export const TodoListPage = () => {
	return (
		<BaseLayout title={"TodoList"}>
			<TodoListTemplate />
		</BaseLayout>
	)
}
