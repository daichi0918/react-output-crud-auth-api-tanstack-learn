import { Controller } from "react-hook-form";
import { PuffLoader} from "react-spinners";
import { InputFormSection }  from "../../../../shared/components/ui";
import { TodoList } from "../TodoList";

import { useTodoListTemplate } from "./useTodoListTemplate";

import styles from "./style.module.css";

export const TodoListTemplate = () => {
  const { control, showTodoList, handleDeleteTodo, isLoading } = useTodoListTemplate();
  
  if (isLoading) {
    return  <PuffLoader />
  }

  return (
      <div className={styles.container}>
        {/* Todo検索フォームエリア */}
        <div className={styles.area}>
          <Controller
            name="keyword"
            render={({ field }) => (
              <InputFormSection placeholder={"Search Keyword"} {...field} />
            )}
            control={control}
          />
        </div>
        {/* Todoリスト一覧表示 */}
        <div className={styles.area}>
          {!isLoading && showTodoList.length > 0 && (
            <TodoList todoList={showTodoList} onDeleteTodo={handleDeleteTodo} />
          )}
        </div>
      </div>
  );
};
