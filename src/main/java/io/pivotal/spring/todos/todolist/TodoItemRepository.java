package io.pivotal.spring.todos.todolist;

import org.springframework.data.repository.CrudRepository;

import io.pivotal.spring.todos.user.User;

import javax.transaction.Transactional;

/**
 * @author Matt Stine
 */
public interface TodoItemRepository extends CrudRepository<TodoItem, Long> {
    TodoItem findOneByIdAndListAndOwner(Long id, TodoList todoList, User owner);

    @Transactional
    void deleteByIdAndListAndOwner(Long id, TodoList todoList, User owner);
}
