import { useParams } from "react-router";
import { useTodo } from "../../hooks/queries";

export const useTodoDetailTemplate = () => {
  const { id } = useParams();
  const { data: todo, isLoading } = useTodo(id || "");

  return { todo, isLoading };
};
